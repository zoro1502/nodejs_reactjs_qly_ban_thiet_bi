import { getMethod, postMethod } from "../api-service";
import { buildFilter } from "../common";

export const VOTE_SERVICE = {
	create: async (data) => {
		return await postMethod('vote/create', data);
	},

	getList: async (params) => {
		let filters = await buildFilter(params);
		return await getMethod('vote/list', filters);
	},

	show: async (id) => {
		return await getMethod('vote/show/' + id);
	}
}