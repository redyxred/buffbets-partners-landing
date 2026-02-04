"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ReactNode, useContext, useRef } from "react";
import { ScrollContext } from "./ScrollContext";

interface SectionProps {
	children: ReactNode;
	id?: string;
	className?: string;
	bgImage?: string;
	bgClassName?: string;
	parallaxRange?: [string, string];
	overlayOpacity?: number;
	topGradient?: boolean;
	bottomGradient?: boolean;
	gradientColor?: string;
	backgroundElements?: ReactNode;
}

export function Section({
	children,
	id,
	className = "",
	bgImage,
	bgClassName,
	parallaxRange = ["-10%", "10%"],
	overlayOpacity = 0,
	topGradient = false,
	bottomGradient = false,
	gradientColor = "from-background via-background/60",
	backgroundElements,
}: SectionProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const containerRef = useContext(ScrollContext);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		container: containerRef || undefined,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], parallaxRange);

	const defaultBgClass = "absolute -top-[15%] h-[130%] w-full";
	const finalBgClass = bgClassName || defaultBgClass;

	return (
		<section
			id={id}
			ref={sectionRef}
			className={`
                relative w-full min-h-svh flex items-center
                lg:snap-start lg:snap-always overflow-hidden
                ${className}
            `}
		>
			{bgImage && (
				<motion.div
					style={{ y }}
					className={`absolute inset-0 -z-10 ${finalBgClass}`}
				>
					<Image
						src={bgImage}
						alt="Section background"
						fill
						className="object-cover object-top"
						priority={id === "hero"}
					/>

					{overlayOpacity > 0 && (
						<div
							className="absolute inset-0 bg-black pointer-events-none"
							style={{ opacity: overlayOpacity }}
						/>
					)}
				</motion.div>
			)}

			{/* Декоративные элементы фона (под градиентами) */}
			{backgroundElements && (
				<div className="absolute inset-0 z-0 pointer-events-none">
					{backgroundElements}
				</div>
			)}

			{/* Верхний градиент для плавного перехода */}
			{topGradient && (
				<div
					className={`absolute top-0 left-0 w-full h-48 sm:h-60 lg:h-75 bg-linear-to-b ${gradientColor} to-transparent z-10 pointer-events-none`}
				/>
			)}

			{/* Нижний градиент для плавного перехода */}
			{bottomGradient && (
				<div
					className={`absolute bottom-0 left-0 w-full h-48 sm:h-60 lg:h-75 bg-linear-to-t ${gradientColor} to-transparent z-10 pointer-events-none`}
				/>
			)}

			<div className="relative z-20 w-full min-h-[calc(100svh-var(--header-height-scrolled))] mt-(--header-height-scrolled) flex items-center justify-center">
				{children}
			</div>
		</section>
	);
}
