import style from "./style.module.scss";

interface Props {
	text: string;
}

export const Label = ({ text }: Props) => <span className={style.label}>{text}</span>;
