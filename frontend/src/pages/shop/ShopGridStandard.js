// @ts-nocheck
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import * as queryString from 'query-string';
import { getCategories, getCategoryList, getProducts } from "../../services/index";
import { toggleShowLoading } from "../../redux/actions/common";

const ShopGridStandard = ( { location, dispatch } ) =>
{
	const [ layout, setLayout ] = useState( 'grid three-column' );
	const [ offset, setOffset ] = useState( 0 );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ products, setProducts ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );
	const [params, setParams] = useState({
		name: null,
		category_id: null
	});
	const [ paging, setPaging ] = useState( { page: 1, page_size: 20, total: 0 } );

	const { pathname } = location;


	const getLayout = ( layout ) =>
	{
		setLayout( layout )
	}

	const getProductList = async ( filter ) =>
	{
		dispatch(toggleShowLoading(true));
		try
		{
			const response = await getProducts( filter );
			if ( response.status === 'success' )
			{
				setProducts( response.data.products );
				setPaging( { ...response.data.meta } );
			}
		} catch ( error )
		{
			console.log( error );
		}
		dispatch(toggleShowLoading(false));
	}

	

	useEffect( () =>
	{
		getCategories( null, setCategories );
		if(window.location.search) {
			let cateId = window.location.search.replace('?category_id=', '');
			if(cateId.match(/^[0-9]+$/)) {
				setParams({...params, category_id: Number(cateId)})
			}
		}
	}, [] );

	useEffect( () =>
	{
		
		paging.page = currentPage;
		// console.log(queryString());
		getProductList( { ...paging, ...params} );
	}, [ currentPage, params.name, params.category_id ] );


	return (
		<Fragment>
			{/* <MetaTags>
                <title>Flone | Shop Page</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags> */}

			<BreadcrumbsItem to={'/' }>Home</BreadcrumbsItem>
			<BreadcrumbsItem to={pathname}>Shop</BreadcrumbsItem>

			<LayoutOne headerTop="visible">
				{/* breadcrumb */ }
				<Breadcrumb />

				<div className="shop-area pt-95 pb-100">
					<div className="container">
						<div className="row">
							<div className="col-lg-3 order-2 order-lg-1">
								{/* shop sidebar */ }
								<ShopSidebar
									categories={ categories }
									params={params}
									setParams={setParams}
									sideSpaceClass="mr-30" />
							</div>
							<div className="col-lg-9 order-1 order-lg-2">
								{/* shop topbar default */ }
								<ShopTopbar getLayout={ getLayout } productCount={ paging.total } sortedProductCount={ products.length } />

								{/* shop page content default */ }
								<ShopProducts layout={ layout } products={ products } />

								{/* shop product pagination */ }
								{
									paging.total > 0 && <div className="pro-pagination-style text-center mt-30">
										<Paginator
											totalRecords={ paging.total }
											pageLimit={ paging.page_size }
											pageNeighbours={ 2 }
											setOffset={ setOffset }
											currentPage={ paging.page }
											setCurrentPage={ setCurrentPage }
											pageContainerClass="mb-0 mt-0"
											pagePrevText="«"
											pageNextText="»"
										/>
									</div>
								}

							</div>
						</div>
					</div>
				</div>
			</LayoutOne>
		</Fragment>
	)
}

ShopGridStandard.propTypes = {
	location: PropTypes.object,
	products: PropTypes.array,
	dispatch: PropTypes.func
}

const mapStateToProps = state =>
{
}

export default connect( mapStateToProps )( ShopGridStandard );