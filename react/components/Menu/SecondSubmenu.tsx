import clsx from "clsx";
import React from "react";
import { MenuItemI } from ".";
import styles from './styles.module.css'

interface SecondSubmenuProps {
    items: MenuItemI['subitems']  
}

export function SecondSubmenu({items}: SecondSubmenuProps) {
    return (
        <div className={styles['second-submenu-wrapper']}>
            {/* <img className={styles['second-submenu__image']} src="https://place-hold.it/300x500" alt="" /> */}

            <ul className={clsx({
                [styles['second-submenu']]: true
            })}>
                
                {items.map((item: any) => {
                    return (
                        <li className={styles['second-submenu__item']}>
                            <a 
                                className={styles['second-submenu__link']}
                                href={item.href}
                                >
                                {item.name}
                            </a>
                            <ul className={styles['second-submenu__list']}> 
                                {item.subitems.map((subitem: any) => {
                                    return (
                                        <li>
                                            <a className={styles['second-submenu__list__link']} href={subitem.href}>{subitem.name}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}