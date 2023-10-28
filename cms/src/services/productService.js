import axios from "axios";
import { toggleShowLoading } from "../redux/actions/common";
import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter, timeDelay } from "./common";
import { message } from "antd";
import { uploadFile } from "./upload";

export const getProducts = async ( params ) =>
{
	let filter = buildFilter( params );
	return await getMethod( 'admin/product/list', filter );
}

export const showProduct = async ( id, params ) =>
{
	return await getMethod( `admin/product/show/${ id }`, params );
}

export const Product = {
	async create ( data )
	{
		return await postMethod( `admin/product/create`, data );
	},

	async update ( id, data )
	{
		return await putMethod( `admin/product/edit/${ id }`, data );
	},

	async delete ( id )
	{
		return await deleteMethod( `admin/product/delete/${ id }` );
	}
}


export const showProductDetail = async ( productId, setProductData ) =>
{
	try
	{
		const response = await showProduct( productId );
		if ( response.status === 'success' )
		{
			setProductData( response.data.product );
		} else
		{
			setProductData( null );
		}
	} catch ( error )
	{
		console.log( error );
		setProductData( null );
	}
}

export const getProductsByFilter = async ( params, setProducts, setPaging, dispatch ) =>
{
	try
	{
		dispatch( toggleShowLoading( true ) )
		const response = await getProducts( params );
		await timeDelay( 2000 );
		if ( response.status === 'success' )
		{
			setProducts( response.data.products );
			setPaging( response.data.meta );

		} else
		{
			setProducts( [] );
		}
		dispatch( toggleShowLoading( false ) )
	} catch ( error )
	{
		console.log( error );
		setProducts( [] );
		dispatch( toggleShowLoading( false ) )

	}

}

export const submitFormProduct = async ( id = null, files, e, dispatch, history ) =>
{
	try
	{
		dispatch( toggleShowLoading( true ) );
		let fileImg = [];
		let avatar = "";
		for ( let [ index, item ] of files.entries() )
		{
			if ( !item.default )
			{
				const rs = await uploadFile( item.originFileObj);
				if ( rs?.status === 'success' )
				{
					if ( index === 0 )
					{
						avatar = rs.data.destination;
					} else
					{
						fileImg.push( {
							name: rs.data.originalname,
							path: rs.data.destination
						} );
					}
				}
			} else {
				if ( index === 0 )
					{
						avatar = item.url;
					} else
					{
						fileImg.push( {
							name: item.name || item.url,
							path: item.url
						} );
					}
			}

		}
		await timeDelay( 2000 );
		let formValue = { ...e };
		delete formValue.image;
		formValue.avatar = avatar;
		formValue.products_images = fileImg;
		formValue.hot = formValue.hot ? 1 : -1;
		formValue.category_id = Number( formValue.category_id );
		formValue.price = Number( formValue.price );
		formValue.number = Number( formValue.number );
		let response;
		if ( id )
		{
			response = await Product.update( id, formValue );
		} else
		{
			response = await Product.create( formValue );
		}
		dispatch( toggleShowLoading( false ) );
		return response;
	} catch ( error )
	{
		dispatch( toggleShowLoading( false ) );
		return error;
	}
}