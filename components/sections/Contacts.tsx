"use client";

import Image from "next/image";

import type { Dict, Locale } from "@/app/i18n/get-dictionary";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Footer } from "../ui/Footer";
import { SectionTitle } from "../ui/SectionTitle";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { use, useContext } from "react";
import { ScrollContext } from "../ui/ScrollContext";

interface ContactsProps {
	dict: {
		contacts: Dict["contacts"];
		footer: Dict["footer"];
	};
	lang: Locale;
	onRegisterClick: (e?: React.MouseEvent) => void;
}

export function Contacts({ dict, lang, onRegisterClick }: ContactsProps) {
	const scrollContext = useContext(ScrollContext);
	const scrollToTop = () => {
		if (scrollContext && scrollContext.current) {
			scrollContext.current.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}
	};

	return (
		<Section
			id="contacts"
			bgImage="/images/contacts/contacts-bg.png"
			bgClassName="-top-[50%] w-full"
		>
			<Container>
				<div className="grow flex flex-col justify-center relative z-10 mb-38">
					<SectionTitle title={dict.contacts.title} className="mb-28" />
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* LEFT */}
						<div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
							<div className="flex flex-col font-conthrax uppercase leading-tight">
								<motion.span
									initial={{ opacity: 0, x: -30 }}
									whileInView={{ opacity: 1, x: 0 }}
									className="text-white text-xl md:text-3xl"
								>
									{dict.contacts.subtitle_prefix}
								</motion.span>

								<motion.span
									initial={{ opacity: 0, x: -30 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 }}
									className="text-primary text-2xl md:text-4xl lg:text-5xl"
								>
									{dict.contacts.subtitle_highlight}
								</motion.span>

								<motion.span
									initial={{ opacity: 0, x: -30 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.2 }}
									className="text-white text-xl md:text-3xl"
								>
									{dict.contacts.subtitle_suffix}
								</motion.span>
							</div>

							<div className="flex flex-col gap-4 w-full max-w-md">
								{/* Email */}
								<motion.a
									href={`mailto:${dict.contacts.email_link}`}
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}
									className="flex items-center gap-4 group cursor-pointer"
								>
									<div className="w-6 h-6 text-primary">
										<svg
											width="33"
											height="26"
											viewBox="0 0 33 26"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M11.8228 14.9012L16.488 18.1652L20.985 14.9906L31.0654 25.1671C30.7994 25.2559 30.5181 25.3009 30.2213 25.302H2.74799C2.38533 25.302 2.03915 25.2295 1.721 25.0996L11.8228 14.9012ZM32.9693 6.53805V22.4901C32.9693 22.9068 32.8803 23.3015 32.7221 23.6574L22.8412 13.6817L32.9693 6.53805ZM0 6.62745L9.96004 13.5973L0.174737 23.4786C0.0601077 23.1622 0.000954449 22.8276 0 22.4901L0 6.62745ZM30.2213 0C31.7379 0 32.9693 1.25836 32.9693 2.8119V3.80037L16.4814 15.4309L0 3.89652V2.8119C0 1.26004 1.22976 0 2.74799 0H30.2213Z"
												fill="#FACF00"
											/>
										</svg>
									</div>
									<span className="text-white text-xl font-bold group-hover:text-primary transition-colors">
										{dict.contacts.email_label}
									</span>
								</motion.a>

								{/* Telegram */}
								<motion.a
									href={dict.contacts.telegram_link}
									target="_blank"
									rel="noopener noreferrer"
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className="flex items-center gap-4 group cursor-pointer"
								>
									<div className="w-6 h-6 text-primary">
										<svg
											width="32"
											height="32"
											viewBox="0 0 32 32"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M15.7179 0C7.04164 0 0 7.04164 0 15.7179C0 24.3942 7.04164 31.4359 15.7179 31.4359C24.3942 31.4359 31.4359 24.3942 31.4359 15.7179C31.4359 7.04164 24.3942 0 15.7179 0ZM23.0111 10.6882C22.7753 13.1716 21.7536 19.2073 21.2349 21.9894C21.0149 23.1682 20.5748 23.5612 20.1661 23.6083C19.2545 23.6869 18.5629 23.0111 17.6827 22.4295C16.2995 21.5179 15.5136 20.952 14.1776 20.0718C12.6215 19.0501 13.6275 18.4843 14.5234 17.5727C14.7591 17.3369 18.7829 13.6746 18.8615 13.3445C18.8724 13.2945 18.871 13.2426 18.8573 13.1933C18.8436 13.144 18.8181 13.0988 18.7829 13.0616C18.6886 12.983 18.5629 13.0145 18.4529 13.0302C18.3114 13.0616 16.1109 14.5234 11.8199 17.4155C11.1912 17.8399 10.6253 18.0599 10.1224 18.0442C9.55651 18.0285 8.48769 17.7298 7.68607 17.4626C6.69584 17.1483 5.92566 16.9754 5.98853 16.4252C6.01997 16.1423 6.41292 15.8594 7.15166 15.5608C11.7413 13.5646 14.7906 12.2443 16.3152 11.6156C20.6848 9.79228 21.5807 9.47792 22.178 9.47792C22.3038 9.47792 22.6024 9.50935 22.791 9.66653C22.9482 9.79228 22.9953 9.96517 23.0111 10.0909C22.9953 10.1852 23.0268 10.4681 23.0111 10.6882Z"
												fill="#FACF00"
											/>
										</svg>
									</div>
									<span className="text-white text-xl font-bold group-hover:text-primary transition-colors">
										{dict.contacts.telegram_label}
									</span>
								</motion.a>
							</div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className="pt-4"
							>
								<Button
									onClick={onRegisterClick}
									size="lg"
									className="bg-[#FFC700] text-black hover:bg-[#FFC700]/90 px-10 py-6 text-lg shadow-[0_0_30px_rgba(255,199,0,0.4)]"
								>
									{dict.contacts.cta}
								</Button>
							</motion.div>
						</div>

						<div className="relative w-full flex justify-center lg:justify-end h-75 md:h-100">
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								whileInView={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.8 }}
								className="relative w-full max-w-125"
							>
								<motion.div
									animate={{ y: [-15, 15, -15] }}
									transition={{
										duration: 4,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									className="w-full h-full"
								>
									<Image
										src="/images/contacts/3d-mail.png"
										alt="Contact Us 3D"
										width={600}
										height={600}
										className="w-full h-full object-contain drop-shadow-2xl"
									/>
								</motion.div>
							</motion.div>
						</div>
					</div>

					<motion.button
						onClick={scrollToTop}
						initial={{ scale: 0 }}
						whileInView={{ scale: 1 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="absolute right-0 bottom-0 md:-bottom-16 w-12 h-12 md:w-16 md:h-16 border-2 border-white bg-primary rounded-full flex items-center justify-center text-black z-20"
					>
						<svg
							width="42"
							height="42"
							viewBox="0 0 42 42"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 md:w-8 md:h-8"
						>
							<path
								d="M18.3765 14.2122L12.9585 19.6284C12.4663 20.1209 11.7987 20.3976 11.1024 20.3978C10.4062 20.3979 9.73835 20.1215 9.24591 19.6293C8.75347 19.1371 8.47673 18.4694 8.47656 17.7732C8.4764 17.0769 8.75283 16.4091 9.24503 15.9167L19.1448 6.01694C19.3886 5.773 19.678 5.5795 19.9966 5.44748C20.3152 5.31545 20.6567 5.2475 21.0015 5.2475C21.3464 5.2475 21.6879 5.31545 22.0065 5.44748C22.3251 5.5795 22.6145 5.773 22.8583 6.01694L32.758 15.9149C33.0019 16.1588 33.1953 16.4482 33.3272 16.7668C33.4592 17.0854 33.5271 17.4269 33.5271 17.7717C33.5271 18.1165 33.4592 18.458 33.3272 18.7766C33.1953 19.0951 33.0019 19.3846 32.758 19.6284C32.5142 19.8723 32.2247 20.0657 31.9062 20.1976C31.5876 20.3296 31.2461 20.3975 30.9013 20.3975C30.5565 20.3975 30.215 20.3296 29.8964 20.1976C29.5778 20.0657 29.2884 19.8723 29.0445 19.6284L23.6265 14.2122V34.3984C23.6265 35.0946 23.35 35.7623 22.8577 36.2546C22.3654 36.7469 21.6977 37.0234 21.0015 37.0234C20.3053 37.0234 19.6377 36.7469 19.1454 36.2546C18.6531 35.7623 18.3765 35.0946 18.3765 34.3984V14.2122Z"
								fill="black"
							/>
						</svg>
					</motion.button>
				</div>

				<Footer
					dict={dict.footer}
					lang={lang}
					className="absolute bottom-0 left-0 w-full"
				/>
			</Container>
		</Section>
	);
}
