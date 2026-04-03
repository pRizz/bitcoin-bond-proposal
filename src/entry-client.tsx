import { mount, StartClient } from "@solidjs/start/client";

const appElement = document.getElementById("app");

if (!appElement) {
	throw new Error("Missing app root element");
}

export default mount(() => <StartClient />, appElement);
