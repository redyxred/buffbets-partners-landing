import { ElementType, ReactNode } from "react";

interface ContainerProps {
	children: ReactNode;
	className?: string;
	as?: ElementType;
}

export function Container({
	children,
	className = "",
	as: Component = "div",
}: ContainerProps) {
	return (
		<Component
			className={`
            mx-auto w-full
            max-w-(--width-container-main)
            px-4 md:px-8 lg:px-12
            ${className}
        `}
		>
			{children}
		</Component>
	);
}
