import { cn } from "@/utils/cn";

export type InputWrapperProps = {
	children: React.ReactNode;
	label: string;
	className?: string;
};

export const InputWrapper = ({
	label,
	className,
	children,
}: InputWrapperProps) => {
	return (
		<label
			className={cn("w-[180px] flex flex-col justify-center", className)}
		>
			<span className="text-xs text-text-secondary ">{label}</span>
			{children}
		</label>
	);
};
