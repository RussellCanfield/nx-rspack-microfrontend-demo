import { FederationRuntimePlugin } from "@module-federation/runtime/types";

const ShareMonitorPlugin = (): FederationRuntimePlugin => {
	return {
		name: "share-monitor-plugin",
		onLoad: (args) => {
			const { origin } = args;
			console.log(origin.shareScopeMap);
		},
	};
};

export default ShareMonitorPlugin;
