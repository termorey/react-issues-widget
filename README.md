# Usage as widget

- Build app with build command
- Include links in your page like in the build html file from dist directory
- Use script to start module on page
```ts
const element = document.getElementById('element-id');
if (element && window.widgets?.IssueWidget) {
	const links: Links = {
		issues: "/api/issues",
		issuesStatuses: "/api/issues/statuses",
	};
	new window.widgets.IssueWidget({element, links});
}
```
- `element` can be a `flex` container for creation adaptive height



# Endpoints
## Issues
```ts
type Response = Array<Issue>;
```
## Issues statuses

```ts
type Response = {
	[code: StatusCode]: Status<StatusCode>;
}

interface Status<Code extends StatusCode> {
	code: Code;
	title: string;
}
```



# Types
## Options
```ts
interface Options {
	element: HTMLElement;
	links: Links;
}
```
## Links
```ts
interface Links {
	issues: string;
	issuesStatuses: string;
}
```
## Issue
```ts
interface Issue {
	id: number;
	version: string;
	statusCode: StatusCode;
	title: string;
	body: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
}
```
## Status
```ts
interface Status {
	code: StatusCode;
	title: string;
}
```
## StatusCode
Examples of status codes with visual style

```ts
type StatusCode = 0 | 1 | 2 | 3 | 4; // ... number
const StatusCodes: { [name: string]: StatusCode } = {
	rejected: 0, // rejected problem
	waiting: 1, // waiting any another status
	inWork: 2, // now in work
	future: 3, // will be in the future update
	resolved: 4, // just resolved
}
```