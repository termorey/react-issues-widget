import type { StatusCode } from "entities/issue-status/model/interfaces.ts";

export interface Issue {
	id: number;
	version: string;
	statusCode: StatusCode;
	title: string;
	body: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
}
