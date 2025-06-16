import { cn } from "@/utils/cn";
import { InputWrapper, InputWrapperProps } from "./InputWrapper";

type InputProps = {
	className?: string;
	placeholder: string;
	wrapperProps: Omit<InputWrapperProps, "children">;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
	className,
	placeholder,
	wrapperProps,
	...props
}: InputProps) => {
	return (
		<InputWrapper {...wrapperProps}>
			<div className="relative">
				<input
					{...props}
					aria-label={`${props.name}-input`}
					className={cn(
						"w-full border-b-1 border-border text-primary text-2xl px-2 pr-8 py-1 focus:outline-none",
						className,
					)}
				/>
				<span
					aria-hidden
					className="absolute text-xs right-1 top-1/2 -translate-y-1/3 text-text-secondary"
				>
					{placeholder}
				</span>
			</div>
		</InputWrapper>
	);
};
