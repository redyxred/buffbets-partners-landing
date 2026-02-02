"use client";

import type { Dict, Locale } from "@/app/i18n/get-dictionary";
import { Container } from "../ui/Container";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";

interface RetentionProps {
	dict: Dict["retention"];
	lang: Locale;
}

export function Retention({ dict, lang }: RetentionProps) {
	const titleLines = dict.title.split("\n");

	return (
		<Section
			id="retention"
			parallaxRange={["0%", "20%"]}
			bgImage="/images/landings/arc-bg.jpg"
			bgClassName="absolute top-0 left-0 w-full h-full object-contain object-top -translate-y-1/4 -z-20"
			overlayOpacity={0.4}
		>
			<div className="absolute top-0 left-0 w-full h-75 bg-linear-to-b from-text-inverse via-text-inverse/80 to-transparent z-0 pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-full h-75 bg-linear-to-t from-text-inverse via-text-inverse/80 to-transparent z-0 pointer-events-none" />

			<Container className="relative z-10 h-full flex flex-col items-center justify-center text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					className="max-w-5xl"
				>
					<h2 className="font-bold text-white uppercase font-conthrax tracking-wide text-3xl md:text-5xl mb-8 md:mb-12">
						{titleLines.map((line, index) => (
							<span key={index} className="block">
								{line}
							</span>
						))}
					</h2>

					<div className="mb-12">
						<p className="text-[#CDCDCD] text-lg md:text-2xl font-regular">
							{dict.subtitle}
							<br />
							{dict.channels}
						</p>
						<p className="text-[#CDCDCD] text-lg md:text-2xl mt-6 max-w-4xl mx-auto">
							{dict.description}
						</p>
					</div>

					<Button href="/register" lang={lang} size="lg">
						{dict.cta}
					</Button>
				</motion.div>
			</Container>
		</Section>
	);
}
