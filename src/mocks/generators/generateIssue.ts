import type { Issue } from "entities/issue/model/interfaces.ts";
import { generate } from "shared/lib/valuesGenerator.ts";
import { StatusCodes } from "entities/issue-status/model/interfaces.ts";

const status = Object.keys(StatusCodes) as (keyof typeof StatusCodes)[];

export const generateIssue: (id: Issue["id"]) => Issue = (id) => ({
	id,
	version: `ver_` + generate.randomNumber(1, 3) + "." + generate.randomNumber(0, 4),
	statusCode: StatusCodes[status[generate.randomNumber(0, status.length - 1)]],
	title: `Title <${generate.randomString(15)}>`,
	body: `Body <${generate.randomString(150, true)}>`,
	publishedAt: generate.randomDate(),
	updatedAt: generate.randomBoolean() ? generate.randomDate() : undefined,
});
export const generateIssuesList: (length?: number) => Issue[] = (length = 20) =>
	new Array(length)
		.fill(1)
		.map((v, i) => v + i)
		.map(generateIssue)
		.sort((a, b) => (a.version < b.version ? 1 : a.version > b.version ? -1 : 0));
