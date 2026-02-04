import { Dict } from "@/app/i18n/get-dictionary";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { FeatureCard } from "../ui/FeatureCard";
import { Fragment } from "react/jsx-runtime";
import { ParallaxElement } from "../ui/ParallaxElement";
import { SectionTitle } from "../ui/SectionTitle";

interface AdvantagesProps {
	dict: Dict["advantages"];
}

const icons = [
	"/images/icons/calendar.png",
	"/images/icons/globe.png",
	"/images/icons/gift.png",
	"/images/icons/chart.png",
	"/images/icons/slots.png",
	"/images/icons/stats.png",
	"/images/icons/card.png",
];

export function Advantages({ dict }: AdvantagesProps) {
	return (
		<Section
			id="advantages"
			bgImage="/images/advantages/advantages-background.png"
			bgClassName="top-[20%] h-[120%] w-full"
			className="relative z-10 flex items-center"
			bottomGradient
		>
			<Container>
				<ParallaxElement speed={2} type="fly-up">
					<SectionTitle
						title={dict.title}
						className="mb-10 sm:mb-16 md:mb-20 lg:mb-26"
					/>
				</ParallaxElement>

				<ParallaxElement speed={1.5}>
					<div className="w-full h-max flex flex-wrap justify-center sm:gap-x-4 lg:gap-x-6 mb-8 sm:mb-12 lg:mb-18">
						{dict.items.map((item, index) => {
							const isEndOfRowMD = (index + 1) % 2 === 0;
							const isLastItem = index === dict.items.length - 1;
							const isEndOfRowLG = index === 3 || index === 6;
							const isTopRowLG = index < 4;

							// MD линия (только для md, скрыта на lg)
							const showMDLine = !isEndOfRowMD && !isLastItem;

							// LG линия (только для lg)
							const showLGLine = !isEndOfRowLG;

							return (
								<Fragment key={index}>
									<div className="relative w-full xs:w-[80%] sm:w-[48%] md:w-[46%] lg:w-[23%] flex justify-center py-4 sm:py-6 lg:py-8">
										<FeatureCard
											index={index}
											icon={icons[index]}
											title={item.title}
											description={item.desc}
										/>

										{/* MD линия - сплошная, скрыта на lg */}
										{showMDLine && (
											<div className="absolute w-px -right-2 top-0 bottom-0 bg-white/20 hidden md:block lg:hidden" />
										)}

										{/* LG линия - с градиентом */}
										{showLGLine && (
											<div
												className={`absolute w-px -right-3 hidden lg:block ${
													isTopRowLG
														? "top-[10%] bottom-0 bg-linear-to-b from-transparent to-white/20"
														: "top-0 bottom-[10%] bg-linear-to-b from-white/20 to-transparent"
												}`}
											/>
										)}
									</div>

									{index === 3 && (
										<div className="hidden lg:flex w-full h-auto items-center justify-center relative z-0">
											{/* Горизонтальная линия ровно посередине высоты h-12 */}
											<div className="w-full h-0.5 bg-linear-to-r from-transparent via-white/20 to-transparent" />
										</div>
									)}

									{isEndOfRowMD && index < dict.items.length - 1 && (
										<div className="hidden md:flex lg:hidden w-full h-auto items-center justify-center relative z-0">
											<div className="w-[80%] h-0.5 bg-linear-to-r from-transparent via-white/20 to-transparent" />
										</div>
									)}
								</Fragment>
							);
						})}
					</div>
				</ParallaxElement>
			</Container>
		</Section>
	);
}
