import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {  } from "react-icons/fa";
import { FaArrowRight, FaCalendarDays } from 'react-icons/fa6';
import { GiSparkles } from "react-icons/gi";


const HeroSection = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "overlay",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />

                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
                <div
                    className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
                <div
                    className="absolute bottom-40 left-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl pt10 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="flex items-center justify-center  px-4 py-2 mb-6 bg-white/20   border-white/30 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                    <GiSparkles  className="w-4 h-4 mr-2" />
                    Welcome to the Future of Events
                </div>

                <h1 className="text-6xl font-serif md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    EventHub
                </h1>

                <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-blue-100">
                    Discover extraordinary experiences, create unforgettable moments, and connect with your community like never
                    before.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {user ? (
                        <>
                            <Link to="/events">
                                <button className="inline-flex items-center px-11 py-4 bg-white text-blue-600 hover:bg-blue-50 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200">
                                    <FaCalendarDays className="w-5 h-5 mr-2" />
                                    Browse Events
                                    <FaArrowRight className="w-5 h-5 ml-2" />
                                </button>
                            </Link>
                            <Link to="/add-event">
                                <button
                                    onClick={() => navigate("add-event")}
                                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg font-semibold rounded-full backdrop-blur-sm bg-transparent transition-all duration-200"
                                >
                                    Create Event
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register">
                                <button
                                    onClick={() => navigate("register")}
                                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
                                >
                                    Get Started Free
                                    <FaArrowRight className="w-5 h-5 ml-2" />
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg font-semibold rounded-full backdrop-blur-sm bg-transparent transition-all duration-200">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white">10K+</div>
                        <div className="text-blue-200">Events Created</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white">50K+</div>
                        <div className="text-blue-200">Happy Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white">100+</div>
                        <div className="text-blue-200">Cities</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;