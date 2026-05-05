function Footer() {
    return (
        <footer className="bg-linear-to-br from-gray-900 to-gray-800 text-gray-400">

            {/* Main footer content */}
            <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 md:px-10">

                {/* Brand */}
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl">🍕</span>
                        <span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-300">
                            Pizza App
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-500">
                        Crafting exceptional pizzas with the freshest ingredients. 
                        Delivered hot to your doorstep in 30–45 minutes.
                    </p>
                    {/* Social icons */}
                    <div className="flex items-center gap-3 mt-5">
                        <a target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-orange-500 flex items-center justify-center transition-colors duration-200 group cursor-pointer">
                            <svg fill="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-white" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                            </svg>
                        </a>
                        <a className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-orange-500 flex items-center justify-center transition-colors duration-200 group cursor-pointer">
                            <svg fill="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-white" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                            </svg>
                        </a>
                        <a className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-orange-500 flex items-center justify-center transition-colors duration-200 group cursor-pointer">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-gray-400 group-hover:text-white" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-gray-300 mb-4">Quick Links</h3>
                    <ul className="space-y-2.5 text-sm">
                        {[
                            { label: "Home",     href: "/" },
                            { label: "Menu",     href: "/#menu" },
                            { label: "Services", href: "/#services" },
                            { label: "About",    href: "/#about" },
                        ].map(({ label, href }) => (
                            <li key={label}>
                                <a href={href} className="hover:text-orange-400 transition-colors duration-150 flex items-center gap-1.5 group">
                                    <span className="w-1 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-gray-300 mb-4">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2.5">
                            <span className="mt-0.5">📍</span>
                            <span className="text-gray-500 leading-relaxed">My Pizza App Store<br />Sec-36, New Delhi – 110001</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <span>📞</span>
                            <a href="tel:9994567890" className="text-gray-500 hover:text-orange-400 transition-colors duration-150">
                                999-456-7890
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <span>📩</span>
                            <a href="mailto:pizza@email.com" className="text-gray-500 hover:text-orange-400 transition-colors duration-150">
                                pizza@email.com
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Hours */}
                <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-gray-300 mb-4">Opening Hours</h3>
                    <ul className="space-y-2.5 text-sm">
                        {[
                            { day: "Mon – Fri", time: "10:00 AM – 11:00 PM" },
                            { day: "Saturday",  time: "10:00 AM – 11:30 PM" },
                            { day: "Sunday",    time: "11:00 AM – 10:00 PM" },
                        ].map(({ day, time }) => (
                            <li key={day} className="flex justify-between gap-4">
                                <span className="text-gray-400 font-medium">{day}</span>
                                <span className="text-gray-500 text-right">{time}</span>
                            </li>
                        ))}
                        <li className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-900/40 border border-green-700/40 text-green-400 text-xs font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Open Now
                        </li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700/60" />

            {/* Bottom bar */}
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 md:px-10">
                <p className="text-xs text-gray-600">
                    &copy; 2026 Pizza App. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="hover:text-orange-400 cursor-pointer transition-colors duration-150">Privacy Policy</span>
                    <span className="text-gray-700">·</span>
                    <span className="hover:text-orange-400 cursor-pointer transition-colors duration-150">Terms of Service</span>
                    <span className="text-gray-700">·</span>
                    <span className="text-gray-600">Made with ❤️ & 🍕</span>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
