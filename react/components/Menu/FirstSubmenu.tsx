import clsx from "clsx";
import React from "react";
import { MenuItemI } from ".";
import { SecondSubmenu } from "./SecondSubmenu";
import styles from "./styles.module.css";

interface FirstSubmenuProps {
	items: MenuItemI["subitems"];
	imageUrl: string;
	imageUrlMobile: string;
}

export const FirstSubmenu = ({
	items,
	imageUrl,
	imageUrlMobile,
}: FirstSubmenuProps) => (
	<nav
		className={clsx({
			[styles["first-submenu"]]: true,
		})}
	>
		<ul className={styles["first-submenu__list"]}>
			{items.map((item: any) => {
				return (
					<li className={styles["first-submenu__item"]}>
						<a className={styles["first-submenu__link"]} href={item.href}>
							{item.name}
							<svg
								className={styles["first-submenu__link__icon"]}
								width="7"
								height="9"
								viewBox="0 0 7 9"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 8L5.29703 4.65787C5.39998 4.5778 5.39998 4.4222 5.29703 4.34213L1 0.999997"
									stroke="#5A5555"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
							</svg>
						</a>
						{item.subitems ? (
							<SecondSubmenu
								items={item.subitems}
								imageUrl={imageUrl}
								imageUrlMobile={imageUrlMobile}
							/>
						) : null}
					</li>
				);
			})}
		</ul>
	</nav>
);
