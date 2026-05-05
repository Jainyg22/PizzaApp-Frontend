import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import Pizzalogo from '../assets/Images/pizza1.png';
import CartIcon from '../assets/Images/cart.svg';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/AuthSlice';
import { useEffect } from 'react';
import { getCartDetails } from '../Redux/Slices/CartSlice';

// eslint-disable-next-line react/prop-types
function Layout({ children, onScrollToMenu, onScrollToServices, onScrollToAbout }) {

    const { isLoggedIn, role } = useSelector((state) => state.auth);
    const { cartsData } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();
        dispatch(logout());
    }

    async function fetchCartDetails() {
        const res = await dispatch(getCartDetails());
        console.log("cart details", res);
        if (res?.payload?.isUnauthorized) {
            console.log("unauthorized");
            dispatch(logout());
        }
    }

    useEffect(() => {
        console.log(typeof (isLoggedIn));
        if (isLoggedIn) {
            fetchCartDetails();
        }
    }, []);

    // Bookmark scroll: if on home page use callback, else navigate home with hash
    function handleBookmark(section, callback) {
        if (callback) {
            callback();
        } else {
            navigate(`/#${section}`);
        }
    }

    const cartCount = cartsData?.items?.length ?? 0;

    return (
        <div className="flex flex-col min-h-screen bg-amber-50">

            {/* ── Main Navbar ── */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm md:px-10">

                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <img
                        src={Pizzalogo}
                        alt="Pizza logo"
                        className="w-9 h-9 drop-shadow-sm group-hover:rotate-12 transition-transform duration-300"
                    />
                    <span className="font-black text-lg tracking-tight text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-400">
                        Pizza App
                    </span>
                </div>

                {/* Centre — bookmark nav (desktop only) */}
                <div className="hidden md:flex items-center gap-1">
                    {[
                        { label: "Menu",     icon: "🍕", section: "menu",     cb: onScrollToMenu     },
                        { label: "Services", icon: "⭐", section: "services", cb: onScrollToServices },
                        { label: "About",    icon: "📍", section: "about",    cb: onScrollToAbout    },
                    ].map(({ label, icon, section, cb }) => (
                        <button
                            key={label}
                            onClick={() => handleBookmark(section, cb)}
                            className="relative flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                        >
                            <span className="text-sm">{icon}</span>
                            {label}
                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-orange-400 rounded-full group-hover:w-3/4 transition-all duration-300" />
                        </button>
                    ))}
                </div>

                {/* Right — auth + cart */}
                <div className="flex items-center gap-3">

                    {isLoggedIn && role === "ADMIN" && (
                        <Link
                            to="/admin/addProduct"
                            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wide uppercase rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-all duration-200"
                        >
                            ＋ Add Product
                        </Link>
                    )}

                    {isLoggedIn && (
                        <Link to="/cart" className="relative flex items-center gap-1 group">
                            <div className="relative">
                                <img
                                    src={CartIcon}
                                    className="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
                                    alt="Cart"
                                />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-black text-white bg-orange-500 rounded-full shadow">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    )}

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wide uppercase text-white rounded-xl bg-linear-to-r from-orange-500 to-amber-400 shadow shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wide uppercase text-white rounded-xl bg-linear-to-r from-orange-500 to-amber-400 shadow shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            {/* ── Mobile bookmark bar ── */}
            <div className="flex md:hidden justify-center border-b border-orange-100 bg-white/80 backdrop-blur-sm">
                {[
                    { label: "Menu",     icon: "🍕", section: "menu",     cb: onScrollToMenu     },
                    { label: "Services", icon: "⭐", section: "services", cb: onScrollToServices },
                    { label: "About",    icon: "📍", section: "about",    cb: onScrollToAbout    },
                ].map(({ label, icon, section, cb }, i, arr) => (
                    <button
                        key={label}
                        onClick={() => handleBookmark(section, cb)}
                        className={`relative flex items-center gap-1 px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200 group ${i < arr.length - 1 ? "border-r border-orange-100" : ""}`}
                    >
                        <span>{icon}</span>
                        {label}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-orange-400 rounded-full group-hover:w-3/4 transition-all duration-300" />
                    </button>
                ))}
            </div>

            {/* ── Page content ── */}
            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default Layout;
