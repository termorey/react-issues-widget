export type StatusCode = (typeof StatusCodes)[keyof typeof StatusCodes];

export interface Status {
	code: StatusCode;
	title: string;
}

export const StatusCodes = {
	rejected: 0,
	waiting: 1,
	inWork: 2,
	future: 3,
	resolved: 4,
} as const;
