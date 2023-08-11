import React, { forwardRef } from "react";
import { clsx } from "clsx";
import style from "./style.module.scss";
import { a } from "@react-spring/web";

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
	className?: string;
	rowGap?: number;
}

export const FlexColumn = forwardRef<HTMLDivElement, Props>(
	({ rowGap, children, className, style: propsStyle, ...props }, ref) => (
		<div ref={ref} className={clsx(style.column, className)} style={{ rowGap, ...propsStyle }} {...props}>
			{children}
		</div>
	)
);

export const AnimatedFlexColumn = a(FlexColumn);
