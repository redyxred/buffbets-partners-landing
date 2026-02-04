"use client";
import Image from "next/image";

interface ProviderCardProps {
	name: string;
	logo?: string;
	className?: string;
	position?: "left" | "right";
}

export function ProviderCard({
	logo,
	name,
	className = "",
	position = "left",
}: ProviderCardProps) {
	const topLinesClasses =
		position === "left"
			? "absolute -top-px left-[45%] right-[15%] h-px"
			: "absolute -top-px left-[15%] right-[45%] h-px";
	const bottomLinesClasses =
		position === "left"
			? "absolute -bottom-px left-[15%] right-[45%] h-px"
			: "absolute -bottom-px left-[45%] right-[15%] h-px";

	return (
		<div
			className={`relative group w-full max-w-64 sm:max-w-72 md:max-w-80 h-18 sm:h-20 md:h-24 rounded-xl ${className}`}
		>
			<div className="absolute bg-white/5 inset-0 border border-white/6 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] p-1 sm:p-1.5">
				<div className="relative h-full bg-[#040115]/70 border bg-linear-to-b from-accent-purple/2 via-accent-purple/1 to-accent-purple/0 border-white/7 rounded-lg sm:rounded-xl z-10 px-3 sm:px-4">
					<div
						className={
							topLinesClasses +
							" bg-linear-to-r from-transparent via-white/20 to-transparent z-20"
						}
					/>
					<div
						className={
							bottomLinesClasses +
							" bg-linear-to-r from-transparent via-white/20 to-transparent z-20"
						}
					/>

					<div className="w-full h-full flex items-center justify-center">
						{logo ? (
							<Image
								src={logo}
								alt={name}
								width={140}
								height={50}
								className="object-contain h-full max-h-8 sm:max-h-10 md:max-h-full opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
							/>
						) : (
							<span className="font-bold text-white text-sm sm:text-base md:text-lg uppercase tracking-wider font-montserrat">
								{name}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
