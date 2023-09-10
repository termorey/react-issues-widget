import type { Links } from "shared/config/links";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "app";
import { isDev } from "shared/config/environment.ts";
import { linksApi } from "shared/config/links";

declare global {
	interface Window {
		widgets: {
			IssueWidget: Widget;
		};
	}
}
interface Options {
	element: HTMLElement;
	links: Links;
}

const create: (options: { element: HTMLElement }) => void = ({ element }) =>
	ReactDOM.createRoot(element).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);

export class Widget {
	constructor({ element, links }: Options) {
		linksApi.setLinks(links);
		create({ element });
	}
}

console.log("PREVIEW_MODE = ", import.meta.env.VITE_BUILD_MODE_PREVIEW);

const start = async () => {
	window.widgets = { ...window.widgets, IssueWidget: Widget };

	if (isDev) {
		const { startMockServer } = await import("./mocks/browser");
		const element = document.getElementById("root");
		const links: Links = {
			issues: "/api/issues",
			issuesStatuses: "/api/issues/statuses",
		};
		startMockServer();
		if (element) new Widget({ element, links });
		else throw Error("Undefined target element");
	}
};

if (import.meta.env.VITE_BUILD_MODE_PREVIEW) {
	const onClick = () => {
		const element = document.getElementById("root");
		const links = {
			issues: "/api/issues",
			issuesStatuses: "/api/issues/statuses",
		};
		const ImportedWidget = window.widgets.IssueWidget as typeof Widget;
		if (element) new ImportedWidget({ element, links });
	};

	const createButton = document.createElement("button");
	createButton.innerText = "Add widget on page";
	createButton.addEventListener("click", onClick);
	document.body.prepend(createButton);
}

start().catch((e) => console.log(e));
