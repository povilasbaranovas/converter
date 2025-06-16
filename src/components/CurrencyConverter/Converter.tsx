"use client";
import { useCurrencyConversion } from "@/services/currency.service/currency.service";
import { ArrowRightLeft, LoaderCircle } from "lucide-react";
import Button from "../Button";

import { ApiGetFxRates } from "@/services/api";
import { FormProvider, useForm } from "react-hook-form";
import { CurrencySelect } from "./components/CurrencySelect";

import { cn } from "@/utils/cn";
import { useEffect } from "react";
import { Input } from "../Inputs/Input";
import { CurrencySelectFooter } from "./components/CurrencySelectFooter";

export type CurrencyFormFields = ApiGetFxRates["RequestQuery"] & {
	toAmount: string;
	swapped: boolean;
	fieldToUpdate: keyof Pick<CurrencyFormFields, "amount" | "toAmount">;
};

export function Converter() {
	const formMethods = useForm<CurrencyFormFields>({
		mode: "onChange",
		defaultValues: {
			amount: "1",
			from: "EUR",
			to: "GBP",
			toAmount: "",
			swapped: false,
			fieldToUpdate: "toAmount",
		},
	});

	const {
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { isSubmitted, isDirty, isValid },
	} = formMethods;

	const {
		amount,
		from: fromField,
		to: toField,
		toAmount,
		fieldToUpdate,
		swapped,
	} = watch();

	const { from, to, leftSelectName, rightSelectName } = {
		leftSelectName: swapped ? "to" : "from",
		rightSelectName: swapped ? "from" : "to",
		from: swapped ? toField : fromField,
		to: swapped ? fromField : toField,
	} as const;

	const { data, isError, isLoading, isFetching } = useCurrencyConversion({
		deps: [fieldToUpdate, swapped],
		values: {
			amount: fieldToUpdate === "toAmount" ? amount : toAmount,
			from,
			to,
		},
		enabled: isSubmitted,
	});

	useEffect(() => {
		if (!isFetching && data?.toAmount) {
			setValue(fieldToUpdate, data?.toAmount?.toString());
		}
	}, [data?.toAmount, isFetching, fieldToUpdate, setValue]);

	return (
		<FormProvider {...formMethods}>
			<form
				onSubmit={handleSubmit(() => null)}
				className="mx-auto bg-background shadow-xl p-8 flex flex-col gap-8"
				data-testid="converter-form"
			>
				<div className="flex items-end gap-4 ">
					<CurrencySelect name={leftSelectName} label="FROM:" />
					<Button
						type="button"
						variant="invisible"
						onClick={() => {
							setValue("swapped", !swapped);
						}}
					>
						<ArrowRightLeft className="text-secondary w-5 h-5" />
					</Button>
					<CurrencySelect name={rightSelectName} label="TO:" />
				</div>
				<div
					className={cn(
						"grid grid-cols-1 gap-4",
						isSubmitted && "grid-cols-2",
					)}
				>
					<Input
						wrapperProps={{
							className: cn(!isSubmitted && "w-full"),
							label: "AMOUNT:",
						}}
						placeholder={from}
						{...register("amount", {
							onChange: () => {
								setValue("fieldToUpdate", "toAmount");
							},
							required: "Required",
							validate: (value) => {
								const numValue = parseFloat(value);
								if (isNaN(numValue) || numValue <= 0) {
									return "Amount must be a positive number";
								}
								return true;
							},
						})}
					/>

					{isSubmitted ? (
						<Input
							wrapperProps={{ label: "CONVERTED TO:" }}
							placeholder={to}
							{...register("toAmount", {
								onChange: () => {
									setValue("fieldToUpdate", "amount");
								},
								required: "Required",
								validate: (value) => {
									const numValue = value
										? parseFloat(value)
										: NaN;
									if (isNaN(numValue) || numValue <= 0) {
										return "Amount must be a positive number";
									}
									return true;
								},
							})}
						/>
					) : null}
				</div>

				{isLoading || data ? (
					<CurrencySelectFooter>
						{from} ={" "}
						{isLoading ? (
							<LoaderCircle className="animate-spin w-4 h-4 text-text-secondary" />
						) : (
							`${data?.rate.toFixed(4)} ${to}`
						)}
					</CurrencySelectFooter>
				) : (
					<Button
						size="large"
						type="submit"
						disabled={!isValid || !isDirty}
					>
						{isLoading ? "Converting..." : "Convert"}
					</Button>
				)}

				{isError && (
					<div className="text-red-500 mt-2">
						An error has occurred
					</div>
				)}
			</form>
		</FormProvider>
	);
}
