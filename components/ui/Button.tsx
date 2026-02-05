import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	href?: string;
	variant?: "primary" | "outline";
	size?: "sm" | "md" | "lg";
	className?: string;
	lang?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	target?: string;
}

export function Button({
	children,
	href,
	variant = "primary",
	size = "md",
	className = "",
	type = "button",
	onClick,
	lang,
	target,
}: ButtonProps) {
	const baseClasses =
		"font-rubik inline-flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95";

	const variants = {
		primary: "bg-primary text-black shadow-glow-primary hover:bg-primary-hover",
		outline:
			"border border-primary bg-dark text-white hover:bg-white hover:border-white hover:text-black",
	};

	const sizes = {
		sm: "text-sm xl:text-base font-bold uppercase px-6 xl:px-8 h-10 xl:h-14",
		md: "text-sm sm:text-base font-bold uppercase px-6 sm:px-8 h-12 sm:h-14",
		lg: "text-base sm:text-lg font-bold uppercase px-12 sm:px-24 h-14 sm:h-16",
	};

	const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

	if (href) {
		let finalHref = href;

		if (lang && href.startsWith("/") && !href.startsWith("//")) {
			const cleanPath = href.startsWith("/") ? href : `/${href}`;
			finalHref = `/${lang}${cleanPath}`;
		}

		return (
			<Link href={finalHref} className={combinedClasses} target={target}>
				{children}
			</Link>
		);
	}

	return (
		<button type={type} className={combinedClasses} onClick={onClick}>
			{children}
		</button>
	);
}
