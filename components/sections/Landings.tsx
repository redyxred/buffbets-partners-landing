"use client";

import type { Dict, Locale } from "@/app/i18n/get-dictionary";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxElement } from "../ui/ParallaxElement";
import { Button } from "../ui/Button";

interface LandingsProps {
	dict: Dict["landings"];
	lang: Locale;
}

export function Landings({ dict, lang }: LandingsProps) {
	const titleLines = dict.title.split("\n");

	return (
		<Section
			id="landings"
			bgImage="/images/landings/landings-bg.png"
			bgClassName="absolute inset-0 w-full h-full z-0 top-0 md:top-0 scale-45"
		>
			<div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
				<motion.div
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute w-200 h-200 bg-accent-purple/40 blur-[180px] rounded-full mix-blend-screen"
				/>

				<motion.div
					animate={{
						x: [-100, 100, -100],
						y: [-50, 50, -50],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute w-120 h-120 bg-blue-400/15 blur-[150px] rounded-full mix-blend-screen"
				/>
			</div>

			<div className="absolute top-0 left-0 w-full h-75 bg-linear-to-b from-text-inverse via-text-inverse/80 to-transparent z-0 pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-full h-75 bg-linear-to-t from-text-inverse via-text-inverse/80 to-transparent z-0 pointer-events-none" />

			<Container className="relative z-10">
				<ParallaxElement speed={2} type="fly-up">
					<div className="text-center mb-16 md:mb-24">
						<motion.h2
							className="font-bold font-conthrax uppercase leading-[1.1] tracking-wide text-2xl md:text-4xl lg:text-5xl"
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6 }}
						>
							{titleLines.map((line, index) =>
								index === 0 ? (
									<span key={index} className="block">
										{line}
									</span>
								) : (
									<span key={index} className="block text-3xl">
										{line}
									</span>
								),
							)}
						</motion.h2>
					</div>
				</ParallaxElement>

				{/* CONTENT */}
				<div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center mb-16">
					{/* LEFT */}
					<div className="relative w-full flex justify-center lg:justify-start min-h-75 md:min-h-120">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="relative z-10 w-[80%] md:w-[70%]"
						>
							<Image
								src="/images/landings/laptop.png"
								alt="Laptop"
								width={800}
								height={500}
								className="w-full h-auto object-contain"
							/>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: -50, y: 20 }}
							whileInView={{ opacity: 1, x: 0, y: 0 }}
							transition={{
								duration: 0.8,
								delay: 0.2,
							}}
							className="absolute z-20 w-[40%] md:w-[45%] right-[10%] md:right-[4%] bottom-[-15%] md:bottom-[-16%]"
						>
							<ParallaxElement speed={1.5}>
								<Image
									src="/images/landings/iphone.png"
									alt="Phone mockup"
									width={300}
									height={600}
									className="w-full h-auto object-contain"
								/>
							</ParallaxElement>
						</motion.div>
					</div>

					{/* RIGHT */}
					<ParallaxElement speed={1}>
						<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
							<ul className="flex flex-col gap-2 mb-10">
								{dict.list.map((item, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: 50 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										className="flex items-center gap-4 text-white text-lg md:text-2xl font-bold uppercase"
									>
										<span className="shrink-0 w-3 h-3 bg-primary rounded-full" />
										{item}
									</motion.li>
								))}
							</ul>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: dict.list.length * 0.2 }}
							>
								<Button href="/register" lang={lang} size="lg">
									{dict.cta}
								</Button>
							</motion.div>
						</div>
					</ParallaxElement>
				</div>
			</Container>
		</Section>
	);
}
