"use client";

import type { Dict, Locale } from "@/app/i18n/get-dictionary";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { AccordionItem } from "../ui/AccordionItem";
import { ParallaxElement } from "../ui/ParallaxElement";
import { SectionTitle } from "../ui/SectionTitle";

interface FAQProps {
	dict: Dict["faq"];
	lang: Locale;
}

type TabKey = "general" | "income";

function TabButton({
	onClick,
	children,
	isActive,
}: {
	children: ReactNode;
	isActive: boolean;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-bold uppercase rounded-full transition-colors relative z-10 ${
				isActive ? "text-black" : "text-gray-400 hover:text-white"
			}`}
		>
			{children}
		</button>
	);
}

export function FAQ({ dict, lang }: FAQProps) {
	const [activeTab, setActiveTab] = useState<TabKey>("general");
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const handleTabChange = (tab: TabKey) => {
		setActiveTab(tab);
		setOpenIndex(null);
	};

	return (
		<Section id="faq">
			<Container className="max-w-5xl">
				<ParallaxElement speed={1} type="fly-up">
					<SectionTitle title={dict.title} />
				</ParallaxElement>

				<ParallaxElement speed={2}>
					<div className="w-full flex flex-col items-center">
						<div className="w-full bg-background-lighter p-1 rounded-full flex mb-6 sm:mb-8 md:mb-12 relative">
							<TabButton
								onClick={() => handleTabChange("general")}
								isActive={activeTab === "general"}
							>
								{dict.tabs.general}
							</TabButton>

							<TabButton
								onClick={() => handleTabChange("income")}
								isActive={activeTab === "income"}
							>
								{dict.tabs.income}
							</TabButton>

							<motion.div
								className="absolute top-1 bottom-1 bg-primary rounded-full z-0"
								animate={{
									left: activeTab === "general" ? "4px" : "50%",
									width: "calc(50% - 4px)",
								}}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
							/>
						</div>

						<div className="w-full">
							{dict.items[activeTab].map(
								(item: { q: string; a: string }, index: number) => (
									<motion.div
										key={`${activeTab}-${index}`}
										initial={{ opacity: 0, y: 30, scale: 0.95 }}
										whileInView={{ opacity: 1, y: 0, scale: 1 }}
										viewport={{ margin: "-50px" }}
										transition={{
											duration: 0.5,
											delay: index * 0.1,
											ease: [0.25, 0.1, 0.25, 1],
										}}
									>
										<AccordionItem
											question={item.q}
											answer={item.a}
											isOpen={openIndex === index}
											onToggle={() => handleToggle(index)}
										/>
									</motion.div>
								),
							)}

							{dict.items[activeTab].length === 0 && (
								<div className="text-center text-gray-500 py-10">
									В этом разделе пока нет вопросов.
								</div>
							)}
						</div>
					</div>
				</ParallaxElement>
			</Container>
		</Section>
	);
}
