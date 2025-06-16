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
	limits: () => ({
		queryKey: ["limits"],
		queryFn: () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					return resolve({
						PLN: 20000,
						EUR: 5000,
						GBP: 1000,
						UAH: 50000,
					});
				}, 1000);
			});
		},
	}),
	conversion: (values: ApiGetFxRates["RequestQuery"], deps: unknown[]) => ({
		queryKey: [values, deps],
		queryFn: () => API.getFxRates(values),
	}),
});

export const useGetCurrencies = () => {
	return useQuery({
		...CurrenciesQueryKeys.currencies(),
	});
};
export const useGetLimit = () => {
	return useQuery({
		...CurrenciesQueryKeys.limits(),
	});
};

type UseCurrencyConversionParams = {
	enabled?: boolean;
	values: ApiGetFxRates["RequestQuery"];
	deps: unknown[];
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
