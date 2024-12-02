// import axios, { AxiosRequestConfig, Method } from "axios"
import { useEffect } from "react";

export default function useRequests(
	method: string,
	url: string,
	data: any,
	set: Function
) {
	// const [response, setResponse] = useState()
	async function request(method: string, url: string, data: any) {
		const options = {
			method,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data,
		};

		await fetch(url, options)
			.then((res) => res.json())
			.then((res) => {
				return res;
			});
	}

	useEffect(() => {
		request(method, url, data).then((res) => {
			set(res);
		});
	}, []);

	// console.log('request==>', response)
}
