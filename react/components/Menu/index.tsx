import clsx from "clsx";
import React from "react";
import { FirstSubmenu } from "./FirstSubmenu";
import { data } from "./data";
import styles from "./styles.module.css";

export interface MenuItemI {
	id: string;
	name: string;
	href: string;
	imageUrl?: string;
	subitems: {
		name: string;
		href: string;
		imageUrl?: string;
		subitems: MenuItemI["subitems"];
	}[];
}

export function Menu() {
	return (
		<nav
			style={{ display: "none" }}
			className={clsx({
				[styles["menu"]]: true,
			})}
		>
			<ul className={styles["menu__list"]}>
				{data.map((item) => {
					return (
						<li key={item.name} className={styles["menu__item"]}>
							<a className={styles["menu__link"]} href={item.href}>
								{item.name}
								{item.subitems.length ? (
									<svg
										width="9"
										height="5"
										viewBox="0 0 9 5"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1.5 1L4.35858 3.85858C4.43668 3.93668 4.56332 3.93668 4.64142 3.85858L7.5 1"
											stroke="black"
											strokeWidth="1.5"
											strokeLinecap="round"
										/>
									</svg>
								) : null}
							</a>
							{item.subitems.length ? (
								<FirstSubmenu items={item.subitems} imageUrl={item.imageUrl} />
							) : null}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

Menu.schema = {
	title: "Menu customizado",
	description: "Menu customizado",
};
