import { type Status } from "./interfaces.ts";
import { createApi, createEffect, createStore, sample } from "effector";
import { useStore } from "effector-react";
import { $links } from "shared/config/links.ts";
import { generateStatusCodes } from "mocks/generators/generateStatusCodes.ts";

type State = {
	[code: number]: Status;
};

const $issuesStatuses = createStore<State>({});
export const useIssuesStatuses = () => useStore($issuesStatuses);
export const issuesStatuses = createApi($issuesStatuses, {
	setStatuses: (_, statuses) => statuses,
});

export const fetchIssuesStatusesFx = createEffect(async ({ signal }: { signal?: AbortSignal }) => {
	const link = $links.getState().issuesStatuses;
	try {
		if (import.meta.env.VITE_BUILD_MODE_PREVIEW) return generateStatusCodes();
		const result = await fetch(link, { signal });
		if (result.ok) return await result.json();
	} catch (e) {
		console.error(e);
	}
});

sample({
	clock: fetchIssuesStatusesFx.doneData,
	target: issuesStatuses.setStatuses,
});
