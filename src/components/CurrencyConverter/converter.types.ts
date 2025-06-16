import { ApiGetFxRates } from "@/services/api";

export type CurrencyFormFields = ApiGetFxRates["RequestQuery"] & {
	toAmount: string;
	swapped: boolean;
	fieldToUpdate: keyof Pick<CurrencyFormFields, "amount" | "toAmount">;
};
