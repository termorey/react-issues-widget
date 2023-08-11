import { a } from "@react-spring/web";
import style from "./style.module.scss";

export const Preloader = ({ ...props }) => (
	<div className={style.preloader} {...props}>
		<span />
		<span />
		<span />
	</div>
);

export const AnimatedPreloader = a(Preloader);
