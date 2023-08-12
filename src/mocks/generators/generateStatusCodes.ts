import { Status, StatusCodes } from "entities/issue-status/model/interfaces.ts";

export const generateStatusCodes: () => { [code: number]: Status } = () =>
	Object.entries(StatusCodes)
		.map(([key, code]) => ({ code, title: key }))
		.reduce((prev, curr) => ({ ...prev, [curr.code]: curr }), {});
