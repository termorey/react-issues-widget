import React, { forwardRef } from "react";
import { a } from "@react-spring/web";
import { clsx } from "clsx";
import style from "./style.module.scss";
import { FlexColumn } from "../flex-column";

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
	columnGap?: number;
	nowrap?: boolean;
	flexEnd?: boolean;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const FlexRow = forwardRef<HTMLDivElement, Props>(
	({ columnGap, nowrap, flexEnd, children, className, style: propsStyle, ...props }, ref) => (
		<div
			ref={ref}
			className={clsx(style.row, nowrap && style.nowrap, flexEnd && style.flexEnd, className)}
			style={{ columnGap, ...propsStyle }}
			{...props}
		>
			{children}
		</div>
	)
);
export const AnimatedFlexRow = a(FlexColumn);
