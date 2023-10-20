import { ErrorBoundary } from "react-error-boundary";

export type DynamicRemoteOptions = {
	getUrl: () => Promise<string>;
	scope: string;
	module: string;
};

export type ShareScope = {
	loaded?: 1;
	get: () => Promise<unknown>;
	from: string;
	eager: boolean;
};

export type WebpackShareScopes = Record<string, Record<string, ShareScope>> & {
	default?: WebpackShareScopes;
};

export type WebpackRemoteContainer = {
	__initialized?: boolean;
	__initializing?: boolean;
	get(modulePath: string): () => any;
	init: (obj?: WebpackShareScopes) => void;
};

declare global {
	const __webpack_require__: {
		l: (url: URL, callback: (event: any) => void, scope: string) => void;
	};
	const __webpack_share_scopes__: WebpackShareScopes;
	const __webpack_init_sharing__: (scope: string) => Promise<void>;

	interface CustomWindow {
		[k: string]: WebpackRemoteContainer;
	}
}

const loadRemote = (url: string, scope: string) =>
	new Promise<void>((resolve, reject) => {
		__webpack_require__.l(
			new URL(url),
			(event) => {
				if (event?.type === "load") {
					// Script loaded successfully:
					return resolve();
				}
				const realSrc = event?.target?.src;
				const error = new Error();
				error.message =
					"Loading script failed.\n(missing: " + realSrc + ")";
				error.name = "ScriptExternalLoadError";
				reject(error);
			},
			scope
		);
	});

const initSharing = async () => {
	if (!__webpack_share_scopes__?.default) {
		await __webpack_init_sharing__("default");
	}
};

const initContainer = async (containerScope: WebpackRemoteContainer) => {
	try {
		if (!containerScope.__initialized && !containerScope.__initializing) {
			containerScope.__initializing = true;
			await containerScope.init(__webpack_share_scopes__.default);
			containerScope.__initialized = true;
			delete containerScope.__initializing;
		}
	} catch (error) {
		console.error(error);
	}
};

const importDynamicRemote = async ({
	getUrl,
	scope,
	module,
}: DynamicRemoteOptions) => {
	const customWindow = window as unknown as CustomWindow;

	if (!customWindow[scope]) {
		const remoteUrl = await getUrl();
		await Promise.all([loadRemote(remoteUrl, scope), initSharing()]);

		if (!customWindow[scope]) {
			throw new Error(`Remote with scope ${scope} not found`);
		}
	}

	const remoteScope = customWindow[scope];

	const [, moduleFactory] = await Promise.all([
		initContainer(remoteScope),
		remoteScope.get(
			module === "." || module.startsWith("./") ? module : `./${module}`
		),
	]);

	const RemoteComponent = moduleFactory().default;

	return {
		default: () => (
			<ErrorBoundary
				fallbackRender={() => <div>Something went wrong</div>}
			>
				<RemoteComponent />
			</ErrorBoundary>
		),
	};
};

export default importDynamicRemote;
