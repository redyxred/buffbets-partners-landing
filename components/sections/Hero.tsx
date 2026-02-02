"use client";

import type { Dict, Locale } from "@/app/i18n/get-dictionary";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import Image from "next/image";
import { Section } from "../ui/Section";
import { ParallaxElement } from "../ui/ParallaxElement";
import { motion } from "framer-motion";

interface HeroProps {
	dict: Dict["hero"];
	lang: Locale;
}

export function Hero({ dict, lang }: HeroProps) {
	const titleLines = dict.title.split("\n");

	return (
		<Section
			id="hero"
			bgImage="/images/hero/hero-background.png"
			bgClassName="-top-[55%] h-[150%] w-full"
			parallaxRange={["-15%", "20%"]}
			className="z-30"
		>
			<Container className="grid md:grid-cols-2 items-center min-h-[90vh]">
				<ParallaxElement speed={2}>
					<motion.div
						initial={{
							opacity: 0,
							x: -100,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							duration: 0.6,
						}}
						className="relative z-10 flex flex-col items-start text-left min-w-0"
					>
						<h1 className="font-conthrax uppercase text-white mb-6">
							{titleLines.map((line, index) => (
								<span
									key={index}
									className="block whitespace-nowrap text-3xl sm:text-4xl md:text-5xl xl:text-[64px] leading-[1.1]"
								>
									{line}
								</span>
							))}
						</h1>

						<p className="w-full text-lg md:text-[28px] text-gray-200 leading-[1.1] mb-10 ">
							{dict.subtitle}
						</p>

						<Button href="/register" lang={lang} size="lg">
							{dict.register}
						</Button>
					</motion.div>
				</ParallaxElement>

				<div className="relative z-20 justify-self-end w-full flex justify-end">
					<ParallaxElement speed={5}>
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{
								duration: 1,
								delay: 0.4,
							}}
							className="w-full"
						>
							<Image
								src="/images/hero/rocket.png"
								width={500}
								height={500}
								className="w-full max-w-100 md:max-w-full h-auto object-contain"
								alt="Rocket"
							/>
						</motion.div>
					</ParallaxElement>
				</div>
			</Container>
		</Section>
	);
}
