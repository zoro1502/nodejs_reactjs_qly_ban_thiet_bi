// @ts-nocheck
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import { checkTimeNow, customNumber } from "../../helpers/func";
import { StarIcons } from "../common/star";

const ProductDescriptionInfo = ( {
	product,
	discountedPrice,
	currency,
	finalDiscountedPrice,
	finalProductPrice,
	cartItems,
	wishlistItem,
	compareItem,
	addToast,
	addToCart,
	addToWishlist,
	addToCompare
} ) =>
{
	const [ selectedProductColor, setSelectedProductColor ] = useState(
		product.variation ? product.variation[ 0 ].color : ""
	);
	const [ selectedProductSize, setSelectedProductSize ] = useState(
		product.variation ? product.variation[ 0 ].size[ 0 ].name : ""
	);
	const [ quantityCount, setQuantityCount ] = useState( 1 );

	const productCartQty = getProductCartQuantity(
		cartItems,
		product,
		selectedProductColor,
		selectedProductSize
	);

	let vote_number = 0;
	if ( product?.total_stars && product?.total_reviews )
	{
		vote_number = Number( Math.round( product?.total_stars / product?.total_reviews ) );
	}
	const checkTime =  checkTimeNow(product?.sale_to)
	return (
		<div className="product-details-content ml-70">
			<h2>{ product.name }</h2>
			<div className="product-details-price">
				{ product.sale && checkTime ? (
					<Fragment>
						<span>{ customNumber( finalDiscountedPrice, 'đ' ) }</span>{ " " }
						<span className="old">
							{ customNumber( finalProductPrice, 'đ' ) }
						</span>
					</Fragment>
				) : (
					<span className="not-sale">{ customNumber( finalProductPrice, 'đ' ) } </span>
				) }
			</div>
			<div className="pro-details-rating-wrap">
				<div className="pro-details-rating">
					<StarIcons vote_number={ vote_number } />
				</div>
			</div>
			<div className="pro-details-list">
				<p>{ product.shortDescription }</p>
			</div>

			{/* {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map(single => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
			{/* {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : 
	  ( */}
			<div className="pro-details-quality">
				<div className="cart-plus-minus">
					<button
						onClick={ () =>
							setQuantityCount( quantityCount > 1 ? quantityCount - 1 : 1 )
						}
						className="dec qtybutton"
					>
						-
					</button>
					<input
						className="cart-plus-minus-box"
						type="text"
						value={ quantityCount }
						readOnly
					/>
					<button
						onClick={ () =>
							setQuantityCount(
								quantityCount < product.number - productCartQty
									? quantityCount + 1
									: quantityCount
							)
						}
						className="inc qtybutton"
					>
						+
					</button>
				</div>
				<div className="pro-details-cart btn-hover">
					{ product.number && product.number > 0 ? (
						<button
							onClick={ () =>
								addToCart(
									product,
									addToast,
									quantityCount,
									selectedProductColor,
									selectedProductSize
								)
							}
							disabled={ productCartQty >= product.number }
						>
							{ " " }
							Add to cart{ " " }
						</button>
					) : (
						<button disabled>Out of stock</button>
					) }
				</div>
				{/* <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => addToWishlist(product, addToast)}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => addToCompare(product, addToast)}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div> */}
			</div>
			{/* )} */ }
			{ product.category ? (
				<div className="pro-details-meta">
					<span>Categories :</span>
					<ul>
						<li >
							<Link to={ process.env.PUBLIC_URL + "/shop" }>
								{ product?.category?.name }
							</Link>
						</li>
					</ul>
				</div>
			) : (
				""
			) }
			{/* {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )} */}

			{/* <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div> */}
		</div>
	);
};

ProductDescriptionInfo.propTypes = {
	addToCart: PropTypes.func,
	//   addToCompare: PropTypes.func,
	addToWishlist: PropTypes.func,
	addToast: PropTypes.func,
	cartItems: PropTypes.array,
	compareItem: PropTypes.array,
	currency: PropTypes.object,
	discountedPrice: PropTypes.number,
	finalDiscountedPrice: PropTypes.number,
	finalProductPrice: PropTypes.number,
	product: PropTypes.object,
	wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch =>
{
	return {
		addToCart: (
			item,
			addToast,
			quantityCount,
			selectedProductColor,
			selectedProductSize
		) =>
		{
			dispatch(
				addToCart(
					item,
					addToast,
					quantityCount,
					selectedProductColor,
					selectedProductSize
				)
			);
		},
		addToWishlist: ( item, addToast ) =>
		{
			dispatch( addToWishlist( item, addToast ) );
		},
		// addToCompare: (item, addToast) => {
		//   dispatch(addToCompare(item, addToast));
		// }
	};
};

export default connect( null, mapDispatchToProps )( ProductDescriptionInfo );
