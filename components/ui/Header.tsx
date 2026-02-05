"use client";

import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";

import { Container } from "./Container";
import type { Dict, Locale } from "@/app/i18n/get-dictionary";
import { Button } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ScrollContext } from "./ScrollContext";
import { useActiveSection, type SectionId } from "@/hooks/useActiveSection";
import { LOGIN_URL } from "@/app/constants";

interface HeaderProps {
	lang: Locale;
	dict: Dict["header"];
	onRegisterClick: () => void;
}

interface NavLink {
	id: SectionId;
	label: string;
}

export function Header({ dict, lang, onRegisterClick }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const containerRef = useContext(ScrollContext);
	const activeSection = useActiveSection();

	const navLinks: NavLink[] = [
		{ id: "advantages", label: dict.nav.advantages },
		{ id: "providers", label: dict.nav.providers },
		{ id: "faq", label: dict.nav.faq },
		{ id: "contacts", label: dict.nav.contacts },
	];

	useEffect(() => {
		const container = containerRef?.current;
		if (!container) return;

		const handleScroll = () => {
			if (container.scrollTop > 100) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		handleScroll();

		container.addEventListener("scroll", handleScroll);
		return () => container.removeEventListener("scroll", handleScroll);
	}, [containerRef]);

	// Обновляем URL при изменении активной секции
	useEffect(() => {
		if (!activeSection) return;

		const newUrl =
			activeSection === "hero" ? `/${lang}` : `/${lang}#${activeSection}`;

		// Используем replaceState чтобы не засорять историю
		if (window.location.pathname + window.location.hash !== newUrl) {
			window.history.replaceState(null, "", newUrl);
		}
	}, [activeSection, lang]);

	// Плавный скролл к секции
	const scrollToSection = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
			e.preventDefault();

			const container = containerRef?.current;
			const section = document.getElementById(sectionId);

			if (!container || !section) return;

			// Вычисляем позицию секции относительно контейнера
			const containerRect = container.getBoundingClientRect();
			const sectionRect = section.getBoundingClientRect();
			const offsetTop =
				sectionRect.top - containerRect.top + container.scrollTop;

			container.scrollTo({
				top: offsetTop,
				behavior: "smooth",
			});

			// Обновляем URL без перезагрузки
			window.history.pushState(null, "", `/${lang}#${sectionId}`);

			// Закрываем мобильное меню после клика
			setIsMobileMenuOpen(false);
		},
		[containerRef, lang],
	);

	// Закрываем меню при изменении размера экрана
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Блокируем скролл при открытом мобильном меню
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	return (
		<>
			<header
				className={`
					fixed top-0 left-0 right-0 w-full z-50 py-2 transition-all duration-300
					${
						isScrolled
							? "bg-text-inverse/50 backdrop-blur-md border-b border-white/10"
							: "bg-transparent border-b border-transparent"
					}
			`}
			>
				<Container
					as="nav"
					className={`
						flex justify-between items-center transition-all
						${isScrolled ? "h-16 lg:h-20" : "h-16 sm:h-20 lg:h-24"}	
					`}
				>
					<div className="flex gap-x-8 xl:gap-x-12">
						<Link
							href={`/${lang}`}
							className="shrink-0 relative block transition-transform hover:scale-105"
						>
							<Image
								src="/images/logo.svg"
								alt="BUFFBETS Logo"
								width={195}
								height={79}
								priority
								className="h-10 sm:h-12 lg:h-16 w-auto object-contain"
							/>
						</Link>

						<nav className="hidden lg:flex items-center gap-6 xl:gap-10">
							{navLinks.map((link) => {
								const isActive = activeSection === link.id;
								return (
									<Link
										key={link.id}
										href={`/${lang}#${link.id}`}
										onClick={(e) => scrollToSection(e, link.id)}
										className={`
											text-sm xl:text-base font-medium uppercase transition-all duration-300 whitespace-nowrap
											${
												isActive
													? "text-primary scale-105"
													: "text-gray-300 hover:text-accent-purple hover:scale-105"
											}
										`}
									>
										{link.label}
									</Link>
								);
							})}
						</nav>
					</div>

					{/* Desktop buttons */}
					<div className="hidden lg:flex items-center gap-4 xl:gap-6">
						<Button size="sm" onClick={onRegisterClick}>
							{dict.register}
						</Button>
						<Button
							variant="outline"
							size="sm"
							href={LOGIN_URL}
							target="_blank"
						>
							{dict.login}
						</Button>
						<LanguageSwitcher
							currentLang={lang}
							availableLangs={["en", "ru"]}
						/>
					</div>

					{/* Mobile controls */}
					<div className="flex lg:hidden items-center gap-3">
						<LanguageSwitcher
							currentLang={lang}
							availableLangs={["en", "ru"]}
						/>

						{/* Burger button */}
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/10"
							aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={isMobileMenuOpen}
						>
							<span
								className={`w-6 h-0.5 bg-white transition-all duration-300 ${
									isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
								}`}
							/>
							<span
								className={`w-6 h-0.5 bg-white transition-all duration-300 ${
									isMobileMenuOpen ? "opacity-0" : ""
								}`}
							/>
							<span
								className={`w-6 h-0.5 bg-white transition-all duration-300 ${
									isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
								}`}
							/>
						</button>
					</div>
				</Container>
			</header>

			{/* Mobile menu overlay */}
			<div
				className={`
					fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden
					${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
				`}
				style={{ top: isScrolled ? "80px" : "80px" }}
			>
				<Container className="h-full flex flex-col pt-8 pb-6">
					{/* Mobile navigation */}
					<nav className="flex flex-col gap-2">
						{navLinks.map((link) => {
							const isActive = activeSection === link.id;
							return (
								<Link
									key={link.id}
									href={`/${lang}#${link.id}`}
									onClick={(e) => scrollToSection(e, link.id)}
									className={`
										text-xl font-medium uppercase py-4 px-4 rounded-xl transition-all duration-300
										${
											isActive
												? "text-primary bg-white/5"
												: "text-gray-300 hover:text-accent-purple hover:bg-white/5"
										}
									`}
								>
									{link.label}
								</Link>
							);
						})}
					</nav>

					{/* Mobile buttons */}
					<div className="mt-auto flex flex-col gap-3">
						<Button size="md" onClick={onRegisterClick} className="w-full">
							{dict.register}
						</Button>
						<Button
							variant="outline"
							size="md"
							href={LOGIN_URL}
							target="_blank"
							className="w-full"
						>
							{dict.login}
						</Button>
					</div>
				</Container>
			</div>
		</>
	);
}
