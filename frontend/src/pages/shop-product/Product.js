// @ts-nocheck
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getProducts, showProduct, showProductDetail } from "../../services";

const Product = ( { location } ) =>
{
	const { pathname } = location;
	const { id } = useParams()

	const [ productData, setProductData ] = useState( null );
	const [ products, setProducts ] = useState( null );
	useEffect( () =>
	{
		showProductDetail( id, setProductData );
	}, [ id ] );

	useEffect(() => {

	},[productData]);

	

	return (
		<Fragment>
			<MetaTags>
				<title>Cake Shop | Product Page</title>
				<meta
					name="description"
					content="Product page of flone react minimalist eCommerce template."
				/>
			</MetaTags>

			<BreadcrumbsItem to={ process.env.PUBLIC_URL + "/" }>Home</BreadcrumbsItem>
			<BreadcrumbsItem to={ process.env.PUBLIC_URL + pathname }>
				Shop Product
			</BreadcrumbsItem>
			{
				productData &&
				<LayoutOne headerTop="visible">
					{/* breadcrumb */ }
					<Breadcrumb />

					{/* product description with image */ }
					<ProductImageDescription
						spaceTopClass="pt-100"
						spaceBottomClass="pb-100"
						product={ productData }
					/>

					{/* product description tab */ }
					<ProductDescriptionTab
						spaceBottomClass="pb-90"
						productFullDesc={productData}
					/>

					{/* related product slider */ }
					<RelatedProductSlider
						spaceBottomClass="pb-95"
						category={ productData.category_id }
					/>
				</LayoutOne>
			}
			{!productData && <span>Không tìm thấy sản phẩm</span>}

		</Fragment>
	);
};

Product.propTypes = {
	location: PropTypes.object,
};

const mapStateToProps = ( state, ownProps ) =>
{
};

export default connect( mapStateToProps )( Product );
