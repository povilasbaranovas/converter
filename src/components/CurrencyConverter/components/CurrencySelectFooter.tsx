"use client";
import { CircleIcon } from "lucide-react";

export type CurrencySelectFooterProps = { children: React.ReactNode };

export function CurrencySelectFooter({ children }: CurrencySelectFooterProps) {
	return (
		<footer className="text-sm flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<span className="text-warning text-lg ">
					<CircleIcon className="w-3 h-3" />
				</span>
				<span className="font-semibold flex items-center gap-1">
					{children}
				</span>
			</div>
			<div className="text-xs text-text-secondary text-pretty">
				All figures are live mid-market rates, which are for
				informational purposes only.
				<br />
				To see the rates for money transfer, please select sending money
				option.
			</div>
		</footer>
	);
}
