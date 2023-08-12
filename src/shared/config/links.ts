import { createApi, createStore } from "effector";

export interface Links {
	issues: string;
	issuesStatuses: string;
}

export const $links = createStore<Links>({
	issues: "/api/issues",
	issuesStatuses: "/api/issues/statuses",
});
export const linksApi = createApi($links, {
	setLinks: (_, links: Links) => links,
});
