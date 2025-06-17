import { CurrencyFormFields } from "./converter.types";

export const convertCurrencyValues = ({
	amount: amountField,
	convertedAmount,
	fieldToUpdate,
	from,
	to,
	isCurrencySwapped,
}: CurrencyFormFields) => {
	const fieldNames = {
		leftSelectName: isCurrencySwapped ? "to" : "from",
		rightSelectName: isCurrencySwapped ? "from" : "to",
	} as const;

	const fieldBasedValues =
		fieldToUpdate === "convertedAmount"
			? {
					from: isCurrencySwapped ? to : from,
					to: isCurrencySwapped ? from : to,
					amount: amountField,
			  }
			: {
					from: isCurrencySwapped ? from : to,
					to: isCurrencySwapped ? to : from,
					amount: convertedAmount,
			  };

	return {
		isCurrencySwapped,
		fieldToUpdate,
		...fieldNames,
		...fieldBasedValues,
	} as const;
};
