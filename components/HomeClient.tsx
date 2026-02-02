"use client";

import { Fragment } from "react/jsx-runtime";
import { Advantages } from "./sections/Advantages";
import { Contacts } from "./sections/Contacts";
import { FAQ } from "./sections/FAQ";
import { Hero } from "./sections/Hero";
import { Landings } from "./sections/Landings";
import { Providers } from "./sections/Providers";
import { Retention } from "./sections/Retention";
import { Header } from "./ui/Header";
import type { Dict, Locale } from "@/app/i18n/get-dictionary";
import { useState } from "react";
import { RegistrationModal } from "./ui/RegistrationModal";

interface HomeClientProps {
	dict: Dict;
	lang: Locale;
}

export default function HomeClient({ dict, lang }: HomeClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (e?: React.MouseEvent) => {
		if (e) e.preventDefault();
		setIsModalOpen(true);
	};
	return (
		<Fragment>
			<Header lang={lang} dict={dict.header} />
			<Hero dict={dict.hero} lang={lang} />
			<Advantages dict={dict.advantages} />
			<Providers dict={dict.providers} />
			<Landings dict={dict.landings} lang={lang} />
			<Retention dict={dict.retention} lang={lang} />
			<FAQ dict={dict.faq} lang={lang} />
			<Contacts
				dict={{ contacts: dict.contacts, footer: dict.footer }}
				lang={lang}
				onRegisterClick={openModal}
			/>

			<RegistrationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				dict={dict.modal}
			/>
		</Fragment>
	);
}
