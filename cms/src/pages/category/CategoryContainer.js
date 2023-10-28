// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Category, getCategoriesByFilter } from "../../services/categoryService";
import { Categories } from "../../components/Category/Category";
import { timeDelay } from "../../services/common";
import { toggleShowLoading } from "../../redux/actions/common";
import { message } from "antd";

export const CategoryContainer = () =>
{

	const [ datas, setDatas ] = useState( [] );
	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20
	} );
	const [ params, setParams ] = useState( {} );
	const dispatch = useDispatch();

	useEffect( () =>
	{
		getDatasByFilter( paging );
	}, [] );

	const getDatasByFilter = async ( filter ) =>
	{
		const rs = await getCategoriesByFilter( filter, dispatch );
		await timeDelay(1500 );
		dispatch( toggleShowLoading( false ) );
		if ( rs )
		{
			setDatas( rs.categories );
			setPaging( rs.meta );
		}
	}

	const deleteData = async(id) => {
		try {
			const rs = await Category.delete(id);
			if(rs && rs.status === 'success') {
				message.success('Delete successfully!');
				await getDatasByFilter({page: 1, page_size: 20});

			} else {
				message.error(rs.message);
			}
		} catch (error) {
			message.error(error.message);
		}
	}



	return <Categories
		datas={ datas }
		paging={ paging }
		params={ params }
		getDatasByFilter={ getDatasByFilter }
		setParams={ setParams }
		setPaging={ setPaging }
		setDatas={ setDatas }
		deleteData={deleteData}
	/>
};
