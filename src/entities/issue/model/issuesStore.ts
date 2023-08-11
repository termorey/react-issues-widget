import { createApi, createEffect, createStore, sample } from "effector";
import { Issue } from "./interfaces.ts";
import { useStore } from "effector-react";
import { isDev } from "shared/config/environment";
import { generate } from "shared/lib/valuesGenerator";
import { generateIssue } from "../lib/generateMock";

type State = Issue[];

const $issues = createStore<State>([]);
export const useIssuesStore = () => useStore($issues);
export const issuesApi = createApi($issues, {
	setIssues: (_, issues) => issues,
});

export const fetchIssuesFx = createEffect(async ({ signal }: { signal?: AbortSignal }) => {
	try {
		if (isDev)
			return new Promise((resolve) =>
				setTimeout(
					() =>
						resolve(
							new Array(20)
								.fill(1)
								.map((v, i) => v + i)
								.map((id) => generateIssue(id))
						),
					generate.randomNumber(1000, 3000)
				)
			);
		const result = await fetch("issues_get_link", { signal });
		if (result.ok) return await result.json();
	} catch (e) {
		console.error(e);
	}
});

sample({
	clock: fetchIssuesFx.doneData,
	target: issuesApi.setIssues,
});
