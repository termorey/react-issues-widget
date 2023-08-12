import type { Issue } from "entities/issue/model/interfaces.ts";
import { generate } from "shared/lib/valuesGenerator.ts";
import { StatusCodes } from "entities/issue-status/model/interfaces.ts";

const status = Object.keys(StatusCodes) as (keyof typeof StatusCodes)[];

export const generateIssue: (id: Issue["id"]) => Issue = (id) => ({
	id,
	version: `ver_` + generate.randomString(3),
	statusCode: StatusCodes[status[generate.randomNumber(0, status.length - 1)]],
	title: `Title <${generate.randomString(15)}>`,
	body: `Body <${generate.randomString(150, true)}>`,
	publishedAt: generate.randomDate(),
	updatedAt: generate.randomBoolean() ? generate.randomDate() : undefined,
});
