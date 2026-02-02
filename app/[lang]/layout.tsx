import "../globals.css";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";
import { getDictionary, type Locale } from "../i18n/get-dictionary";
import { Header } from "@/components/ui/Header";
import { PageWrapper } from "@/components/ui/PageWrapper";

const rubik = Rubik({
	subsets: ["latin", "cyrillic"],
	variable: "--font-rubik",
	weight: ["400", "500", "700"],
	display: "swap",
});

const conthrax = localFont({
	src: "../../public/fonts/Conthrax.otf",
	variable: "--font-conthrax",
	display: "swap",
});

export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "ru" }];
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;

	const dict = await getDictionary(lang); // Загружаем словарь

	return (
		<html lang={lang} className="scroll-smooth">
			<body
				className={`${rubik.variable} ${conthrax.variable} bg-background text-white antialiased`}
			>
				<PageWrapper>{children}</PageWrapper>
			</body>
		</html>
	);
}
