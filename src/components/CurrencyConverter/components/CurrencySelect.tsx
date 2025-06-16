"use client";
import { useGetCurrencies } from "@/services/currency.service/currency.service";

import { ApiGetFxRates } from "@/services/api";
import { Controller, useFormContext } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../Inputs/Select/Select";
import { InputWrapper } from "@/components/Inputs/InputWrapper";
import { LoaderCircle } from "lucide-react";
import { CurrencyFormFields } from "../Converter";

type CurrencySelectProps = {
	label: string;
	name: keyof ApiGetFxRates["RequestQuery"];
};

export const CurrencySelect = ({ name, label }: CurrencySelectProps) => {
	const { data, isLoading } = useGetCurrencies();
	const { control } = useFormContext<CurrencyFormFields>();

	return (
		<InputWrapper label={label} key={name + label}>
			<Controller
				control={control}
				name={name}
				rules={{ required: true }}
				render={({ field: { onChange, ...field } }) => {
					return (
						<Select
							disabled={isLoading}
							onValueChange={onChange}
							{...field}
						>
							<SelectTrigger className="w-[180px] ">
								{isLoading ? (
									<LoaderCircle className="animate-spin" />
								) : (
									<SelectValue />
								)}
							</SelectTrigger>
							<SelectContent>
								{data?.map(({ code, flag }) => (
									<SelectItem
										key={code}
										value={code}
										data-testid={`option-${code}`}
									>
										{flag} {code}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					);
				}}
			></Controller>
		</InputWrapper>
	);
};
