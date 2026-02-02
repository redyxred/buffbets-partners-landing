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
			className="relative z-10"
		>
			<div className="absolute bottom-0 left-0 w-full h-75 bg-linear-to-t from-text-inverse via-text-inverse/80 to-transparent z-0 pointer-events-none" />

			<Container>
				<ParallaxElement speed={2} type="fly-up">
					<SectionTitle title={dict.title} className="mb-26" />
				</ParallaxElement>

				<ParallaxElement speed={1.5}>
					<div className="w-full flex flex-wrap justify-center gap-x-4 lg:gap-x-6 mb-18">
						{dict.items.map((item, index) => {
							const isEndOfRowMD = (index + 1) % 2 === 0;
							const isEndOfRowLG = index === 3 || index === 6;
							const isTopRowLG = index < 4;

							let lineClasses =
								"absolute w-[1px] right-[-8px] lg:right-[-12px] hidden ";

							if (!isEndOfRowMD) {
								lineClasses +=
									"md:block md:top-[10%] md:bottom-[10%] md:bg-gradient-to-b md:from-transparent md:via-white/20 md:to-transparent ";
							} else {
								lineClasses += "md:hidden ";
							}

							if (isEndOfRowLG) {
								lineClasses += "lg:hidden ";
							} else {
								lineClasses += "lg:block ";

								if (isTopRowLG) {
									lineClasses +=
										"lg:top-[10%] lg:bottom-0 lg:bg-gradient-to-b lg:from-transparent lg:to-white/20 ";
								} else {
									lineClasses +=
										"lg:top-0 lg:bottom-[10%] lg:bg-gradient-to-b lg:from-white/20 lg:to-transparent ";
								}
							}

							return (
								<Fragment key={index}>
									<div className="relative w-full md:w-[46%] lg:w-[23%] flex justify-center py-8">
										<FeatureCard
											index={index}
											icon={icons[index]}
											title={item.title}
											description={item.desc}
										/>

										<div className={lineClasses} />
									</div>

									{index === 3 && (
										<div className="hidden lg:flex w-full h-auto items-center justify-center relative z-0">
											{/* Горизонтальная линия ровно посередине высоты h-12 */}
											<div className="w-full h-0.5 bg-linear-to-r from-transparent via-white/20 to-transparent" />
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
