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
}

export function Section({
	children,
	id,
	className = "",
	bgImage,
	bgClassName,
	parallaxRange = ["-10%", "10%"],
	overlayOpacity = 0,
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
                relative w-full h-screen min-h-200 flex items-center
                snap-start snap-always overflow-hidden
                ${className}
            `}
		>
			{bgImage && (
				<motion.div
					style={{ y }}
					className={`absolute inset-0 -z-20 ${finalBgClass}`}
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

			<div className="relative z-10 w-full h-full flex items-center justify-center pt-(--header-height)">
				{children}
			</div>
		</section>
	);
}
