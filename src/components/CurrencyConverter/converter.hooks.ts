import { useCurrencyConversion } from "@/services/currency.service/currency.service";

import { useEffect } from "react";
import { convertCurrencyValues } from "./converter.utils";
import { DEFAULT_CURRENCY_VALUES } from "./converter.constants";
import { CurrencyFormFields } from "./converter.types";
import { useForm } from "react-hook-form";

export const useCurrencyConversionForm = () => {
	const formMethods = useForm<CurrencyFormFields>({
		mode: "onChange",
		defaultValues: DEFAULT_CURRENCY_VALUES,
	});

	const {
		amount,
		from,
		to,
		leftSelectName,
		rightSelectName,
		fieldToUpdate,
		swapped,
	} = convertCurrencyValues(formMethods.watch());

	const query = useCurrencyConversion({
		deps: [fieldToUpdate, swapped],
		values: {
			amount,
			from,
			to,
		},
		enabled: formMethods.formState.isSubmitted,
	});

	useEffect(() => {
		if (!query.isFetching && query.data?.toAmount) {
			formMethods.setValue(
				fieldToUpdate,
				query.data?.toAmount?.toString(),
			);
		}
	}, [query.data?.toAmount, query.isFetching, fieldToUpdate, formMethods]);

	return {
		query,
		form: {
			formMethods,
			values: {
				from,
				to,
				leftSelectName,
				rightSelectName,
				amount,
				fieldToUpdate,
				swapped,
			},
		},
	};
};
