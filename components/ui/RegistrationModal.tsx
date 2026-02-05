"use client";

import { Dict } from "@/app/i18n/get-dictionary";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { Button } from "./Button";

interface RegistrationModalProps {
	isOpen: boolean;
	onClose: () => void;
	dict: Dict["modal"];
}

function InputField({
	label,
	placeholder,
	name,
	type = "text",
}: {
	label: string;
	placeholder: string;
	name: string;
	type?: string;
}) {
	return (
		<div className="flex flex-col gap-2">
			<label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">
				{label}
			</label>
			<input
				required
				type={type}
				name={name}
				placeholder={placeholder}
				className="w-full bg-[#1A1626] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/70 transition-all"
			/>
		</div>
	);
}

const FTD_MARKS = [0, 50, 100, 200, 500, 1000];

function RangeSlider({
	label,
	name,
	marks = FTD_MARKS,
}: {
	label: string;
	name: string;
	marks?: number[];
}) {
	const [value, setValue] = useState(2); // индекс в массиве marks (100 по умолчанию)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(Number(e.target.value));
	};

	const percentage = (value / (marks.length - 1)) * 100;
	// Thumb width = 20px, нужно компенсировать смещение браузера
	const thumbHalfWidth = 10;
	const thumbOffset =
		thumbHalfWidth - (percentage / 100) * (thumbHalfWidth * 2);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex justify-between items-center">
				<label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">
					{label}
				</label>
				<span className="text-primary font-bold text-lg">
					{marks[value]}+ FTD
				</span>
			</div>

			<div className="relative h-5 flex items-center">
				<input
					type="range"
					name={name}
					min={0}
					max={marks.length - 1}
					step={1}
					value={value}
					onChange={handleChange}
					className="absolute inset-0 w-full h-full bg-transparent appearance-none cursor-pointer z-10
						[&::-webkit-slider-thumb]:appearance-none
						[&::-webkit-slider-thumb]:w-5
						[&::-webkit-slider-thumb]:h-5
						[&::-webkit-slider-thumb]:rounded-full
						[&::-webkit-slider-thumb]:bg-primary
						[&::-webkit-slider-thumb]:border-2
						[&::-webkit-slider-thumb]:border-white
						[&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(250,207,0,0.5)]
						[&::-webkit-slider-thumb]:cursor-pointer
						[&::-webkit-slider-thumb]:transition-transform
						[&::-webkit-slider-thumb]:hover:scale-110
						[&::-moz-range-thumb]:w-5
						[&::-moz-range-thumb]:h-5
						[&::-moz-range-thumb]:rounded-full
						[&::-moz-range-thumb]:bg-primary
						[&::-moz-range-thumb]:border-2
						[&::-moz-range-thumb]:border-white
						[&::-moz-range-thumb]:cursor-pointer
					"
				/>
				{/* Track background */}
				<div className="absolute left-0 right-0 h-2 rounded-full bg-[#1A1626] border border-white/5 pointer-events-none" />
				{/* Active track */}
				<div
					className="absolute left-0 h-2 rounded-full bg-gradient-to-r from-primary/80 to-primary pointer-events-none"
					style={{
						width: `calc(${percentage}% + ${thumbOffset}px)`,
					}}
				/>
			</div>

			{/* Marks */}
			<div className="flex justify-between mt-1">
				{marks.map((mark, index) => (
					<button
						key={mark}
						type="button"
						onClick={() => setValue(index)}
						className={`text-xs transition-colors cursor-pointer w-5 flex justify-center ${
							index <= value ? "text-primary" : "text-gray-500"
						} hover:text-primary`}
					>
						{mark}
					</button>
				))}
			</div>

			{/* Hidden input for form submission */}
			<input type="hidden" name={`${name}_value`} value={marks[value]} />
		</div>
	);
}

export function RegistrationModal({
	isOpen,
	onClose,
	dict,
}: RegistrationModalProps) {
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";

			setTimeout(() => setIsSubmitted(false), 500);
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		setIsSubmitted(true);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<Fragment>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-background/80 backdrop-blur-sm z-100"
					/>

					{/* Modal content */}
					<div className="fixed inset-0 flex items-center justify-center z-101 p-4 pointer-events-none">
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							className="w-full border border-white/10 bg-linear-to-b from-white/4 to-white/0 bg-white/4 max-w-2xl rounded-2xl overflow-hidden relative pointer-events-auto"
						>
							{!isSubmitted && (
								<button
									onClick={onClose}
									className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
								>
									<svg
										width="30"
										height="30"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
											fill="currentColor"
										/>
									</svg>
								</button>
							)}

							<div className="p-8 md:p-10">
								{!isSubmitted ? (
									<form onSubmit={handleSubmit} className="flex flex-col gap-5">
										<div className="text-center mb-6">
											<h2 className="text-3xl md:text-4xl font-bold text-white uppercase font-conthrax mb-2">
												{dict.title}
											</h2>
											<p className="text-gray-400 text-sm">{dict.desc}</p>
										</div>

										<InputField
											label={dict.fields.company}
											placeholder={dict.placeholders.company}
											name="company"
										/>

										<div className="grid grid-cols-2 gap-4">
											<InputField
												label={dict.fields.name}
												placeholder={dict.placeholders.name}
												name="name"
											/>
											<InputField
												label={dict.fields.telegram}
												placeholder={dict.placeholders.telegram}
												name="telegram"
											/>
										</div>

										<InputField
											label={dict.fields.traffic_source}
											placeholder={dict.placeholders.traffic_source}
											name="traffic"
										/>

										<RangeSlider label={dict.fields.ftd_volume} name="ftd" />

										<Button type="submit" className="mt-4 w-full">
											{dict.submit}
										</Button>
									</form>
								) : (
									<div className="flex flex-col items-center text-center py-10">
										<div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
											<svg
												className="w-8 h-8"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={3}
													d="M5 13l4 4L19 7"
												/>
											</svg>
										</div>
										<h3 className="text-2xl font-bold text-white uppercase mb-2">
											{dict.success_title}
										</h3>
										<p className="text-gray-400 mb-8">{dict.success_desc}</p>
										<Button onClick={onClose} size="md" variant="outline">
											{dict.close}
										</Button>
									</div>
								)}
							</div>
						</motion.div>
					</div>
				</Fragment>
			)}
		</AnimatePresence>
	);
}
