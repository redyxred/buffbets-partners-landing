"use client";

import { Locale } from "@/app/i18n/get-dictionary";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface LanguageSwitcherProps {
	currentLang: Locale;
	availableLangs: Locale[];
}

export function LanguageSwitcher({
	currentLang,
	availableLangs,
}: LanguageSwitcherProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	const getSwitchLink = (targetLang: Locale) => {
		if (!pathname) return `/${targetLang}`;
		const segments = pathname.split("/");
		segments[1] = targetLang;

		return segments.join("/");
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative z-50 w-14 h-14 flex items-center justify-center"
		>
			<div
				className={`
                    absolute top-0 left-0 w-full flex flex-col items-center overflow-hidden
                    transition-all duration-300 ease-out
                    bg-dark
                    ${
											isOpen
												? "rounded-4xl border border-accent-purple"
												: "h-14 rounded-full border border-transparent bg-opacity-50 hover:bg-accent-purple"
										}  
                `}
				style={{ height: isOpen ? "auto" : "3.5rem" }}
			>
				<button
					onClick={() => setIsOpen((prev) => !prev)}
					className="w-14 h-14 flex items-center justify-center font-bold text-sm uppercase text-white transition-colors cursor-pointer shrink-0"
				>
					{currentLang}
				</button>

				<div
					className={`
                flex flex-col gap-1 items-center transition-all duration-300
                ${isOpen ? "opacity-100 max-h-20 translate-y-0 pb-2" : "opacity-0 max-h-0 -translate-y-2 pointer-events-none"}
            `}
				>
					{availableLangs
						.filter((lang) => lang !== currentLang)
						.map((lang) => (
							<Link
								href={getSwitchLink(lang)}
								key={lang}
								onClick={() => setIsOpen(false)}
								className="w-14 h-10 flex items-center justify-center font-bold text-sm uppercase text-white hover:text-primary transition-colors shrink-0"
							>
								{lang}
							</Link>
						))}
				</div>
			</div>
		</div>
	);
}
