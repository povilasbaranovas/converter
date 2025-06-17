import { convertCurrencyValues } from "./converter.utils";
import { CurrencyFormFields } from "./converter.types";

describe("convertCurrencyValues", () => {
	const baseFields: Omit<CurrencyFormFields, "fieldToUpdate"> = {
		amount: "100",
		convertedAmount: "200",
		from: "EUR",
		to: "PLN",
		isCurrencySwapped: false,
	};

	it("should handle fieldToUpdate = 'convertedAmount', swapped = false", () => {
		const result = convertCurrencyValues({
			...baseFields,
			fieldToUpdate: "convertedAmount",
		});
		expect(result).toEqual({
			leftSelectName: "from",
			rightSelectName: "to",
			isCurrencySwapped: false,
			fieldToUpdate: "convertedAmount",
			from: "EUR",
			to: "PLN",
			amount: "100",
		});
	});

	it("should handle fieldToUpdate = 'convertedAmount', swapped = true", () => {
		const result = convertCurrencyValues({
			...baseFields,
			fieldToUpdate: "convertedAmount",
			isCurrencySwapped: true,
		});
		expect(result).toEqual({
			leftSelectName: "to",
			rightSelectName: "from",
			isCurrencySwapped: true,
			fieldToUpdate: "convertedAmount",
			from: "PLN",
			to: "EUR",
			amount: "100",
		});
	});

	it("should handle fieldToUpdate = 'amount', swapped = false", () => {
		const result = convertCurrencyValues({
			...baseFields,
			fieldToUpdate: "amount",
		});
		expect(result).toEqual({
			leftSelectName: "from",
			rightSelectName: "to",
			isCurrencySwapped: false,
			fieldToUpdate: "amount",
			from: "PLN",
			to: "EUR",
			amount: "200",
		});
	});

	it("should handle fieldToUpdate = 'amount', swapped = true", () => {
		const result = convertCurrencyValues({
			...baseFields,
			fieldToUpdate: "amount",
			isCurrencySwapped: true,
		});
		expect(result).toEqual({
			leftSelectName: "to",
			rightSelectName: "from",
			isCurrencySwapped: true,
			fieldToUpdate: "amount",
			from: "EUR",
			to: "PLN",
			amount: "200",
		});
	});
});
