import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { init } from "@module-federation/runtime";

const appElement = document.getElementById("app");

init({
	name: "host",
	remotes: [
		{
			name: "products",
			entry: "http://localhost:4001/remoteEntry.js",
			alias: "products",
		},
	],
});

const root = createRoot(appElement!);
root.render(<App />);
