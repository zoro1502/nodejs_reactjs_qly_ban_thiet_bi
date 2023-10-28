import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { customNumber } from "../../helpers/func";

const ProductGridSingleTwo = ( {
	product,
	currency,
	addToCart,
	addToWishlist,
	addToCompare,
	cartItem,
	wishlistItem,
	compareItem,
	sliderClassName,
	spaceBottomClass,
	colorClass,
	titlePriceClass
} ) =>
{
	const [ modalShow, setModalShow ] = useState( false );
	const { addToast } = useToasts();

	const discountedPrice = getDiscountPrice( product.price, product.discount );
	const finalProductPrice = +( product.price * currency.currencyRate ).toFixed( 2 );
	const finalDiscountedPrice = +(
		discountedPrice * currency.currencyRate
	).toFixed( 2 );

	return (
		<Fragment>
			<div
				className={ `col-xl-3 col-md-6 col-lg-4 col-sm-6 ${ sliderClassName ? sliderClassName : ""
					}` }
			>
				<div
					className={ `product-wrap-2 ${ spaceBottomClass ? spaceBottomClass : ""
						} ${ colorClass ? colorClass : "" } ` }
				>
					<div className="product-img">
						<Link to={ process.env.PUBLIC_URL + "/product/" + product.id }>
							<img
								className="default-img"
								src={ product.avatar }
								alt=""
							/>
							{/* {product.image.length > 1 ? (
                <img
                  className="hover-img"
                  src={process.env.PUBLIC_URL + product.image[1]}
                  alt=""
                />
              ) : (
                ""
              )} */}
						</Link>
						{ product.sale || product.hot === 1 ? (
							<div className="product-img-badges">
								{ product.sale ? (
									<span className="pink">-{ product.sale }%</span>
								) : (
									""
								) }
								{ product.hot === 1 ? <span className="purple">Hot</span> : "" }
							</div>
						) : (
							""
						) }

						<div className="product-action-2">
							{ product.number && product.number > 0 ? (
								<button
									onClick={ () => addToCart( product, addToast ) }
									className={
										cartItem !== undefined && cartItem.quantity > 0
											? "active"
											: ""
									}
									disabled={ cartItem !== undefined && cartItem.quantity > 0 }
									title={
										cartItem !== undefined ? "Đã thêm giỏ hàng" : "Thêm giỏ hàng"
									}
								>
									{ " " }
									<i className="fa fa-shopping-cart"></i>{ " " }
								</button>
							) : (
								<button disabled className="active" title="Hết hàng">
									<i className="fa fa-shopping-cart"></i>
								</button>
							) }

							{/* <button onClick={ () => setModalShow( true ) } title="Quick View">
								<i className="fa fa-eye"></i>
							</button> */}

							{/* <button
								className={compareItem !== undefined ? "active" : ""}
								disabled={compareItem !== undefined}
								title={
								compareItem !== undefined
									? "Added to compare"
									: "Add to compare"
								}
								onClick={() => addToCompare(product, addToast)}
							>
								<i className="fa fa-retweet"></i>
							</button> */}
						</div>
					</div>
					<div className="product-content-2">
						<div
							className={ `title-price-wrap-2 ${ titlePriceClass ? titlePriceClass : ""
								}` }
						>
							<h3>
								<Link to={ process.env.PUBLIC_URL + "/product/" + product.id }>
									{ product.name }
								</Link>
							</h3>
							<div className="price-2">
								{ discountedPrice !== null ? (
									<Fragment>
										<span>
											{ customNumber( finalDiscountedPrice, 'đ' ) }
										</span>{ " " }
										<span className="old">
											{ customNumber( finalProductPrice, 'đ' ) }
										</span>
									</Fragment>
								) : (
									<span>{ customNumber( finalProductPrice, 'đ' ) } </span>
								) }
							</div>
						</div>
						{/* <div className="pro-wishlist-2">
							<button
								className={ wishlistItem !== undefined ? "active" : "" }
								disabled={ wishlistItem !== undefined }
								title={
									wishlistItem !== undefined
										? "Added to wishlist"
										: "Add to wishlist"
								}
								onClick={ () => addToWishlist( product, addToast ) }
							>
								<i className="fa fa-heart-o" />
							</button>
						</div> */}
					</div>
				</div>
			</div>
			{/* product modal */ }
			<ProductModal
				show={ modalShow }
				onHide={ () => setModalShow( false ) }
				product={ product }
				currency={ currency }
				discountedprice={ discountedPrice }
				finalproductprice={ finalProductPrice }
				finaldiscountedprice={ finalDiscountedPrice }
				cartitem={ cartItem }
				wishlistitem={ wishlistItem }
				compareitem={ compareItem }
				addtocart={ addToCart }
				addtowishlist={ addToWishlist }
				addtocompare={ addToCompare }
				addtoast={ addToast }
			/>
		</Fragment>
	);
};

ProductGridSingleTwo.propTypes = {
	addToCart: PropTypes.func,
	addToCompare: PropTypes.func,
	addToWishlist: PropTypes.func,
	cartItem: PropTypes.object,
	compareItem: PropTypes.object,
	currency: PropTypes.object,
	product: PropTypes.object,
	sliderClassName: PropTypes.string,
	spaceBottomClass: PropTypes.string,
	colorClass: PropTypes.string,
	titlePriceClass: PropTypes.string,
	wishlistItem: PropTypes.object
};

export default ProductGridSingleTwo;
