"use client";
import { ArrowRightLeft, LoaderCircle } from "lucide-react";
import Button from "../Button";

import { FormProvider } from "react-hook-form";
import { CurrencySelect } from "./components/CurrencySelect";

import { cn } from "@/utils/cn";
import { Input } from "../Inputs/Input";
import { CurrencySelectFooter } from "./components/CurrencySelectFooter";
import { useCurrencyConversionForm } from "./converter.hooks";

export function Converter() {
	const {
		form: {
			formMethods,
			values: { leftSelectName, rightSelectName, from, to, swapped },
		},
		query: { isError, isLoading, data },
	} = useCurrencyConversionForm();

	const {
		handleSubmit,
		register,
		setValue,
		formState: { isSubmitted, isValid },
	} = formMethods;

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

				{data ? (
					<CurrencySelectFooter>
						<div>
							{`${from} = ${
								isLoading ? (
									<LoaderCircle className="animate-spin w-4 h-4 text-text-secondary" />
								) : (
									`${data?.rate} ${to}`
								)
							}`}
						</div>
					</CurrencySelectFooter>
				) : (
					<Button size="large" type="submit" disabled={!isValid}>
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
