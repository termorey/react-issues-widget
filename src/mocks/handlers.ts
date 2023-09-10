import { rest } from "msw";
import { $links } from "shared/config/links.ts";
import { generateIssuesList } from "./generators/generateIssue.ts";
import { generateStatusCodes } from "./generators/generateStatusCodes.ts";

export const handlers = [
	rest.get($links.getState().issues, (_, res, context) => {
		const issues = generateIssuesList(20);
		return res(context.json(issues));
	}),
	rest.get($links.getState().issuesStatuses, (_, res, context) => {
		const statuses = generateStatusCodes();
		return res(context.json(statuses));
	}),
];
