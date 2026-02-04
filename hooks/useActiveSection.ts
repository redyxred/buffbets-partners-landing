"use client";

import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "@/components/ui/ScrollContext";

const SECTION_IDS = [
	"hero",
	"advantages",
	"landings",
	"retention",
	"providers",
	"faq",
	"contacts",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId | null {
	const [activeSection, setActiveSection] = useState<SectionId | null>(null);
	const containerRef = useContext(ScrollContext);

	useEffect(() => {
		const container = containerRef?.current;
		if (!container) return;

		const handleScroll = () => {
			const containerRect = container.getBoundingClientRect();
			const containerTop = containerRect.top;
			const containerHeight = containerRect.height;
			// Точка определения активной секции - 30% от верха viewport
			const activationPoint = containerTop + containerHeight * 0.3;

			let currentSection: SectionId | null = null;
			let minDistance = Infinity;

			for (const id of SECTION_IDS) {
				const element = document.getElementById(id);
				if (!element) continue;

				const rect = element.getBoundingClientRect();
				const sectionTop = rect.top;
				const sectionBottom = rect.bottom;

				// Секция считается активной, если точка активации находится внутри неё
				if (sectionTop <= activationPoint && sectionBottom > activationPoint) {
					currentSection = id;
					break;
				}

				// Если точка активации не попала ни в одну секцию,
				// выбираем ближайшую секцию сверху
				const distance = activationPoint - sectionTop;
				if (distance > 0 && distance < minDistance) {
					minDistance = distance;
					currentSection = id;
				}
			}

			setActiveSection(currentSection);
		};

		// Вызываем сразу для установки начального состояния
		handleScroll();

		container.addEventListener("scroll", handleScroll, { passive: true });
		return () => container.removeEventListener("scroll", handleScroll);
	}, [containerRef]);

	return activeSection;
}
