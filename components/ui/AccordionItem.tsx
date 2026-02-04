"use client";

import { AnimatePresence, motion } from "framer-motion";

interface AccordionItemProps {
	question: string;
	answer: string;
	isOpen: boolean;
	onToggle: () => void;
}

export function AccordionItem({
	question,
	answer,
	isOpen,
	onToggle,
}: AccordionItemProps) {
	return (
		<div className="mb-3 sm:mb-4">
			<button
				onClick={onToggle}
				className={`
                    w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-full
                    transition-all duration-300 text-left
                    border border-transparent cursor-pointer
                    ${isOpen ? "bg-[#1A1A1A] border-white/5" : "bg-background-lighter hover:bg-[#120D26]"}
                `}
			>
				<span className="text-white font-medium text-base sm:text-lg md:text-xl pr-3 sm:pr-4 pl-1 sm:pl-2">
					{question}
				</span>

				<motion.div
					animate={{ rotate: isOpen ? 45 : 0 }}
					transition={{ duration: 0.3 }}
					className="shrink-0"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 28 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
					>
						<path
							d="M13.6729 25C13.4002 25 13.1822 24.9176 13.0186 24.7528C12.855 24.588 12.7732 24.3683 12.7732 24.0936V15.0712H3.89963C3.62701 15.0712 3.40892 14.9888 3.24535 14.824C3.08178 14.6592 3 14.4395 3 14.1648V13.588C3 13.3134 3.08178 13.0936 3.24535 12.9288C3.40892 12.764 3.62701 12.6816 3.89963 12.6816H12.7732V3.90637C12.7732 3.63171 12.855 3.41199 13.0186 3.24719C13.1822 3.0824 13.4002 3 13.6729 3H14.2862C14.5589 3 14.777 3.0824 14.9405 3.24719C15.1041 3.41199 15.1859 3.63171 15.1859 3.90637V12.6816H24.1004C24.373 12.6816 24.5911 12.764 24.7546 12.9288C24.9182 13.0936 25 13.3134 25 13.588V14.1648C25 14.4395 24.9182 14.6592 24.7546 14.824C24.5911 14.9888 24.373 15.0712 24.1004 15.0712H15.1859V24.0936C15.1859 24.3683 15.1041 24.588 14.9405 24.7528C14.777 24.9176 14.5589 25 14.2862 25H13.6729Z"
							fill="#FACF00"
						/>
					</svg>
				</motion.div>
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="px-4 sm:px-6 pt-2 pb-2 text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg">
							{answer}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
