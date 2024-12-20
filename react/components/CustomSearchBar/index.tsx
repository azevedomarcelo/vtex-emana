import React from "react";
import { SearchIcon } from "./components/SearchIcon";

import styles from "./CustomSearchBar.css";

export function CustomSearchBar() {
	function handleShowSearchBar() {
		const searchBar = document.querySelector(
			".vtex-store-components-3-x-searchBarContainer",
		) as HTMLDivElement;

		if (!searchBar) return;

		searchBar.classList.toggle(styles.showSearchBar);
	}

	return (
		<div className={styles.wrapper}>
			<button
				type="button"
				className={styles.buttonSearch}
				onTouchEnd={handleShowSearchBar}
			>
				<SearchIcon />
			</button>
		</div>
	);
}
