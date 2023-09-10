import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { IssueListItem } from "features/issue-list-item";
import { fetchIssuesFx, useIssuesStore } from "entities/issue/model/issuesStore";
import { fetchIssuesStatusesFx, useIssuesStatuses } from "entities/issue-status/model/issuesStatusesStore.ts";
import { FlexColumn, Preloader } from "shared/ui";

export const IssuesList = () => {
	const issues = useIssuesStore();
	const issuesStatuses = useIssuesStatuses();
	const [pending, setPending] = useState(false);

	useEffect(() => {
		const fetchController = new AbortController();
		const createIssues: (options: { signal: AbortSignal }) => void = ({ signal }) => {
			setPending(true);
			Promise.all([fetchIssuesFx({ signal }), fetchIssuesStatusesFx({ signal })]).finally(() => {
				setPending(false);
			});
		};
		createIssues({ signal: fetchController.signal });

		return () => {
			fetchController.abort("Component unmount");
		};
	}, []);

	return (
		<FlexColumn className={style.issues} rowGap={16}>
			<h3 className={style.title}>{"Known issues list"}</h3>
			{pending ? (
				<Preloader />
			) : (
				<FlexColumn rowGap={16} className={style.list}>
					{issues.map(
						(issue) =>
							issuesStatuses[issue.statusCode] && (
								<IssueListItem issue={issue} status={issuesStatuses[issue.statusCode]} key={issue.id} />
							)
					)}
				</FlexColumn>
			)}
		</FlexColumn>
	);
};
