import { type Status } from "./interfaces.ts";
import { createApi, createEffect, createStore, sample } from "effector";
import { useStore } from "effector-react";
import { isDev } from "shared/config/environment.ts";
import { generate } from "shared/lib/valuesGenerator.ts";
import { generateStatusCodes } from "../lib/generateMock.ts";

type State = {
	[code: number]: Status;
};

const $issuesStatuses = createStore<State>({});
export const useIssuesStatuses = () => useStore($issuesStatuses);
export const issuesStatuses = createApi($issuesStatuses, {
	setStatuses: (_, statuses) => statuses,
});

export const fetchIssuesStatusesFx = createEffect(async ({ signal }: { signal?: AbortSignal }) => {
	try {
		if (isDev)
			return await new Promise((resolve) =>
				setTimeout(() => resolve(generateStatusCodes()), generate.randomNumber(1000, 3000))
			);
		const result = await fetch("https://issues_statuses_get_link", { signal });
		if (result.ok) return await result.json();
	} catch (e) {
		console.error(e);
	}
});

sample({
	clock: fetchIssuesStatusesFx.doneData,
	target: issuesStatuses.setStatuses,
});
