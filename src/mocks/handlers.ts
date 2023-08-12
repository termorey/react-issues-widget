import { rest } from "msw";
import { $links } from "shared/config/links.ts";
import { generateIssue } from "./generators/generateIssue.ts";
import { generateStatusCodes } from "./generators/generateStatusCodes.ts";

export const handlers = [
	rest.get($links.getState().issues, (_, res, context) => {
		const issues = new Array(20)
			.fill(1)
			.map((v, i) => v + i)
			.map(generateIssue);
		return res(context.json(issues));
	}),
	rest.get($links.getState().issuesStatuses, (_, res, context) => {
		const statuses = generateStatusCodes();
		return res(context.json(statuses));
	}),
];
