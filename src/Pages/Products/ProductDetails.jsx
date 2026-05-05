import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getproductDetails } from "../../Redux/Slices/ProductSlice";
import Layout from "../../Layouts/Layout";
import { addProductToCart, getCartDetails, removeProductFromCart } from "../../Redux/Slices/CartSlice";

function ProductDetails() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({});
    const [isInCart, setIsInCart] = useState(false); // Check if product is in cart
    // 

    async function fetchProductDetails() {
        const details = await dispatch(getproductDetails(productId));
        console.log(details);
        setProductDetails(details?.payload?.data?.data);
        
    }

    async function handleCart() {
        // Add product to cart
        const response = await dispatch(addProductToCart(productId));
        if(response?.payload?.data?.success) {
            setIsInCart(true);
            dispatch(getCartDetails()); // Fetch cart details and update state
        }
    }

    async function handleRemove() {
        // Remove product from cart
        const response = await dispatch(removeProductFromCart(productId));
        if(response?.payload?.data?.success) {
            setIsInCart(false);
            dispatch(getCartDetails()); // Fetch cart details and update state
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);
    
    return (
        <Layout>
        <section className="px-6 py-16 bg-linear-to-br from-amber-50 via-orange-100 to-orange-200 md:px-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-center">

            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={productDetails?.productImage}
                alt="Pizza"
                className="w-full max-w-md rounded-3xl shadow-2xl shadow-orange-200/60 hover:scale-105 transition duration-300"
              />
            </div>

            {/* Details */}
            <div className="w-full lg:w-1/2 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-orange-100">

              <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-2">
                {productDetails?.category}
              </p>

              <h1 className="text-4xl font-black text-gray-900 mb-4">
                {productDetails?.productName}
              </h1>

              <p className="text-gray-600 leading-relaxed mb-6">
                {productDetails?.description}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black text-orange-600">
                  ₹{productDetails?.price}
                </span>

                <span className="text-sm text-green-600 font-semibold">
                  In Stock
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                {isInCart ? (
                  <button
                    onClick={handleRemove}
                    className="flex-1 px-6 py-3 font-semibold text-orange-600 border-2 border-orange-400 rounded-xl hover:bg-orange-50 transition-all duration-200"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={handleCart}
                    className="flex-1 px-6 py-3 font-semibold text-white rounded-xl bg-linear-to-r from-orange-500 to-amber-400 shadow-lg shadow-orange-300/50 hover:scale-105 hover:shadow-orange-400/60 transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                )}
              </div>

            </div>
          </div>
        </section>
      </Layout>
    
    )
}


export default ProductDetails;