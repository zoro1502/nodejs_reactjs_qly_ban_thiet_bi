import { message } from "antd";
import { toggleShowLoading } from "../redux/actions/common";
import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter, timeDelay } from "./common";
import { uploadFile } from "./upload";

export const getCategories = async ( params ) =>
{
	let filter = buildFilter( params );
	return await getMethod( 'admin/category/list', filter );
}

export const showCategory = async ( id, params ) =>
{
	return await getMethod( `admin/category/show/${ id }`, params );
}

export const Category = {
	async create ( data )
	{
		return await postMethod( `admin/category/create`, data );
	},

	async update ( id, data )
	{
		return await putMethod( `admin/category/edit/${ id }`, data );
	},

	async delete ( id )
	{
		return await deleteMethod( `admin/category/delete/${ id }` );
	}
}


export const showCategoryDetail = async ( productId, setCategoryData ) =>
{
	try
	{

		const response = await showCategory( productId );
		if ( response.status === 'success' )
		{
			setCategoryData( response.data );
		} else
		{
			setCategoryData( null );
		}
	} catch ( error )
	{
		setCategoryData( null );
	}
}

export const getCategoriesByFilter = async ( params, dispatch ) =>
{
	try
	{
		dispatch( toggleShowLoading( true ) )
		const response = await getCategories( params );

		if ( response.status === 'success' )
		{
			return response.data;
		} else
		{
			return null;
		}
	} catch ( error )
	{
		dispatch( toggleShowLoading( false ) )
		return null;
	}
}

export const submitForms = async ( id = null, files, e, dispatch, history ) =>
{
	try
	{
		dispatch( toggleShowLoading( true ) );
		let avatar = "";
		for ( let item of files )
		{
			if ( !item.default )
			{
				const rs = await uploadFile( item );
				if ( rs?.status === 'success' )
				{
					avatar = rs.data.destination;
				}
			} else
			{
				avatar = item.url
			}

		}
		await timeDelay( 2000 );
		let formValue = { ...e };
		delete formValue.image;
		formValue.avatar = avatar;
		formValue.hot = formValue.hot ? 1 : -1;
		let response;
		if ( id )
		{
			response = await Category.update( id, formValue );
		} else
		{
			response = await Category.create( formValue );
		}
		dispatch( toggleShowLoading( false ) );
		return response;
	} catch ( error )
	{
		dispatch( toggleShowLoading( false ) );
		return error;
	}
}