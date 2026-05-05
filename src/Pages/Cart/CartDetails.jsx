import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetails, removeProductFromCart } from "../../Redux/Slices/CartSlice";
import Layout from "../../Layouts/Layout";
import { Link } from "react-router-dom";

function CartDetails() {
    const [cartDetails, setCartDetails] = useState();

    const { cartsData } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    async function fetchCartDetails() {
        console.log("fetching cart details");
        const response = await dispatch(getCartDetails());
        console.log(response);
        setCartDetails(response?.payload?.data?.data);
    }

    async function handleRemove(productId) {
        const response = await dispatch(removeProductFromCart(productId));
        if (response?.payload?.data?.success) {
            console.log("removed successfully");
            dispatch(getCartDetails());
        }
    }

    useEffect(() => {
        console.log("re-rendering");
        fetchCartDetails();
    }, [cartsData?.items?.length]);

    const total = cartDetails?.items?.reduce(
        (acc, item) => acc + item?.quantity * item?.product?.price, 0
    ) ?? 0;

    return (
        <Layout>
            <section className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-orange-100 py-12 px-4 md:px-10">

                {/* Page heading */}
                <div className="max-w-6xl mx-auto mb-10">
                    <span className="text-xs font-bold tracking-widest uppercase text-orange-400">
                        Your Order
                    </span>
                    <h1 className="mt-1 text-4xl font-black text-gray-900 tracking-tight">
                        Cart Details
                    </h1>
                </div>

                <div className="max-w-6xl mx-auto">
                    {cartDetails?.items?.length > 0 ? (
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

                            {/* ── Cart items ── */}
                            <div className="flex-1 space-y-4">
                                {cartDetails.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-orange-100 shadow-sm shadow-orange-100/50 hover:shadow-md hover:shadow-orange-200/40 transition-all duration-200"
                                    >
                                        {/* Product image */}
                                        <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-orange-100 bg-orange-50">
                                            <img
                                                src={item?.product?.productImage}
                                                alt={item?.product?.productName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product info */}
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/product/${item?.product?._id}`}> 
                                                <h3 className="font-bold text-gray-900 text-base leading-snug hover:text-orange-500 transition-colors duration-150 line-clamp-1">
                                                    {item?.product?.productName}
                                                </h3>
                                            </Link>
                                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                                {item?.product?.description}
                                            </p>
                                            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-orange-50 text-orange-400 border border-orange-100 rounded-full">
                                                {item?.product?.category}
                                            </span>
                                        </div>

                                        {/* Price + qty + remove */}
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <p className="text-lg font-black text-orange-600">
                                                ₹{item?.product?.price}
                                            </p>
                                            <span className="text-xs text-gray-400 font-medium">
                                                Qty: {item?.quantity}
                                            </span>
                                            {item._id && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(item?.product?._id)}
                                                    className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-all duration-150"
                                                >
                                                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ── Order summary ── */}
                            <div className="w-full lg:w-80 shrink-0">
                                <div className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-100/60 overflow-hidden">

                                    {/* Summary header */}
                                    <div className="bg-linear-to-r from-orange-500 to-amber-400 px-6 py-5">
                                        <h2 className="text-lg font-black text-white tracking-tight">
                                            Order Summary
                                        </h2>
                                        <p className="text-orange-100 text-xs mt-0.5">
                                            {cartDetails.items.length} item{cartDetails.items.length !== 1 ? "s" : ""} in your cart
                                        </p>
                                    </div>

                                    <div className="px-6 py-5 space-y-3">

                                        {/* Line items */}
                                        {cartDetails.items.map((item) => (
                                            <div key={item?.product?._id} className="flex justify-between items-start gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                                                        {item?.product?.productName}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        ₹{item?.product?.price} × {item?.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-bold text-gray-700 shrink-0">
                                                    ₹{item?.product?.price * item?.quantity}
                                                </p>
                                            </div>
                                        ))}

                                        {/* Divider */}
                                        <div className="h-px bg-linear-to-r from-transparent via-orange-100 to-transparent my-2" />

                                        {/* Total */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-black text-gray-900">Total</span>
                                            <span className="text-xl font-black text-orange-600">₹{total}</span>
                                        </div>

                                        {/* Checkout button */}
                                        {cartDetails.items.length > 0 && (
                                            <Link
                                                to="/order"
                                                className="mt-2 flex justify-center items-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-orange-500 to-amber-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                                            >
                                                🛒 Proceed to Checkout
                                            </Link>
                                        )}

                                        {/* Continue shopping */}
                                        <div className="flex items-center justify-center gap-2 pt-1">
                                            <span className="text-xs text-gray-400">or</span>
                                            <Link
                                                to="/"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors duration-150"
                                            >
                                                Continue Shopping
                                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                                </svg>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : (
                        /* ── Empty cart ── */
                        <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
                            <span className="text-7xl">🛒</span>
                            <h2 className="text-2xl font-black text-gray-800">Your cart is empty</h2>
                            <p className="text-gray-400 text-sm max-w-xs">
                                Looks like you haven't added anything yet. Browse our menu and find something delicious!
                            </p>
                            <Link
                                to="/"
                                className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-amber-400 text-white font-bold text-sm shadow-lg shadow-orange-200 hover:-translate-y-0.5 hover:shadow-orange-300 transition-all duration-200"
                            >
                                🍕 Browse Menu
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default CartDetails;
