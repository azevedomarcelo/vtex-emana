import React from "react"
import { FirstSubmenu } from "./FirstSubmenu"
import styles from './styles.module.css'
import clsx from "clsx"
import { data } from './data'

export interface MenuItemI {
    id: string
    name: string,
    href: string,
    subitems:  {
        name: string,
        href: string,
        subitems: MenuItemI['subitems']
    }[]
}

export function Menu() {

    return (
        <nav 
            style={{display: 'none'}}
            className={clsx({
                [styles['menu']]: true
            })}
        >
            <ul className={styles['menu__list']}>
                {data.map(item => {
                    return (
                        <li
                            className={styles['menu__item']}
                        >
                            <a 
                                className={styles['menu__link']}
                                href={item.href} 
                            >
                                {item.name}
                                {item.subitems.length ?
                                    <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 1L4.35858 3.85858C4.43668 3.93668 4.56332 3.93668 4.64142 3.85858L7.5 1" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                    : null
                                }
                            </a>
                            {item.subitems.length ?
                                <FirstSubmenu items={item.subitems} />
                                : null
                            }
                        </li>
                    )       
                })}
            </ul>
        </nav>
    )
}
