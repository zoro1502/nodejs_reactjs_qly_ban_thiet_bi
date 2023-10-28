import axios from "axios";
import { toggleShowLoading } from "../redux/actions/common";
import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter, timeDelay } from "./common";
import { message } from "antd";
import { uploadFile } from "./upload";

export const USER_SERVICE = {
	async getListData ( params, dispatch )
	{
		try
		{
			let filter = buildFilter( params );
			dispatch( toggleShowLoading( true ) );
			const response = await getMethod( 'admin/user/list', filter );;
			await timeDelay( 2000 );
			dispatch( toggleShowLoading( false ) );
			if ( response.status === 'success' )
			{
				return response.data;

			}
			return null;
		} catch ( error )
		{
			dispatch( toggleShowLoading( false ) )
			return null;
		}
	},
	async showData ( id, dispatch ) 
	{
		try
		{
			dispatch( toggleShowLoading( true ) );
			const response = await getMethod( `admin/user/show/${ id }` );
			await timeDelay( 1000 );
			dispatch( toggleShowLoading( false ) );
			if ( response.status === 'success' )
			{
				return response.data.user;
			}
			return null;
		} catch ( error )
		{
			dispatch( toggleShowLoading( false ) );
			return null;
		}
	},
	async create ( data )
	{
		return await postMethod( `admin/user/create`, data );
	},

	async update ( id, data )
	{
		return await putMethod( `admin/user/edit/${ id }`, data );
	},

	async delete ( id )
	{
		return await deleteMethod( `admin/user/${ id }` );
	}
}
export const submitFormUser = async ( id = null, files, e, dispatch, history ) =>
{
	try
	{
		dispatch( toggleShowLoading( true ) );
		let fileImg = [];
		let avatar = "";
		if ( files.length > 0 )
		{
			for ( let [ index, item ] of files.entries() )
			{
				if ( !item.default )
				{
					const rs = await uploadFile( item.originFileObj );
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
				} else
				{
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
		}

		await timeDelay( 2000 );
		let formValue = { ...e };
		delete formValue.image;
		formValue.avatar = avatar;
		let response;
		if ( id )
		{
			response = await USER_SERVICE.update( id, formValue );
		} else
		{
			response = await USER_SERVICE.create( formValue );
		}
		dispatch( toggleShowLoading( false ) );
		dispatch( toggleShowLoading( false ) );
		return response;
	} catch ( error )
	{
		dispatch( toggleShowLoading( false ) );
		return error;
	}
}