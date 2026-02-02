"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureCardProps {
	icon: string;
	title: string;
	description: string;
	index: number;
}

export function FeatureCard({
	icon,
	title,
	description,
	index,
}: FeatureCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			className="flex flex-col items-center text-center max-w-90"
		>
			<div className="relative mb-6 shrink-0 w-16 h-16 flex items-center">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent-purple/30 blur-2xl rounded-full" />
				<Image
					src={icon}
					alt={title}
					width={64}
					height={64}
					className="relative z-10 w-full h-full object-contain"
				/>
			</div>
			<div className="w-full h-18 flex items-start justify-center mb-2">
				<h3 className="text-xl font-bold text-white leading-tight font-conthrax">
					{title}
				</h3>
			</div>
			<p className="text-base text-gray-400 leading-[1.2] font-rubik">
				{description}
			</p>
		</motion.div>
	);
}
