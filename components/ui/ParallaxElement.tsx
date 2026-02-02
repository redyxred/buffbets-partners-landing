"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useContext, useRef } from "react";
import { ScrollContext } from "./ScrollContext";

interface ParallaxElementProps {
	children: ReactNode;
	speed?: number;
	className?: string;
	type?: "centered" | "fly-up" | "fly-down";
}

export function ParallaxElement({
	children,
	speed = 1,
	className = "",
	type = "centered",
}: ParallaxElementProps) {
	const ref = useRef<HTMLDivElement>(null);
	const containerRef = useContext(ScrollContext);

	// offset определяет когда начинается и заканчивается анимация
	// Для centered: элемент в начальной позиции (y=0) когда он полностью видим
	// "end start" = низ элемента у верха viewport (scrollYProgress = 0)
	// "start end" = верх элемента у низа viewport (scrollYProgress = 1)
	const { scrollYProgress } = useScroll({
		target: ref,
		container: containerRef || undefined,
		offset: ["end start", "start end"],
	});

	// При scrollYProgress = 0.5 элемент в центре viewport -> y = 0
	// Используем 3 точки: [0, 0.5, 1] -> [down, 0, up]
	const range = speed * 25;
	const y = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[`${range}px`, "0px", `${-range}px`],
	);

	return (
		<div
			ref={ref}
			className={`relative w-full flex justify-center items-center ${className}`}
		>
			<motion.div className="w-full h-full flex justify-center" style={{ y }}>
				{children}
			</motion.div>
		</div>
	);
}
