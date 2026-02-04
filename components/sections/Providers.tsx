"use client";

import { Dict } from "@/app/i18n/get-dictionary";
import { Container } from "../ui/Container";
import { ProviderCard } from "../ui/ProviderCard";
import { Section } from "../ui/Section";
import { motion } from "framer-motion";
import { ParallaxElement } from "../ui/ParallaxElement";
import { SectionTitle } from "../ui/SectionTitle";

interface ProvidersProps {
	dict: Dict["providers"];
}

const leftProviders = [
	{
		name: "Pragmatic Play",
		logo: "/images/providers/pragmatic-play.svg",
	},
	{
		name: "BGaming",
		logo: "/images/providers/bgaming.svg",
	},
	{
		name: "NetEnt",
		logo: "/images/providers/netent.png",
	},
];

const rightProviders = [
	{
		name: "Spinomenal",
		logo: "/images/providers/spinomenal.png",
	},
	{
		name: "Playtech",
		logo: "/images/providers/playtech.svg",
	},
	{
		name: "Booming Games",
		logo: "/images/providers/booming-games.svg",
	},
];

export function Providers({ dict }: ProvidersProps) {
	return (
		<Section
			id="providers"
			bgImage="/images/providers/providers-background.png"
			bgClassName="absolute inset-0 w-full h-full z-0 top-10 md:top-0 scale-80"
			className="h-auto min-h-0 overflow-hidden"
			topGradient
			bottomGradient
		>
			<Container className="relative z-10">
				<ParallaxElement speed={1} type="fly-up">
					<SectionTitle
						title={dict.title}
						className="mb-12 sm:mb-16 md:mb-28"
					/>
				</ParallaxElement>

				<ParallaxElement speed={1.5} className="w-full">
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-center mb-12 sm:mb-16 md:mb-24">
						{/* LEFT */}
						<div className="flex flex-col gap-4 sm:gap-6 lg:gap-10 items-center sm:items-end">
							{leftProviders.map((p, i) => (
								<motion.div
									key={p.name}
									initial={{ opacity: 0, x: -50 }}
									whileInView={{
										opacity: 1,
										x: 0,
									}}
									transition={{
										delay: i * 0.2,
									}}
									className={`w-full flex justify-center sm:justify-end ${i === 1 ? "lg:mr-26" : ""}`}
								>
									<ProviderCard logo={p.logo} name={p.name} />
								</motion.div>
							))}
						</div>

						{/* CENTER */}
						<div className="hidden lg:block h-75 w-full" />

						{/* RIGHT */}
						<div className="flex flex-col gap-4 sm:gap-6 lg:gap-12 items-center sm:items-start">
							{rightProviders.map((p, i) => (
								<motion.div
									key={p.name}
									initial={{ opacity: 0, x: 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.1 }}
									className={`w-full flex justify-center sm:justify-start ${i === 1 ? "lg:ml-26" : ""}`}
								>
									<ProviderCard name={p.name} logo={p.logo} position="right" />
								</motion.div>
							))}
						</div>
					</div>
				</ParallaxElement>
			</Container>
		</Section>
	);
}
