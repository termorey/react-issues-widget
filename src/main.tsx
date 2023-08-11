import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

declare global {
	interface Window {
		widgets: {
			IssueWidget: Widget;
		};
	}
}

const create: (options: { element: HTMLElement }) => void = ({ element }) =>
	ReactDOM.createRoot(element).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);

export class Widget {
	constructor({ element }: { element: HTMLElement }) {
		create({ element });
	}
}

window.widgets = { ...window.widgets, IssueWidget: Widget };

if (process.env.NODE_ENV?.trim() === "development") {
	const element = document.getElementById("root");
	if (element) new Widget({ element });
	else throw Error("Undefined target element");
}
