"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "./Container";
import { Dict, Locale } from "@/app/i18n/get-dictionary";
import Link from "next/link";

interface FooterProps {
	className?: string;
	lang: Locale;
	dict: Dict["footer"];
}

export function Footer({ className, lang, dict }: FooterProps) {
	const navLinks = [
		{ href: `/${lang}#advantages`, label: dict.nav.recomendations },
		{ href: `/${lang}#faq`, label: dict.nav.privacy_policy },
		{ href: `/${lang}#providers`, label: dict.nav.rules },
	];

	return (
		<motion.footer
			initial={{ opacity: 0, y: 100 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.4 }}
			className={`w-full h-auto py-6 sm:py-8 md:py-12 ${className}`}
		>
			<Container className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
				<Link
					href={`/${lang}`}
					className="shrink-0 relative block transition-transform hover:scale-105"
				>
					<Image
						src="/images/logo.svg"
						alt="Logo"
						width={155}
						height={79}
						className="h-10 sm:h-12 md:h-16 w-auto object-contain"
					/>
				</Link>

				<nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-xs sm:text-sm md:text-base font-medium text-gray-300 uppercase hover:text-accent-purple hover:scale-105 transition-all duration-300"
						>
							{link.label}
						</Link>
					))}
				</nav>
			</Container>
		</motion.footer>
	);
}
