"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
	title: string;
	className?: string;
}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
	return (
		<motion.h2
			className={`font-conthrax font-semibold tracking-wide text-5xl uppercase mb-16 text-center ${className}`}
			initial={{ opacity: 0, scale: 0.9 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6 }}
		>
			{title}
		</motion.h2>
	);
}
