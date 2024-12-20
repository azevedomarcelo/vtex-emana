export const cepMask = (value: string) => {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{3})\d+?$/, "$1");
};

export const cpfMask = (valor: string) => {
	return valor
		.replace(/\D/g, "")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const cnpjMask = (valor: string) => {
	return valor
		.replace(/\D/g, "")
		.replace(/^(\d{2})(\d)/, "$1.$2")
		.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
		.replace(/\.(\d{3})(\d)/, ".$1/$2")
		.replace(/(\d{4})(\d)/, "$1-$2");
};

export const phoneMask = (valor: string) => {
	return valor
		.replace(/\D/g, "")
		.replace(/^(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{5})(\d)/, "$1-$2");
};

export const dateMask = (valor: string) => {
	return valor
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "$1/$2")
		.replace(/(\d{2})(\d)/, "$1/$2");
};

// export const hourMask = (valor: string) => {
// 	return valor
// 		.replace(/\D/g, "")
// 		.replace(/(\d{2})(\d)/, "$1:$2")
// 		.replace(/(\d{2})(\d)/, "$1:$2");
// };
