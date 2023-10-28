import { getMethod } from '../index'

export const sda = async ( params) =>
{
	await getMethod('product/list', params);
}

export const sad = async ( id, params ) =>
{
	await getMethod(`product/list/${id}`, params);
}