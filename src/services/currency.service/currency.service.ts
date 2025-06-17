import { CURRENCIES } from "@/constants/currencies";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/react-query";
import { API, ApiGetFxRates } from "../api";

export const CurrenciesQueryKeys = createQueryKeys("currency", {
	currencies: () => ({
		queryKey: ["countries"],
		queryFn: () => {
			return new Promise<typeof CURRENCIES>((resolve) => {
				setTimeout(() => {
					resolve(CURRENCIES);
				}, 500);
			});
		},
	}),
	conversion: (
		values: ApiGetFxRates["RequestQuery"],
		deps: (string | boolean)[],
	) => ({
		queryKey: [values, ...deps],
		queryFn: () => API.getFxRates(values),
	}),
});

export const useGetCurrencies = () => {
	return useQuery({
		...CurrenciesQueryKeys.currencies(),
	});
};

type UseCurrencyConversionParams = {
	enabled?: boolean;
	values: ApiGetFxRates["RequestQuery"];
	deps: (string | boolean)[];
};

export const useCurrencyConversion = ({
	deps,
	values,
	enabled,
}: UseCurrencyConversionParams) => {
	return useQuery({
		...CurrenciesQueryKeys.conversion(values, deps),
		enabled,
		placeholderData: (previousData) => previousData,
	});
};
