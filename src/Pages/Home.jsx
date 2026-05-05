import IconArrowRight from "../Components/Icons/ArrowRight";
import PizzaImage from '../assets/Images/pizza2.png';
import CookingImage from '../assets/Images/cooking1.png';
import MapImage from '../assets/Images/map.jpeg';
import IconPatchCheck from "../Components/Icons/IconPatchCheck";
import OrderFood from '../assets/Images/orderFood.png';
import Pickup from '../assets/Images/pickup.png';
import Enjoy from '../assets/Images/enjoy.png';
import Layout from "../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getAllProducts } from "../Redux/Slices/ProductSlice";
import { Link } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const { productsData } = useSelector((state) => state.product);

    const menuRef     = useRef(null);
    const servicesRef = useRef(null);
    const aboutRef    = useRef(null);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const scrollTo = (ref) =>
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    return (
        <Layout
            onScrollToMenu={() => scrollTo(menuRef)}
            onScrollToServices={() => scrollTo(servicesRef)}
            onScrollToAbout={() => scrollTo(aboutRef)}    
        >
            <div className="bg-amber-50 min-h-screen">

                {/* ── Hero section ── */}
                <section className="relative flex flex-col-reverse items-center justify-center gap-8 px-6 py-16 overflow-hidden bg-linear-to-br from-amber-50 via-orange-100 to-orange-300 md:flex-row md:gap-16 md:px-20 md:py-24">
                    <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />

                    <div className="relative z-10 text-center md:text-left md:max-w-md">
                        <div className="flex items-center justify-center gap-3 md:justify-start">
                            <h1 className="text-5xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-400 md:text-6xl">
                                Enjoy the Slice 
                            </h1>
                                        
                            <span className="text-5xl">😋</span>
                        </div>

                        <p className="mt-5 mb-8 text-base leading-relaxed text-gray-500 md:text-lg">
                            The Pizza App lets you order your favorite pizza from the comfort of your home.
                            Enjoy the best pizza in town with just a few clicks.
                        </p>

                        <a href="/#menu" className="inline-flex items-center gap-3 px-7 py-3.5 text-white font-semibold rounded-full bg-linear-to-r from-orange-500 to-amber-400 shadow-lg shadow-orange-300/50 hover:shadow-orange-400/60 hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 group">
                            Order Now
                            <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                                <IconArrowRight />
                            </span>
                        </a>
                    </div>

                    <div className="relative z-10 animate-bounce" style={{ animationDuration: "3s" }}>
                        <img src={PizzaImage} alt="Pizza" className="w-64 drop-shadow-2xl md:w-96" />
                    </div>
                </section>

                {/* ── Services section ── */}
                <section id="services" ref={servicesRef} className="px-6 py-20 bg-linear-to-br from-amber-50 to-orange-100 md:px-20">
                    <div className="flex flex-col gap-14 max-w-6xl mx-auto lg:flex-row lg:items-center">

                        <div className="flex justify-center lg:w-1/2">
                            <img src={CookingImage} alt="Cooking" className="w-full max-w-sm rounded-2xl shadow-xl shadow-orange-200/60 lg:max-w-md" />
                        </div>

                        <div className="flex flex-col lg:w-1/2">
                            <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3">Why choose us</span>
                            <h2 className="text-4xl font-black leading-tight text-transparent bg-clip-text bg-linear-to-r from-orange-700 to-orange-400 mb-3 md:text-5xl">
                                Cooked by the best <br /> chefs in the world
                            </h2>
                            <p className="text-gray-500 mb-6">
                                There are many benefits regarding to that but the main ones are:
                            </p>

                            <div className="flex flex-col gap-3 mb-8">
                                {["Perfect taste", "Prepared quickly", "Food hygeine guaranteed"].map((text) => (
                                    <div key={text} className="flex items-center gap-3 px-4 py-3 bg-white/70 border border-orange-100 rounded-xl hover:bg-white transition-colors duration-200">
                                        <IconPatchCheck className="text-orange-400 w-6 h-6 shrink-0" />
                                        <span className="font-bold text-orange-900">{text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center mb-8">
                                <div className="h-1 w-16 rounded-full bg-linear-to-r from-orange-400 to-amber-300" />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                {[
                                    { img: OrderFood, title: "Order Food",  desc: "As easy as 1, 2, 3. Just select your favorite pizza and place your order." },
                                    { img: Pickup,    title: "Pickup Food", desc: "Pick up your order from the nearest store or get it delivered to your doorstep." },
                                    { img: Enjoy,     title: "Enjoy Food",  desc: "As soon as you get your order, enjoy the delicious pizza with your loved ones." },
                                ].map(({ img, title, desc }) => (
                                    <div key={title} className="flex flex-col items-center text-center p-5 bg-white/80 border border-orange-100 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex-1 min-w-28 max-w-44">
                                        <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-orange-100 flex items-center justify-center mb-4">
                                            <img src={img} alt={title} className="w-10 h-10 object-contain" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── About ── */}
                <section id="about" ref={aboutRef} className="px-6 py-20 bg-linear-to-br from-orange-100 to-amber-200 md:px-20">
                    <div className="flex flex-col gap-12 max-w-6xl mx-auto md:flex-row md:items-center">

                        <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-orange-200/50 md:flex-1">
                            <img src={MapImage} alt="Map Image" className="w-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 mb-1">ADDRESS 📍</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        My Pizza app store, Sec-36, New Delhi<br />Near my home
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 mb-1">📩 EMAIL</h3>
                                    <p className="text-xs text-orange-500 font-medium">pizza@email.com</p>
                                    <h3 className="text-sm font-bold text-gray-800 mt-2 mb-1">📞 PHONE</h3>
                                    <p className="text-xs text-gray-500">999-456-7890</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:flex-1 md:px-6">
                            <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">Our Story</span>
                            <h1 className="text-4xl font-black text-gray-900 mb-6">About</h1>
                            <p className="text-gray-600 leading-relaxed text-justify">
                                At Pizza App, we are passionate about crafting
                                exceptional pizzas that bring joy to every bite. Our
                                journey began with a commitment to using the freshest,
                                high-quality ingredients, combined with authentic
                                recipes passed down through generations. Whether you're
                                craving a classic Margherita or an adventurous specialty
                                pizza, each creation is made with care and attention to
                                detail. Join us in celebrating the art of pizza-making
                                and indulge in flavors that will leave you wanting more.
                                Welcome to the world of Pizza App, where every pizza
                                tells a delicious story.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Menu / Products ── */}
                <section id="menu" ref={menuRef} className="px-6 py-20 bg-amber-50 md:px-20">
                    <div className="text-center mb-14">
                        <span className="text-xs font-bold tracking-widest uppercase text-orange-500 block mb-2">Fresh & Hot</span>
                        <h2 className="text-4xl font-black text-gray-900">Our Menu</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {productsData?.map((item) =>
                            item.inStock && (
                                <div className="w-66" key={item._id}>
                                    <Link to={`/product/${item._id}`}>
                                        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300 group">
                                            <div className="overflow-hidden h-48">
                                                <img
                                                    src={item.productImage}
                                                    alt="Pizza Image"
                                                    className="object-cover object-center w-full h-full group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-1">
                                                    {item.category}
                                                </p>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                                                    {item.productName}
                                                </h3>
                                                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                                                    {item.description}
                                                </p>
                                                <p className="text-xl font-black text-orange-600">
                                                    ₹{item.price}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </section>

            </div>
        </Layout>
    );
}

export default Home;