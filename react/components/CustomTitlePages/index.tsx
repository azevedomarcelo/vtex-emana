import React, { useEffect, useState } from "react";
import { useProduct } from "vtex.product-context";
import { Helmet, useRuntime } from "vtex.render-runtime";
import { firstLetterUppercase } from "../../utils/firstLetterUppercase";

export function CustomTitlePages() {
	const { route } = useRuntime();
	const productContext = useProduct();
	const path = route.canonicalPath;
	const params = route.params.term || "";
	const department = route.params.department || "";
	const [titlePage, setTitlePage] = useState("");
	const [metaPage, setMetaPage] = useState("");

	useEffect(() => {
		setTitlePage("Sou Emana");
		setMetaPage("");
	}, [path]);

	useEffect(() => {
		if (route.blockId.includes("store.product")) {
			const productName = productContext?.product?.productName;
			setTitlePage(`${productName} | Sou Emana`);
		}
		if (params.length > 0) {
			setTitlePage(`${params} | Sou Emana`);
		}
		if (department.length > 0) {
			const decodedDepartment = decodeURIComponent(department);
			const parsedDepartment = titleConvertedToTitlePage(
				decodedDepartment.replace(/-/g, " "),
			);

			setTitlePage(`${parsedDepartment} | Sou Emana`);
		}
	}, [productContext]);

	function titleConvertedToTitlePage(title: string) {
		const splitedTitle = title.split(" ");

		for (let i = 0; i <= splitedTitle.length - 1; i++) {
			if (splitedTitle[i].length >= 2) {
				splitedTitle[i] = firstLetterUppercase(splitedTitle[i]);
			}
		}
		return splitedTitle.join(" ");
	}

	return (
		<Helmet>
			<title>{titlePage}</title>
			<meta name="description" content={metaPage} />
		</Helmet>
	);
}
