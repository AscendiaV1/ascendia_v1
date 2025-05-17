import { Button } from './components/ui/button';
import { Users } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { PHProvider } from './provider.jsx';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/v1/user");
                setUser(response.data);
            } catch {
                setUser(null);
            }
        };

        fetchUser();
    }, []);
    useEffect(() => {
        if (user && (location.pathname === "/login" || location.pathname === "/register")) {
            navigate("/mentor-search");
        }
    }, [user, location.pathname]);


    const handleLogout = async () => {
        try {
            await axios.post("/logout");
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error.response.data);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link to="/">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-900">Ascendia</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/how-it-works" className="text-blue-900 hover:text-blue-700">How it Works</Link>
                    <Link to="/mentor-search" className="text-blue-900 hover:text-blue-700">Find a Mentor</Link>
                    {!user && <Link to="/register" className="text-blue-900 hover:text-blue-700">Become a Mentor</Link>}
                    {user && <Link to="/purchased-sessions" className="text-blue-900 hover:text-blue-700">Your Sessions</Link>}
                    {(user && user.is_mentor) && <Link to="/mentor-client-management" className="text-blue-900 hover:text-blue-700">Client Management</Link>}
                    {(user && user.is_administrator) && <Link to="/users-settings" className="text-blue-900 hover:text-blue-700">Users Settings</Link>}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-blue-900 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Authentication Buttons */}
                <div className="hidden md:flex">
                    {user ? (
                        <>
                            <Button className="bg-green-500 hover:bg-green-600 text-white mx-2">
                                <Link to="/account-settings">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</Link>
                            </Button>
                            <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className="bg-green-500 hover:bg-green-600 text-white mx-2">
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Link to="/register">Sign Up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white shadow-lg">
                    <ul className="space-y-4 p-4">
                        <li><Link to="/how-it-works" className="text-blue-900 hover:text-blue-700">How it Works</Link></li>
                        <li><Link to="/mentor-search" className="text-blue-900 hover:text-blue-700">Find a Mentor</Link></li>
                        {!user && <li><Link to="/register" className="text-blue-900 hover:text-blue-700">Become a Mentor</Link></li>}
                        {user && <li><Link to="/purchased-sessions" className="text-blue-900 hover:text-blue-700">Your Sessions</Link></li>}
                        {(user && user.is_mentor) && <li><Link to="/mentor-client-management" className="text-blue-900 hover:text-blue-700">Client Management</Link></li>}
                        {(user && user.is_administrator) && <li><Link to="/users-settings" className="text-blue-900 hover:text-blue-700">Users Settings</Link></li>}
                        <li>
                            {user ? (
                                <div className="flex space-x-2">
                                    <Button className="bg-green-500 hover:bg-green-600 texxt-white w-full mb-2">
                                        <Link to="/account-settings">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</Link>
                                    </Button>
                                    <Button className="bg-red-500 hover:bg-red-600 texxt-white w-full" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>

                            ) : (
                                <div className="flex space-x-2">
                                    <Button className="bg-green-500 hover:bg-green-600 text-white w-full">
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                                        <Link to="/register">Sign Up</Link>
                                    </Button>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            )}

            <main style={{ minHeight: "80vh" }}>
                <PHProvider>
                    <Outlet />
                </PHProvider>
            </main>

            <footer className="bg-blue-900 text-white py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <Link to="/" >
                            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                                <Users className="h-8 w-8" />
                                <span className="text-2xl font-bold">Ascendia</span>
                            </div>
                        </Link>
                        <nav className="flex flex-wrap justify-center space-x-6">
                            <Link to="/about-us" className="hover:text-blue-300">About Us</Link>
                            <Link to="/terms-of-service" className="hover:text-blue-300">Terms of Service</Link>
                            <Link to="/privacy-policy" className="hover:text-blue-300">Privacy Policy</Link>
                            <Link to="/contact" className="hover:text-blue-300">Contact</Link>
                        </nav>
                    </div>
                    <div className="mt-8 text-center text-blue-300">
                        © 2024 Ascendia. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
