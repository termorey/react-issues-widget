const randomNumber: (from: number, to: number) => number = (from, to) => Math.round(from + Math.random() * (to - from));
const randomString: (length: number, whitespaces?: boolean) => string = (length, whitespaces) => {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + (whitespaces ? " " : "");
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};
const randomBoolean: () => boolean = () => !!Math.round(Math.random());
const randomDate: () => string = () => new Date(Date.now() * Math.random()).toLocaleString();

export const generate = {
	randomNumber,
	randomString,
	randomBoolean,
	randomDate,
};
