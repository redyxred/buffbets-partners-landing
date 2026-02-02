"use client";

import { ReactNode, useRef } from "react";
import { ScrollContext } from "./ScrollContext";

export function PageWrapper({ children }: { children: ReactNode }) {
	const containerRef = useRef<HTMLElement>(null);

	return (
		<ScrollContext.Provider value={containerRef}>
			<main
				ref={containerRef}
				className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth"
			>
				{children}
			</main>
		</ScrollContext.Provider>
	);
}
