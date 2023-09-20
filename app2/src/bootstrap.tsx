import { createRoot } from "react-dom/client";

const appElement = document.getElementById("app");

const root = createRoot(appElement!);
root.render(<div>This is app2</div>);
