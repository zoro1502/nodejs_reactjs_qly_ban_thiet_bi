// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Product, getProductsByFilter } from "../../services/productService.js";
import { Products } from "../../components/Products/Products.js";
import { message } from "antd";

export const ProductContainer = () =>
{

	const [ products, setProducts ] = useState([]);
	const [paging, setPaging] = useState({
		page: 1,
		page_size: 20
	});
	const [params, setParams] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		getProductsByFilters(paging, setProducts, setPaging);
	}, []);

	const getProductsByFilters = (filter, setProduct, setPage) => {
		getProductsByFilter(filter, setProducts, setPaging, dispatch);
	}

	const deleteData = async(id) => {
		try {
			const rs = await Product.delete(id);
			if(rs && rs.status === 'success') {
				message.success('Delete successfully!');
				await getProductsByFilters({page: 1, page_size: 20});

			} else {
				message.error(rs.message);
			}
		} catch (error) {
			message.error(error.message);
		}
	}


	return <Products 
	products={products} 
	paging={paging} 
	params={params} 
	getProductsByFilters={getProductsByFilters}
	setParams={setParams}
	setPaging={setPaging}
	setProducts={setProducts} 
	deleteData={deleteData}
	/>
};
