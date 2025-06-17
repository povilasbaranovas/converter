import { CurrencyFormFields } from "./converter.types";

export const DEFAULT_CURRENCY_VALUES: CurrencyFormFields = {
	amount: "1",
	from: "EUR",
	to: "GBP",
	convertedAmount: "",
	isCurrencySwapped: false,
	fieldToUpdate: "convertedAmount",
};
