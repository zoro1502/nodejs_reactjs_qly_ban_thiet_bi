import { getMethod, postMethod } from '../index';

export const ORDER_SERVICE = {
	create: async (data) => {
		return await postMethod('order/create', data);
	},

	getList: async (params) => {
		return await getMethod('order/list', params);
	},

	show: async (id) => {
		return await getMethod('order/show/' + id);
	}
}