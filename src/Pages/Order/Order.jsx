import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { placeOrder } from "../../Redux/Slices/OrderSlice";

const PAYMENT_METHODS = [
    {
        value: "OFFLINE",
        label: "Cash on Delivery",
        icon: "💵",
        desc: "Pay when your order arrives",
        badge: "Free",
    },
    {
        value: "ONLINE",
        label: "Pay Online",
        icon: "💳",
        desc: "UPI, Card, Net Banking",
        badge: "Secure",
    },
];

const ADDRESS_PRESETS = [
    { icon: "🏠", label: "Home" },
    { icon: "🏢", label: "Work" },
    { icon: "📍", label: "Other" },
];

function Order() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartsData } = useSelector((state) => state.cart);

    const [details, setDetails] = useState({
        paymentMethod: "OFFLINE",
        address: "",
    });

    const [addressTag, setAddressTag] = useState("Home");
    const [addressFields, setAddressFields] = useState({
        flat: "",
        area: "",
        city: "",
        pincode: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    }

    function handleAddressField(e) {
        const { name, value } = e.target;
        const updated = { ...addressFields, [name]: value };
        setAddressFields(updated);
        // Compose full address string for the slice
        const full = [
            updated.flat,
            updated.area,
            updated.city,
            updated.pincode,
        ]
            .filter(Boolean)
            .join(", ");
        setDetails((prev) => ({ ...prev, address: full }));
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (details.paymentMethod === "" || details.address === "") {
            toast.error("Please fill all the fields");
            return;
        }

        const response = await dispatch(placeOrder(details));
        console.log("order response", response);

        if (response?.payload?.data?.success) {
            toast.success("Order placed successfully");
            navigate("/order/success");
        } else {
            toast.error("Something went wrong cannot place order");
        }
    }

    const total =
        cartsData?.items?.reduce(
            (acc, item) => acc + item?.quantity * item?.product?.price,
            0
        ) ?? 0;

    return (
        <Layout>
            <section className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-orange-100 py-14 px-4 md:px-10">

                {/* Page heading */}
                <div className="max-w-3xl mx-auto mb-10 text-center">
                    <span className="text-xs font-bold tracking-widest uppercase text-orange-400">
                        Almost there!
                    </span>
                    <h1 className="mt-2 text-4xl font-black text-gray-900 tracking-tight">
                        Thanks for Choosing Us 🍕
                    </h1>
                    <p className="mt-2 text-gray-400 text-sm">
                        Complete your order details below
                    </p>
                </div>

                <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto space-y-6">

                    {/* ── Order total banner ── */}
                    <div className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-orange-500 to-amber-400 rounded-2xl shadow-lg shadow-orange-200">
                        <div>
                            <p className="text-xs font-bold tracking-widest uppercase text-orange-100">
                                Order Total
                            </p>
                            <p className="text-3xl font-black text-white mt-0.5">
                                ₹{total}
                            </p>
                        </div>
                        <div className="text-5xl opacity-80">🛒</div>
                    </div>

                    {/* ── Payment Method ── */}
                    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
                        <div className="bg-linear-to-r from-orange-500 to-amber-400 px-6 py-4">
                            <h2 className="text-base font-black text-white tracking-tight">
                                Payment Method
                            </h2>
                            <p className="text-orange-100 text-xs mt-0.5">
                                Choose how you'd like to pay
                            </p>
                        </div>

                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {PAYMENT_METHODS.map(({ value, label, icon, desc, badge }) => {
                                const selected = details.paymentMethod === value;
                                return (
                                    <label
                                        key={value}
                                        className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                            selected
                                                ? "border-orange-400 bg-orange-50 shadow-md shadow-orange-100"
                                                : "border-gray-100 hover:border-orange-200 hover:bg-orange-50/40"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={value}
                                            checked={selected}
                                            onChange={handleUserInput}
                                            className="hidden"
                                        />
                                        <span className="text-3xl mt-0.5">{icon}</span>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900 text-sm">{label}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                                        </div>
                                        <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                            selected
                                                ? "bg-orange-400 text-white"
                                                : "bg-gray-100 text-gray-400"
                                        }`}>
                                            {badge}
                                        </span>
                                        {selected && (
                                            <span className="absolute bottom-3 right-3 text-orange-500 text-lg">✓</span>
                                        )}
                                    </label>
                                );
                            })}
                        </div>

                        {/* Mock online notice */}
                        {details.paymentMethod === "ONLINE" && (
                            <div className="mx-5 mb-5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                                <span className="text-xl">🔔</span>
                                <div>
                                    <p className="text-xs font-bold text-amber-700">Payment Gateway Coming Soon</p>
                                    <p className="text-xs text-amber-600 mt-0.5">
                                        Online payment is not yet integrated. Your order will be placed and payment collected on delivery.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Delivery Address ── */}
                    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
                        <div className="bg-linear-to-r from-orange-500 to-amber-400 px-6 py-4">
                            <h2 className="text-base font-black text-white tracking-tight">
                                Delivery Address
                            </h2>
                            <p className="text-orange-100 text-xs mt-0.5">
                                Where should we deliver your order?
                            </p>
                        </div>

                        <div className="p-5 space-y-4">

                            {/* Address type tags */}
                            <div className="flex gap-2">
                                {ADDRESS_PRESETS.map(({ icon, label }) => (
                                    <button
                                        type="button"
                                        key={label}
                                        onClick={() => setAddressTag(label)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                                            addressTag === label
                                                ? "bg-orange-500 border-orange-500 text-white shadow shadow-orange-200"
                                                : "border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"
                                        }`}
                                    >
                                        {icon} {label}
                                    </button>
                                ))}
                            </div>

                            {/* Structured address fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                                        Flat / House No. / Floor
                                    </label>
                                    <input
                                        type="text"
                                        name="flat"
                                        placeholder="e.g. Flat 4B, 2nd Floor"
                                        value={addressFields.flat}
                                        onChange={handleAddressField}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                                        Area / Street / Locality
                                    </label>
                                    <input
                                        type="text"
                                        name="area"
                                        placeholder="e.g. Sector 36, Near Metro"
                                        value={addressFields.area}
                                        onChange={handleAddressField}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="e.g. New Delhi"
                                        value={addressFields.city}
                                        onChange={handleAddressField}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                                        Pincode
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="e.g. 110001"
                                        value={addressFields.pincode}
                                        onChange={handleAddressField}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Live address preview */}
                            {details.address && (
                                <div className="flex items-start gap-3 px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl">
                                    <span className="text-lg mt-0.5">
                                        {ADDRESS_PRESETS.find(p => p.label === addressTag)?.icon ?? "📍"}
                                    </span>
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase text-orange-400 mb-0.5">
                                            Delivering to · {addressTag}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {details.address}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Place Order button ── */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-linear-to-r from-orange-500 to-amber-400 text-white font-black text-base tracking-wide shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                    >
                        🚀 Place Order · ₹{total}
                    </button>

                </form>
            </section>
        </Layout>
    );
}

export default Order;
