
import { Link } from "react-router-dom"
import {
    FaTwitter, FaFacebookF, FaInstagram,  FaLinkedinIn,  FaYoutube,  FaEnvelope, FaPhone, FaLocationDot,FaArrowRight,FaGem,FaCrown,FaStar,FaHeart,FaCalendarDays,FaUsers,FaShield,FaAward,FaHandSparkles,
} from "react-icons/fa6"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        platform: [
            { name: "Browse Events", href: "/events" },
            { name: "Create Event", href: "/create" },
            { name: "Event Planning", href: "/planning" },
            { name: "Venue Booking", href: "/venues" },
            { name: "Premium Services", href: "/premium" },
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Our Story", href: "/story" },
            { name: "Leadership Team", href: "/team" },
            { name: "Careers", href: "/careers" },
            { name: "Press & Media", href: "/press" },
        ],
        support: [
            { name: "Help Center", href: "/help" },
            { name: "Contact Support", href: "/support" },
            { name: "Event Guidelines", href: "/guidelines" },
            { name: "Safety & Security", href: "/safety" },
            { name: "Community Forum", href: "/forum" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
            { name: "Refund Policy", href: "/refunds" },
            { name: "Accessibility", href: "/accessibility" },
        ],
    }

    const socialLinks = [
        { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
        { icon: FaFacebookF, href: "#", label: "Facebook", color: "hover:text-blue-600" },
        { icon: FaInstagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
        { icon: FaLinkedinIn, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
        { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:text-red-500" },
    ]

    const features = [
        { icon: FaCalendarDays, text: "Premium Event Management" },
        { icon: FaUsers, text: "Global Community Network" },
        { icon: FaShield, text: "Secure & Trusted Platform" },
        { icon: FaAward, text: "Award-Winning Service" },
    ]

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                />

                {/* Floating particles */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60" />
                <div
                    className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-60"
                    style={{ animationDelay: "1s" }}
                />
                <div
                    className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-pink-400 rounded-full animate-ping opacity-60"
                    style={{ animationDelay: "0.5s" }}
                />

                {/* Luxury texture overlay */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="relative z-10">
                <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
                    {/* Pulsing blobs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
                        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite] delay-2000" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite] delay-1000" />

                        {/* Floating particles */}
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-40" />
                        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-[ping_3s_ease-in-out_infinite] delay-1000 opacity-40" />
                        <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-pink-400 rounded-full animate-[ping_3s_ease-in-out_infinite] delay-500 opacity-40" />
                    </div>

                    <div className="relative z-10">
                        {/* Newsletter */}
                        <div className="border-b border-white/10">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-6 shadow-xl">
                                        <FaHandSparkles className="w-4 h-4 mr-2 text-blue-300 animate-[pulse_3s_ease-in-out_infinite]" />
                                        <span className="text-white">Stay Connected</span>
                                        <FaGem className="w-4 h-4 ml-2 text-purple-300 animate-[pulse_3s_ease-in-out_infinite]" />
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                                        Never Miss an Event
                                    </h2>

                                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-light">
                                        Subscribe to our premium newsletter for exclusive luxury access.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                                        <div className="relative flex-1 w-full group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-300">
                                                <div className="flex items-center p-4">
                                                    <FaEnvelope className="w-5 h-5 text-blue-300 mr-3" />
                                                    <input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        className="flex-1 bg-transparent text-white placeholder-blue-200 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <span className="relative flex items-center">
                                                Subscribe
                                                <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <p className="text-blue-100 font-medium text-sm">{feature.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-white/10">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <div className="flex flex-col md:flex-row justify-between items-center">
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <p className="text-blue-200 text-sm font-light">© {currentYear} EventHub. All rights reserved.</p>

                                    </div>

                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center text-blue-200 text-sm">
                                            <FaStar className="w-4 h-4 text-yellow-400 mr-2" />
                                            <span>Trusted by 50K+ users</span>
                                        </div>
                                        <div className="flex items-center text-blue-200 text-sm">
                                            <FaAward className="w-4 h-4 text-purple-400 mr-2" />
                                            <span>Award-winning platform</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>





            </div>
        </footer>
    )
}

export default Footer
