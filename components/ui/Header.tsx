"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { Container } from "./Container";
import type { Dict, Locale } from "@/app/i18n/get-dictionary";
import { Button } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ScrollContext } from "./ScrollContext";

interface HeaderProps {
	lang: Locale;
	dict: Dict["header"];
}

export function Header({ dict, lang }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const containerRef = useContext(ScrollContext);

	const navLinks = [
		{ href: `/${lang}#advantages`, label: dict.nav.advantages },
		{ href: `/${lang}#faq`, label: dict.nav.faq },
		{ href: `/${lang}#providers`, label: dict.nav.providers },
		{ href: `/${lang}#contacts`, label: dict.nav.contacts },
	];

	useEffect(() => {
		const container = containerRef?.current;
		if (!container) return;

		const handleScroll = () => {
			if (container.scrollTop > 100) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		handleScroll();

		container.addEventListener("scroll", handleScroll);
		return () => container.removeEventListener("scroll", handleScroll);
	}, [containerRef]);

	return (
		<header
			className={`
				fixed top-0 left-0 right-0 w-full z-50 py-2 transition-all duration-300
				${
					isScrolled
						? "bg-text-inverse/50 backdrop-blur-md border-b border-white/10"
						: "bg-transparent border-b border-transparent"
				}
		`}
		>
			<Container
				as="nav"
				className={`
					flex justify-between items-center transition-all
					${isScrolled ? "h-16 md:h-20" : "h-20 md:h-24"}	
				`}
			>
				<div className="flex gap-x-12">
					<Link
						href={`/${lang}`}
						className="shrink-0 relative block transition-transform hover:scale-105"
					>
						<Image
							src="/images/logo.svg"
							alt="BUFFBETS Logo"
							width={195}
							height={79}
							priority
							className="h-12 md:h-16 w-auto object-contain"
						/>
					</Link>

					<nav className="hidden md:flex items-center gap-10">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-base font-medium text-gray-300 uppercase hover:text-accent-purple hover:scale-105 transition-all duration-300"
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>

				<div className="flex items-center gap-6">
					<Button size="md" href="/register" lang={lang}>
						{dict.register}
					</Button>
					<Button variant="outline" size="md" href="/login" lang={lang}>
						{dict.login}
					</Button>
					<LanguageSwitcher currentLang={lang} availableLangs={["en", "ru"]} />
				</div>
			</Container>
		</header>
	);
}
