import { getMethod, postMethod, putMethod } from "../api-service"

export const Auth_Service = {
	login: async (data) => {
		return await postMethod('auth/login', data);
	},
	register: async (data) => {
		return await postMethod('auth/register', data);
	},
	profile: async () => {
		return await getMethod('auth/info');
	},
	updateProfile: async (data) => {
		return await putMethod('auth/info', data);
	},
	changePassword: async (data) => {
		return await putMethod('auth/info/change-password', data);
	}
}