"use client";
import React, { useState, useEffect } from 'react';
import {
    Sun,
    Moon,
    Bell,
    Wallet,
    User,
    Settings,
    LogOut,
    Activity,
    ChevronDown,
    Home
} from 'lucide-react';

const Header = ({ isOpen, setIsOpen }) => {
    const [isDark, setIsDark] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (isDark) {
            root.classList.add('dark');
            body.className = 'bg-gray-900 text-white transition-colors duration-500';
            root.style.setProperty('--background', '#0a0a0a');
            root.style.setProperty('--foreground', '#ededed');
        } else {
            root.classList.remove('dark');
            body.className = 'bg-white text-gray-900 transition-colors duration-500';
            root.style.setProperty('--background', '#ffffff');
            root.style.setProperty('--foreground', '#171717');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const connectWallet = () => {
        setIsWalletConnected(!isWalletConnected);
    };

    return (
        <div>
            <div className={`fixed top-0 left-0 right-0 z-40 p-3 !pl-19 transition-all duration-500  ${isDark ? 'bg-gray-900/20' : 'bg-white/20'}${isOpen ? 'left-72' : 'left-20'}`}>
                <div
                    className={`
                    relative ml-auto mr-20 max-w-6xl h-14 
                    backdrop-blur-3xl backdrop-saturate-200
                    ${isDark
                            ? 'bg-gray-800/40 border-gray-700/50 shadow-xl shadow-black/50'
                            : 'bg-white/60 border-gray-200/50 shadow-xl shadow-gray-900/20'
                        }
                    border rounded-2xl
                    transition-all duration-700 ease-out
                    overflow-hidden
                    before:absolute before:inset-0 before:rounded-2xl before:p-[1px]
                    before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
                    before:mask-composite-subtract before:transition-opacity before:duration-300
                    hover:before:opacity-100
                `}
                >
                    <div className="relative flex items-center justify-between px-6 h-full">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            {/* <div className={`
                            w-8 h-8 rounded-xl flex items-center justify-center
                            ${isDark ? 'bg-gray-700/60' : 'bg-gray-100/60'}
                            backdrop-blur-sm
                            transition-all duration-500 ease-out
                            hover:scale-110 
                            cursor-pointer
                            group
                            relative
                            overflow-hidden
                        `}>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Activity className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'} transition-all duration-300 group-hover:text-blue-400 relative z-10`} />
                        </div> */}
                            <h1 className={`
                            text-lg font-bold bg-gradient-to-r 
                            ${isDark
                                    ? 'from-white via-blue-100 to-gray-300'
                                    : 'from-gray-900 via-gray-800 to-gray-600'
                                }
                            bg-clip-text text-transparent
                            transition-all duration-500
                        `}>
                                AgentX
                            </h1>
                        </div>

                        {/* Navigation Icons */}
                        <div className="flex items-center space-x-2">
                            {/* Home Button */}
                            <button
                                className={`
                                relative flex items-center overflow-hidden cursor-pointer
                                h-10 rounded-xl transition-all duration-700 ease-out
                                group w-10 hover:w-auto hover:px-4
                                transform hover:scale-105 active:scale-95
                                hover:shadow-2xl hover:shadow-blue-500/25
                                ${isDark ? 'hover:shadow-blue-400/20' : 'hover:shadow-blue-600/20'}
                            `}
                            >
                                {/* Liquid Glass Background */}
                                <div className={`
                                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                                transition-all duration-700 ease-out
                                ${isDark
                                        ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent'
                                        : 'bg-gradient-to-br from-white/40 via-white/20 to-transparent'
                                    }
                                backdrop-blur-xl
                                before:absolute before:inset-[1px] before:rounded-xl
                                before:bg-gradient-to-br before:from-white/20 before:to-transparent
                                before:opacity-50
                            `} />

                                {/* Animated shimmer effect */}
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                </div>

                                <div className="relative z-10 flex items-center transition-all duration-500">
                                    <Home className={`
                                    w-4 h-4 transition-all duration-500 ease-out
                                    ${isDark ? 'text-white' : 'text-gray-900'}
                                    group-hover:text-blue-800 group-hover:scale-110
                                     group-hover:drop-shadow-lg
                                `} />
                                    <span className={`
                                    ml-3 text-sm font-medium whitespace-nowrap
                                    ${isDark ? 'text-white' : 'text-gray-900'}
                                    opacity-0 group-hover:opacity-100
                                    transform translate-x-2 group-hover:translate-x-0
                                    transition-all duration-500 ease-out
                                    group-hover:text-blue-400
                                `}>
                                        Home
                                    </span>
                                </div>
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`
                                relative flex items-center overflow-hidden cursor-pointer
                                h-10 rounded-xl transition-all duration-700 ease-out
                                group w-10 hover:w-auto hover:px-4
                                transform hover:scale-105 active:scale-95
                                hover:shadow-2xl hover:shadow-amber-500/25
                                ${isDark ? 'hover:shadow-amber-400/20' : 'hover:shadow-indigo-600/20'}
                            `}
                            >
                                {/* Liquid Glass Background */}
                                <div className={`
                                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                                transition-all duration-700 ease-out
                                ${isDark
                                        ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent'
                                        : 'bg-gradient-to-br from-white/40 via-white/20 to-transparent'
                                    }
                                backdrop-blur-xl
                                before:absolute before:inset-[1px] before:rounded-xl
                                before:bg-gradient-to-br before:from-white/20 before:to-transparent
                                before:opacity-50
                            `} />

                                {/* Animated shimmer effect */}
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                </div>

                                <div className="relative z-10 flex items-center transition-all duration-500">
                                    {isDark ? (
                                        <Sun className={`
                                        w-4 h-4 transition-all duration-500 ease-out
                                        group-hover:text-amber-700
                                        group-hover:scale-110 group-hover:rotate-180
                                        group-hover:drop-shadow-lg filter
                                    `} />
                                    ) : (
                                        <Moon className={`
                                        w-4 h-4 transition-all duration-500 ease-out
                                        group-hover:text-indigo-700
                                        group-hover:scale-110 group-hover:rotate-12
                                        group-hover:drop-shadow-lg filter
                                    `} />
                                    )}
                                    <span className={`
                                    ml-3 text-sm font-medium whitespace-nowrap
                                    ${isDark ? 'text-white' : 'text-gray-900'}
                                    opacity-0 group-hover:opacity-100
                                    transform translate-x-2 group-hover:translate-x-0
                                    transition-all duration-500 ease-out
                                    ${isDark ? 'group-hover:text-amber-300' : 'group-hover:text-indigo-400'}
                                `}>
                                        {isDark ? 'Light Mode' : 'Dark Mode'}
                                    </span>
                                </div>
                            </button>

                            {/* Wallet Connect */}
                            <button
                                onClick={connectWallet}
                                className={`
                                relative flex items-center overflow-hidden cursor-pointer
                                h-10 rounded-xl transition-all duration-700 ease-out
                                group w-10 hover:w-auto hover:px-4
                                transform hover:scale-105 active:scale-95
                                hover:shadow-2xl hover:shadow-emerald-500/25
                                ${isDark ? 'hover:shadow-emerald-400/20' : 'hover:shadow-emerald-600/20'}
                            `}
                            >
                                {/* Liquid Glass Background */}
                                <div className={`
                                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                                transition-all duration-700 ease-out
                                ${isDark
                                        ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent'
                                        : 'bg-gradient-to-br from-white/40 via-white/20 to-transparent'
                                    }
                                backdrop-blur-xl
                                before:absolute before:inset-[1px] before:rounded-xl
                                before:bg-gradient-to-br before:from-white/20 before:to-transparent
                                before:opacity-50
                            `} />

                                {/* Animated shimmer effect */}
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                </div>

                                <div className="relative z-10 flex items-center transition-all duration-500">
                                    <Wallet className={`
                                    w-4 h-4 transition-all duration-500 ease-out
                                    ${isWalletConnected ? 'text-emerald-400' : (isDark ? 'text-white' : 'text-gray-900')}
                                    group-hover:text-emerald-800 group-hover:scale-110
                                   group-hover:drop-shadow-lg
                                    ${isWalletConnected ? 'animate-pulse' : ''}
                                `} />
                                    <span className={`
                                    ml-3 text-sm font-medium whitespace-nowrap
                                    ${isWalletConnected ? 'text-emerald-400' : (isDark ? 'text-white' : 'text-gray-900')}
                                    opacity-0 group-hover:opacity-100
                                    transform translate-x-2 group-hover:translate-x-0
                                    transition-all duration-500 ease-out
                                    group-hover:text-emerald-400
                                `}>
                                        {isWalletConnected ? 'Connected' : 'Connect Wallet'}
                                    </span>
                                </div>

                                {/* Connection indicator */}
                                {isWalletConnected && (
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full z-20">
                                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping" />
                                    </div>
                                )}
                            </button>

                            {/* Notifications */}
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className={`
                                relative flex items-center overflow-hidden cursor-pointer
                                h-10 rounded-xl transition-all duration-700 ease-out
                                group w-10 hover:w-auto hover:px-4
                                transform hover:scale-105 active:scale-95
                                hover:shadow-2xl hover:shadow-purple-500/25
                                ${isDark ? 'hover:shadow-purple-400/20' : 'hover:shadow-purple-600/20'}
                            `}
                            >
                                {/* Liquid Glass Background */}
                                <div className={`
                                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                                transition-all duration-700 ease-out
                                ${isDark
                                        ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent'
                                        : 'bg-gradient-to-br from-white/40 via-white/20 to-transparent'
                                    }
                                backdrop-blur-xl
                                before:absolute before:inset-[1px] before:rounded-xl
                                before:bg-gradient-to-br before:from-white/20 before:to-transparent
                                before:opacity-50
                            `} />

                                {/* Animated shimmer effect */}
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                </div>

                                <div className="relative z-10 flex items-center transition-all duration-500">
                                    <Bell className={`
                                    w-4 h-4 transition-all duration-500 ease-out
                                    ${isDark ? 'text-white' : 'text-gray-900'}
                                    group-hover:text-purple-800 group-hover:scale-110
                                     group-hover:drop-shadow-lg
                                `} />
                                    <span className={`
                                    ml-3 text-sm font-medium whitespace-nowrap
                                    ${isDark ? 'text-white' : 'text-gray-900'}
                                    opacity-0 group-hover:opacity-100
                                    transform translate-x-2 group-hover:translate-x-0
                                    transition-all duration-500 ease-out
                                    group-hover:text-purple-400
                                `}>
                                        Notifications
                                    </span>
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`
                                    relative flex items-center overflow-hidden cursor-pointer
                                    h-10 rounded-xl transition-all duration-700 ease-out
                                    group w-10 hover:w-auto hover:px-4
                                    transform hover:scale-105 active:scale-95
                                    hover:shadow-2xl hover:shadow-pink-500/25
                                    ${isDark ? 'hover:shadow-pink-400/20' : 'hover:shadow-pink-600/20'}
                                `}
                                >
                                    {/* Liquid Glass Background */}
                                    <div className={`
                                    absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                                    transition-all duration-700 ease-out
                                    ${isDark
                                            ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent'
                                            : 'bg-gradient-to-br from-white/40 via-white/20 to-transparent'
                                        }
                                    backdrop-blur-xl
                                    before:absolute before:inset-[1px] before:rounded-xl
                                    before:bg-gradient-to-br before:from-white/20 before:to-transparent
                                    before:opacity-50
                                `} />

                                    {/* Animated shimmer effect */}
                                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                    </div>

                                    <div className="relative z-10 flex items-center transition-all duration-500">
                                        <User className={`
                                        w-4 h-4 transition-all duration-500 ease-out
                                        ${isDark ? 'text-white' : 'text-gray-900'}
                                        group-hover:text-pink-800 group-hover:scale-110
                                        group-hover:drop-shadow-lg
                                    `} />
                                        <span className={`
                                        ml-3 text-sm font-medium whitespace-nowrap
                                        ${isDark ? 'text-white' : 'text-gray-900'}
                                        opacity-0 group-hover:opacity-100
                                        transform translate-x-2 group-hover:translate-x-0
                                        transition-all duration-500 ease-out
                                        group-hover:text-pink-400
                                    `}>
                                            Profile
                                        </span>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <div className={`
                                    absolute top-full right-0 mt-2 w-48
                                    ${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}
                                    backdrop-blur-3xl border
                                    rounded-2xl shadow-2xl
                                    transition-all duration-300 ease-out
                                    overflow-hidden
                                    scale-95 animate-in zoom-in-95 slide-in-from-top-2
                                `}>
                                        <div className="p-2">
                                            <button className={`
                                            w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                                            ${isDark ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100/60'}
                                            transition-all duration-300
                                            group
                                        `}>
                                                <Settings className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:rotate-90 transition-transform duration-300`} />
                                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</span>
                                            </button>
                                            <button className={`
                                            w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                                            hover:bg-red-500/20
                                            transition-all duration-300
                                            group
                                        `}>
                                                <LogOut className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform duration-300" />
                                                <span className="text-sm font-medium text-red-400">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Liquid glass bottom highlight */}
                    <div className={`
                    absolute bottom-0 left-0 right-0 h-px
                    bg-gradient-to-r from-transparent via-blue-400/50 to-transparent
                    opacity-60
                `} />
                </div>
            </div>
        </div>
    );
};

export default Header;