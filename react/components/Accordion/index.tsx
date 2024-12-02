import React from "react";
import styles from "./styles.css";

interface Props {
	topic: {
		title: string;
		items: Faq[];
	}[];
}

type Faq = {
	question: string;
	answer: string;
};

export const Accordion = ({ topic }: Props) => {
	return (
		<div className={styles.accordionContainer}>
			{topic.map((item) => (
				<>
					<h3 key={item.title}>{item.title}</h3>
					{item.items.map((faq) => (
						<details key={faq.question} className={`${styles.details} mv3`}>
							<summary className={styles.summary}>
								<p className="flex-auto fw6">{faq.question}</p>
							</summary>
							<span className={`${styles.answer} flex pa5`}>{faq.answer}</span>
						</details>
					))}
				</>
			))}
		</div>
	);
};
