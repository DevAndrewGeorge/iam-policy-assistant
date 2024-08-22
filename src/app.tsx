import { createRoot } from "react-dom/client";
import { createEditor } from "./editor";

function App() {
    return <h1>Hello, world!</h1>;
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
createEditor();