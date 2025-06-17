import { ApiGetFxRates } from "@/services/api";

export type CurrencyFormFields = ApiGetFxRates["RequestQuery"] & {
	convertedAmount: string;
	isCurrencySwapped: boolean;
	fieldToUpdate: keyof Pick<CurrencyFormFields, "amount" | "convertedAmount">;
};
