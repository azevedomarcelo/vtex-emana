import React from "react";
import { Link } from "vtex.render-runtime";
import { useRenderSession } from "vtex.session-client";

import { data } from "../Menu/data";
import style from "./styles.css";

export function MenuMobile() {
	const { session } = useRenderSession();
	const isAuthenticated = session?.namespaces?.profile?.isAuthenticated?.value;
	return (
		<div className="w-100 flex flex-column ph4 pv4">
			{data.map((menu) => (
				<div key={menu.name} className="pv4">
					{menu.subitems.length > 1 ? (
						<details className={style.details}>
							<summary className={style.summary}>
								<strong className="c-on-base" style={{ flex: "1" }}>
									{menu.name}
								</strong>
							</summary>
							<Link to={menu.href}>
								<small style={{ display: "block", padding: "1rem 1rem 0" }}>
									Ver tudo
								</small>
							</Link>
							{menu.subitems.map((subItem) => (
								<Link key={subItem.name} to={subItem.href} className={style.answer}>
									<p>{subItem.name}</p>
								</Link>
							))}
						</details>
					) : (
						<strong>
							<Link className="no-underline c-on-base" to={menu.href}>
								{menu.name}
							</Link>
						</strong>
					)}
				</div>
			))}

			<footer className="pt9 mt9">
				{isAuthenticated !== "false" ? (
					<Link to={"/account"}>
						<span>Olá, {session?.namespaces?.profile?.email?.value}</span>
					</Link>
				) : (
					<Link to={"/login"}>Fazer login</Link>
				)}
			</footer>
		</div>
	);
}
