import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import OrderSuccessImage from "../../assets/Images/ordered-success.png";

function OrderSuccess() {
    const navigate = useNavigate();

    return (
        <Layout>
            <section className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-orange-100 flex items-center justify-center px-4 py-16">

                <div className="w-full max-w-md text-center">

                    {/* Decorative glow */}
                    <div className="relative flex justify-center mb-6">
                        <div className="absolute inset-0 bg-orange-200/50 rounded-full blur-3xl scale-75 pointer-events-none" />
                        <img
                            src={OrderSuccessImage}
                            alt="Order Success"
                            className="relative z-10 w-64 drop-shadow-2xl"
                        />
                    </div>

                    {/* Success card */}
                    <div className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-100/60 overflow-hidden">

                        {/* Header strip */}
                        <div className="bg-linear-to-r from-orange-500 to-amber-400 px-8 py-6">
                            <div className="text-4xl mb-2">🎉</div>
                            <h2 className="text-2xl font-black text-white tracking-tight">
                                Order Placed!
                            </h2>
                            <p className="text-orange-100 text-sm mt-1">
                                Your pizza is on its way
                            </p>
                        </div>

                        <div className="px-8 py-7 space-y-5">

                            <p className="text-gray-600 text-sm leading-relaxed">
                                Your order has been placed successfully. Our chefs are already
                                working on it — sit back and get ready for some delicious pizza! 🍕
                            </p>

                            {/* Steps */}
                            <div className="flex justify-between items-center gap-2 py-2">
                                {[
                                    { icon: "✅", label: "Order\nConfirmed" },
                                    { icon: "👨‍🍳", label: "Being\nPrepared" },
                                    { icon: "🛵", label: "On the\nWay" },
                                    { icon: "🏠", label: "Delivered" },
                                ].map(({ icon, label }, i, arr) => (
                                    <div key={label} className="flex items-center gap-1">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base border-2 ${
                                                i === 0
                                                    ? "bg-orange-500 border-orange-500 shadow shadow-orange-200"
                                                    : "bg-gray-50 border-gray-200"
                                            }`}>
                                                {icon}
                                            </div>
                                            <p className="text-[9px] font-bold text-gray-400 mt-1 text-center whitespace-pre-line leading-tight">
                                                {label}
                                            </p>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className={`h-0.5 w-5 mb-4 rounded-full ${
                                                i === 0 ? "bg-orange-300" : "bg-gray-200"
                                            }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-linear-to-r from-transparent via-orange-100 to-transparent" />

                            {/* CTA */}
                            <button
                                onClick={() => navigate("/")}
                                className="w-full py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-amber-400 text-white font-black text-sm tracking-wide shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                            >
                                🏠 Back to Home
                            </button>

                            <p className="text-xs text-gray-400">
                                Estimated delivery: <span className="font-bold text-orange-500">30 – 45 mins</span>
                            </p>

                        </div>
                    </div>

                </div>
            </section>
        </Layout>
    );
}
export default OrderSuccess;