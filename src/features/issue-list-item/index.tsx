import type { UseTransitionProps } from "@react-spring/web";
import type { Issue } from "entities/issue/model/interfaces.ts";
import type { Status } from "entities/issue-status/model/interfaces.ts";
import React, { useRef, useState } from "react";
import { a, useTransition } from "@react-spring/web";
import style from "./style.module.scss";
import { IssueStatus } from "entities/issue-status/ui/issue-status";
import { AnimatedFlexColumn, FlexColumn, FlexRow, Label } from "shared/ui";

interface Props {
	issue: Issue;
	status: Status;
}

const transitionProps: UseTransitionProps = {
	from: { opacity: 0 },
	enter: { opacity: 1 },
	leave: { opacity: 0 },
	expires: true,
};

export const IssueListItem: React.FC<Props> = ({ issue, status, ...props }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [showBody, setShowBody] = useState(false);

	const transition = useTransition(showBody, transitionProps);

	return (
		<FlexColumn ref={ref} className={style.item} rowGap={16} {...props}>
			<FlexRow className={style.info} nowrap columnGap={16} onClick={() => setShowBody((v) => !v)}>
				<div>{issue.version}</div>
				<IssueStatus status={status} />
				{transition(
					(spring, show) =>
						!show && (
							<a.div className={style.title} style={spring}>
								{issue.title}
							</a.div>
						)
				)}
			</FlexRow>
			{transition(
				(spring, show) =>
					show && (
						<AnimatedFlexColumn className={style.description} style={spring} rowGap={8}>
							<FlexRow>{issue.title}</FlexRow>
							<FlexRow>{issue.body}</FlexRow>
							<FlexRow columnGap={8} flexEnd>
								{issue.updatedAt ? <Label text={"Updated at " + issue.updatedAt} /> : null}
								{issue.publishedAt ? <Label text={"Published at " + issue.publishedAt} /> : null}
							</FlexRow>
						</AnimatedFlexColumn>
					)
			)}
		</FlexColumn>
	);
};
