import React from "react";
import styles from "./OndeEncontrarComponent.css";

export function OndeEncontrarComponent() {
	return (
		<div className={styles.wrapperOndeEncontrar}>
			<div className={styles.iframeContainer}>
				<div className={styles.content}>
					<iframe
						title="Onde encontrar"
						src="https://munddi.com/EmanaNutri?e=1&logo=1"
						width="100%"
						height="690px"
						allow="geolocation *;"
						className={styles.iframeContent}
					/>
				</div>
			</div>

			<div className="flex items-center justify-between flex-column mv5 pv5">
				<h2 className={`f1 ${styles.titleProdutosEmana}`}>PRODUTOS EMANA</h2>
				<img
					src="/arquivos/img_rodrigo_hilbert_produtos_emana.png"
					alt="img_rodrigo_hilbert_produtos_emana"
				/>
			</div>
		</div>
	);
}
