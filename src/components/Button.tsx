"use client";
import { cn } from "@/utils/cn";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
	variant?: "primary" | "invisible";
	size?: "small" | "medium" | "large";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
	primary:
		"bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] hover:brightness-90",
	invisible:
		"p-1 bg-transparent text-inherit hover:bg-[var(--color-button-invisible-hover)] focus:bg-[var(--color-button-invisible-focus)] shadow-none border-none",
};

export default function Button({
	children,
	variant = "primary",
	className,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(
				"px-4 py-2 cursor-pointer rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
				variantClasses[variant],
				className,
			)}
		>
			{children}
		</button>
	);
}
