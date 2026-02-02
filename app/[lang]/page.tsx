import { Metadata } from "next";
import { getDictionary, type Locale } from "../i18n/get-dictionary";

import HomeClient from "@/components/HomeClient";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "BUFFBETS PARTNERS",

		// openGraph: {
		// 	title: dict.meta.title,
		// 	description: dict.meta.description,
		// 	url: `https://buffbets.partners/${lang}`,
		// 	siteName: "BuffBets Partners",
		// 	images: [
		// 		{
		// 			url: "/images/og-image.jpg",
		// 			width: 1200,
		// 			height: 630,
		// 		},
		// 	],
		// 	locale: lang,
		// 	type: "website",
		// },
		icons: {
			icon: "/favicon.ico",
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return <HomeClient dict={dict} lang={lang} />;
}
