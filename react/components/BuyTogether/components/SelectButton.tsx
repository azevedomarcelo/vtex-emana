import type { Dispatch } from "react";
import React from "react";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["selectCheckbox"] as const;

interface Props {
	handles: any;
	selected: boolean;
	setSelection: Dispatch<boolean>;
	text?: string;
	textSelected?: string;
}

export default function SelectButton({
	// handles,
	selected,
	setSelection,
}: // text,
// textSelected,
Props) {
	const handles = useCssHandles(CSS_HANDLES);

	const handleChange = () => {
		setSelection(!selected);
	};

	return (
		<>
			<input
				className={handles.selectCheckbox}
				type="checkbox"
				checked={selected}
				onChange={handleChange}
			/>

			{/* {select && (
				<button
					className={handles.selectToBuy}
					onClick={() => {
						setSelection(!select);
					}}
				>
					{textSelected || "Remover"}
				</button>
			)}
			{!select && (
				<button
					className={handles.unselectToBuy}
					onClick={() => {
						setSelection(!select);
					}}
				>
					{text || "Selecionar"}
				</button>
			)} */}
		</>
	);
}
