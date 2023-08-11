import React from "react";
import style from "./style.module.scss";
import { Status } from "../../model/interfaces.ts";

interface Props {
	status: Status;
}

export const IssueStatus: React.FC<Props> = ({ status }) => (
	<div className={style.status} data-status={status.code}>
		{status.title}
	</div>
);
