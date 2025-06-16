import { CurrencyFormFields } from "./converter.types";

export const convertCurrencyValues = ({
	amount: amountField,
	fieldToUpdate,
	from,
	swapped,
	to,
	toAmount,
}: CurrencyFormFields) => {
	const rest = {
		amount: fieldToUpdate === "toAmount" ? amountField : toAmount,
		swapped,
		fieldToUpdate,
	};

	if (swapped) {
		return {
			leftSelectName: "to",
			rightSelectName: "from",
			from: to,
			to: from,
			...rest,
		} as const;
	}
	return {
		leftSelectName: "from",
		rightSelectName: "to",
		from,
		to,
		...rest,
	} as const;
};
