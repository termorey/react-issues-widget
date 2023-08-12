import { createApi, createEffect, createStore, sample } from "effector";
import { Issue } from "./interfaces.ts";
import { useStore } from "effector-react";
import { $links } from "shared/config/links.ts";

type State = Issue[];

const $issues = createStore<State>([]);
export const useIssuesStore = () => useStore($issues);
export const issuesApi = createApi($issues, {
	setIssues: (_, issues) => issues,
});

export const fetchIssuesFx = createEffect(async ({ signal }: { signal?: AbortSignal }) => {
	const link = $links.getState().issues;
	try {
		const result = await fetch(link, { signal });
		if (result.ok) return await result.json();
	} catch (e) {
		console.error(e);
	}
});

sample({
	clock: fetchIssuesFx.doneData,
	target: issuesApi.setIssues,
});
