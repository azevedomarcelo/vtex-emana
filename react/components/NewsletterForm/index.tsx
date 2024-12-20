import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "vtex.styleguide";
import { z } from "zod";
import { dateMask, phoneMask } from "../../utils/masks";

import axios from "axios";
import styles from "./NewsletterForm.css";

const newsletterFormSchema = z.object({
	email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
	firstName: z
		.string()
		.min(3, "Nome com o mínimo de 3 caracteres")
		.nonempty("Nome é obrigatório"),
	lastName: z
		.string()
		.min(3, "Sobrenome com o mínimo de 3 caracteres")
		.nonempty("Sobrenome é obrigatório"),
	birthDate: z.string().nonempty("Data de nascimento é obrigatório"),
	phone: z.string().nonempty("Celular é obrigatório"),
	legalAge: z.coerce.boolean({
		required_error: "legalAge is required",
		invalid_type_error: "isActive must be a boolean",
		message: "Campo obrigatório",
	}),
	terms: z.coerce.boolean({
		required_error: "terms is required",
		invalid_type_error: "isActive must be a boolean",
		message: "Campo obrigatório",
	}),
	isNewsletterOptIn: z.boolean(),
	isCorporate: z.boolean(),
	localeDefault: z.string(),
});

type NewsletterFormSchema = z.infer<typeof newsletterFormSchema>;

const END_POINT = "/api/dataentities/CL/documents";

export function NewsletterForm() {
	const {
		register,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<NewsletterFormSchema>({
		resolver: zodResolver(newsletterFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			birthDate: "",
			phone: "",
			terms: false,
			legalAge: false,
		},
	});

	const [isOpenFields, setIsOpenFields] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [sucessMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	function handleToggleFields(open: boolean) {
		setIsOpenFields(open);
	}

	const registerForm = async (data: NewsletterFormSchema) => {
		setIsLoading(true);
		setSuccessMessage("");
		setErrorMessage("");
		try {
			if (!data.legalAge || !data.terms)
				return setErrorMessage("Selecione todos os campos obrigatórios");

			const [day, month, year] = data.birthDate.split("/");
			const dateConverted = new Date(`${year}-${month}-${day}`).toISOString();

			const formData: NewsletterFormSchema = {
				...data,
				birthDate: String(dateConverted),
				isNewsletterOptIn: false,
				isCorporate: false,
				localeDefault: "pt-BR",
			};

			await axios
				.post(END_POINT, formData)
				.then(() => setSuccessMessage("Cadastro realizado!"));

			setValue("email", "");
			setValue("firstName", "");
			setValue("lastName", "");
			setValue("birthDate", "");
			setValue("phone", "");
			setValue("legalAge", false);
			setValue("terms", false);
		} catch (error) {
			console.log("error ===> ", error.response.data.Message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.form}>
			<div className="flex flex-column">
				<input
					type="text"
					id="email"
					placeholder="Digite seu e-mail aqui"
					onFocus={() => handleToggleFields(true)}
					className={styles.inputField}
					{...register("email", { required: true, pattern: /^\S+@\S+$/i })}
					required
				/>
				<small className={styles.errorMessage}>{errors.email?.message}</small>
			</div>

			{isOpenFields && (
				<button
					type="button"
					className={styles.closeButton}
					onClick={() => handleToggleFields(false)}
				>
					X
				</button>
			)}

			<div
				className={isOpenFields ? styles.fieldsVisible : styles.fieldsInvisible}
			>
				<div className="flex flex-column">
					<input
						type="text"
						id="first-name"
						placeholder="Primeiro Nome"
						className={styles.inputField}
						{...register("firstName", { required: true, maxLength: 80 })}
						required
					/>
					<small className={styles.errorMessage}>{errors.firstName?.message}</small>
				</div>

				<div className="flex flex-column">
					<input
						type="text"
						id="last-name"
						placeholder="Sobrenome"
						className={styles.inputField}
						{...register("lastName", { required: true, maxLength: 100 })}
						required
					/>
					<small className={styles.errorMessage}>{errors.lastName?.message}</small>
				</div>

				<div className="flex flex-column">
					<input
						type="text"
						id="dateOfBirth"
						placeholder="Data de nascimento"
						maxLength={10}
						{...register("birthDate", {
							maxLength: {
								value: 100,
								message: "O comprimento máximo é 100 caracteres",
							},
						})}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setValue("birthDate", dateMask(e.target.value));
						}}
						className={styles.inputField}
						required
					/>
					<small className={styles.errorMessage}>{errors.birthDate?.message}</small>
				</div>

				<div className="flex flex-column">
					<input
						type="tel"
						id="phone"
						placeholder="Celular"
						className={styles.inputField}
						{...register("phone", { required: true })}
						maxLength={15}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setValue("phone", phoneMask(e.target.value));
						}}
						required
					/>
					<small className={styles.errorMessage}>{errors.phone?.message}</small>
				</div>

				<div className="flex flex-column">
					<label htmlFor="legalAge" className={styles.radioLabel}>
						<input
							type="checkbox"
							className={styles.radioInput}
							id="legalAge"
							{...register("legalAge", { required: "Este campo é obrigatório" })}
							required
						/>
						<span className={styles.customRadio} />* Ao enviar esse formulário, você
						confirma ter 18 anos ou mais.
					</label>
					<small className={styles.errorMessage}>{errors.legalAge?.message}</small>
				</div>

				<div className="flex flex-column">
					<label htmlFor="terms" className={styles.radioLabel}>
						<input
							type="checkbox"
							className={styles.radioInput}
							id="terms"
							{...register("terms", { required: "Você deve aceitar os termos" })}
							required
						/>
						<span className={styles.customRadio} />* Estou de acordo com a coleta e
						uso dos dados fornecidos para as finalidades aqui descritas.
					</label>
					<small className={styles.errorMessage}>
						{errors.terms && <span>{errors.terms.message}</span>}
					</small>
				</div>

				{sucessMessage.length > 0 && <p>{sucessMessage}</p>}
				<small className={styles.errorMessage}>{errorMessage}</small>
				<button
					type="submit"
					onClick={() => registerForm(getValues())}
					className={styles.submitButton}
				>
					{isLoading ? <Spinner color="currentColor" size={20} /> : "Enviar"}
				</button>
			</div>
		</div>
	);
}
