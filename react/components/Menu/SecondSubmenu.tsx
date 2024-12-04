import clsx from "clsx";
import React from "react";
import { MenuItemI } from ".";
import styles from "./styles.module.css";

interface SecondSubmenuProps {
	items: MenuItemI["subitems"];
	imageUrl?: string;
}

export function SecondSubmenu({
	items,
	imageUrl
}: SecondSubmenuProps) {
	return (
		<div className={styles["second-submenu-wrapper"]}>
			<ul
				className={clsx({
					[styles["second-submenu"]]: true,
				})}
			>
				{items.map((item) => {
					return (
						<>
							<li className={styles["second-submenu__item"]}>
								<a className={styles["second-submenu__link"]} href={item.href}>
									{item.name}
								</a>
								<ul className={styles["second-submenu__list"]}>
									{item.subitems.map((subitem: any) => {
										return (
											<li>
												<a
													className={styles["second-submenu__list__link"]}
													href={subitem.href}
												>
													{subitem.name}
												</a>
											</li>
										);
									})}
								</ul>
							</li>
						</>
					);
				})}
				<img
					className={`${styles["second-submenu__image"]}`}
					src={imageUrl}
					alt=""
				/>
			</ul>

		</div>
	);
}
