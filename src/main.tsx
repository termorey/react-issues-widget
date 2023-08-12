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

const start = async () => {
	window.widgets = { ...window.widgets, IssueWidget: Widget };

	if (isDev) {
		const { startMockServer } = await import("./mocks/browser");
		console.log("TEST");
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

start().catch((e) => console.log(e));
