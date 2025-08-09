"use client";
import React, { useState, useEffect } from 'react';
import { IndentIncrease, IndentDecrease, Plus, Search, Library, Wallet, MessageCircle, Crown, Settings, Activity } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const [isDark, setIsDark] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const pathname = usePathname();
    const [chats, setChats] = useState([
        { id: 1, title: 'Trading Strategy Discussion', lastMessage: 'How to optimize DeFi yields...', timestamp: '2h ago' },
        { id: 2, title: 'NFT Market Analysis', lastMessage: 'The current trends show...', timestamp: '1d ago' },
        { id: 3, title: 'Crypto Portfolio Review', lastMessage: 'Let\'s analyze your holdings...', timestamp: '3d ago' },
        { id: 4, title: 'Smart Contract Audit', lastMessage: 'Found potential issues in...', timestamp: '1w ago' },
        { id: 5, title: 'Yield Farming Guide', lastMessage: 'Best practices for farming...', timestamp: '2w ago' },
    ]);

    useEffect(() => {
        const observer = new MutationObserver(() => setIsDark(document.documentElement.classList.contains('dark')));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        setIsDark(document.documentElement.classList.contains('dark'));
        return () => observer.disconnect();
    }, []);

    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const createNewChat = () => {
        const newChat = { id: chats.length + 1, title: `New Chat ${chats.length + 1}`, lastMessage: 'Start a new conversation...', timestamp: 'now' };
        setChats([newChat, ...chats]);
    };

    const handleWalletClick = () => {
        // Add wallet connection logic here
        setIsWalletConnected(!isWalletConnected);
        console.log('Wallet clicked, connected:', !isWalletConnected);
    };

    const baseButtonClass = `w-full flex items-center rounded-xl transition-all duration-300 group cursor-pointer ${isOpen ? 'justify-start p-3 space-x-3' : 'justify-center py-3'} ${isDark ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100/60'}`;
    const textClass = `text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`;
    const iconClass = `w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`;

    const NavButton = ({ icon: Icon, label, hoverColor, href, isActive, onClick }) => {
        const content = (
            <>
                <Icon className={`${iconClass} ${isActive ? 'text-blue-400' : `group-hover:${hoverColor}`}`} />
                {isOpen && <span className={`${textClass} ${isActive ? 'text-blue-400' : `group-hover:${hoverColor}`}`}>{label}</span>}
            </>
        );

        if (href) {
            return (
                <Link 
                    href={href} 
                    className={`${baseButtonClass} ${isActive ? (isDark ? 'bg-gray-700/60' : 'bg-gray-100/60') : ''}`}
                    onClick={onClick}
                >
                    {content}
                </Link>
            );
        }

        return (
            <button 
                onClick={onClick} 
                className={`${baseButtonClass} ${isActive ? (isDark ? 'bg-gray-700/60' : 'bg-gray-100/60') : ''}`}
            >
                {content}
            </button>
        );
    };

    return (
        <div className={`fixed left-0 top-0 bottom-0 z-50 transition-all duration-700 ease-out ${isOpen ? 'w-72' : 'w-20'} p-3 h-screen`}>
            <div className={`relative h-full backdrop-blur-3xl backdrop-saturate-200 ${isDark ? 'bg-gray-800/40 border-gray-700/50 shadow-lg shadow-black/50' : 'bg-white/60 border-gray-200/50 shadow-lg shadow-gray-900/20'} border rounded-2xl transition-all duration-700 ease-out overflow-hidden before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:mask-composite-subtract before:transition-opacity before:duration-300 hover:before:opacity-100 flex flex-col`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200/20">
                    {isOpen && (
                        <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-700/60' : 'bg-gray-100/60'} backdrop-blur-sm transition-all duration-500 ease-out hover:scale-110 cursor-pointer group relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Activity className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'} transition-all duration-300 group-hover:text-blue-400 relative z-10`} />
                            </div>
                        </div>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className={`relative flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-700 ease-out group transform hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer ${isDark ? 'hover:shadow-blue-400/20' : 'hover:shadow-blue-600/20'}`}>
                        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out ${isDark ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent' : 'bg-gradient-to-br from-white/40 via-white/20 to-transparent'} backdrop-blur-xl`} />
                        {isOpen ?
                            <IndentDecrease className={`w-5 h-5 transition-all duration-500 ease-out ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-400 group-hover:scale-110 relative z-10`} /> :
                            <IndentIncrease className={`w-5 h-5 transition-all duration-500 ease-out ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-400 group-hover:scale-110 relative z-10`} />
                        }
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <NavButton
                        icon={Plus}
                        label="New Chat"
                        hoverColor="text-green-400"
                        href="/chats"
                        isActive={pathname === '/chats' || pathname === '/'}
                        onClick={createNewChat}
                    />

                    <div className={`${!isOpen && 'flex justify-start'}`}>
                        {isOpen ? (
                            <div className="relative">
                                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                                <input
                                    type="text"
                                    placeholder="Search chats..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm cursor-text ${isDark ? 'bg-gray-700/60 text-white placeholder-gray-400' : 'bg-white/60 text-gray-900 placeholder-gray-600'} border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300`}
                                />
                            </div>
                        ) : (
                            <button className="cursor-pointer hover:scale-110 transition-transform duration-200">
                                <Search className={`w-5 h-5 ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300`} />
                            </button>
                        )}
                    </div>
                    
                    <NavButton
                        icon={Library}
                        label="Library"
                        hoverColor="text-purple-400"
                        href="/library"
                        isActive={pathname === '/library'}
                    />
                    
                    <div className="relative">
                        <NavButton
                            icon={Wallet}
                            label={isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
                            hoverColor="text-blue-400"
                            href="/wallet"
                            isActive={pathname === '/wallet'}
                            onClick={handleWalletClick}
                        />
                        {isWalletConnected && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                        )}
                    </div>

                    {/* Chats Section */}
                    <div className={`${!isOpen && 'hidden'}`}>
                        <div className="flex items-center space-x-2 px-3 py-2 mt-4">
                            <MessageCircle className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Chats</span>
                        </div>
                        <div className="space-y-1 max-h-96 overflow-y-auto">
                            {filteredChats.length === 0 ? (
                                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No chats available</p>
                                </div>
                            ) : (
                                filteredChats.map((chat) => (
                                    <Link
                                        key={chat.id}
                                        href={`/chats/${chat.id}`}
                                        className={`flex items-start space-x-3 p-3 rounded-xl ${isDark ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100/60'} transition-all duration-300 group cursor-pointer relative hover:scale-[1.02] active:scale-[0.98]`}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`text-sm font-medium ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} truncate transition-colors duration-300`}>{chat.title}</h4>
                                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate mt-1`}>{chat.lastMessage}</p>
                                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{chat.timestamp}</span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="p-4 border-t border-gray-200/20 space-y-2">
                    <Link
                        href="/upgrade"
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl ${isDark ? 'hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20' : 'hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20'} transition-all duration-300 group cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${!isOpen && 'justify-center'}`}
                    >
                        <Crown className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-yellow-400 transition-colors duration-300`} />
                        {isOpen && <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-yellow-400 transition-colors duration-300`}>Upgrade Plan</span>}
                    </Link>
                    
                    <Link
                        href="/settings"
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl ${isDark ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100/60'} transition-all duration-300 group cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${!isOpen && 'justify-center'}`}
                    >
                        <Settings className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-400 group-hover:rotate-90 transition-all duration-300`} />
                        {isOpen && <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-400 transition-colors duration-300`}>Settings</span>}
                    </Link>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-60`} />
            </div>
        </div>
    );
};

export default Sidebar;