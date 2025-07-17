import React, { useState, useEffect, useRef } from 'react';
import {
    Send, Plus, Image, Search, RotateCcw, FileText, Calendar, Mail, HardDrive, Upload,
    BarChart3, Heart, BookOpen, PenTool, Code, X, Paperclip, Mic, Camera, ArrowUp
} from 'lucide-react';

const ChatsMain = () => {
    const [isDark, setIsDark] = useState(false);
    const [message, setMessage] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [messages, setMessages] = useState([{
        id: 1, text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: 'bot', timestamp: new Date()
    }]);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [message]);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1, text: message, sender: 'user', timestamp: new Date()
            };
            setMessages([...messages, newMessage]);
            setMessage('');
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: prev.length + 1, text: "I understand your message. How can I assist you further?",
                    sender: 'bot', timestamp: new Date()
                }]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileUpload = (type) => {
        console.log(`Uploading ${type}`);
        setIsDropdownOpen(false);
    };

    const quickActions = [
        { icon: BarChart3, label: 'Analyse' },
        { icon: Heart, label: 'Life Stuff' },
        { icon: BookOpen, label: 'Learn' },
        { icon: PenTool, label: 'Write' },
        { icon: Code, label: 'Code' }
    ];

    const dropdownOptions = [
        { icon: HardDrive, label: 'Google Drive', action: () => handleFileUpload('drive') },
        { icon: Mail, label: 'Gmail', action: () => handleFileUpload('gmail') },
        { icon: Calendar, label: 'Calendar', action: () => handleFileUpload('calendar') },
        { icon: Image, label: 'Upload Image', action: () => handleFileUpload('image') },
        { icon: Upload, label: 'Upload Files', action: () => handleFileUpload('files') }
    ];

    const baseButtonClass = `transition-all duration-300 group`;
    const quickActionClass = `flex items-center space-x-3 px-6 py-3 rounded-2xl ${isDark ? 'bg-gray-800/70 hover:bg-gray-700/70 border-gray-600/30 hover:border-gray-500/50' : 'bg-gray-50/70 hover:bg-gray-100/70 border-gray-200/50 hover:border-gray-300/50'} backdrop-blur-sm border hover:scale-105 hover:shadow-lg ${isDark ? 'hover:shadow-black/25' : 'hover:shadow-gray-500/20'} ${baseButtonClass}`;
    const iconClass = `w-5 h-5 transition-all duration-300 ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'}`;
    const labelClass = `text-sm font-medium ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'}`;

    return (
        <div>
            <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-20'>
                <p className='text-xl font-semibold mt-40 pl-20'>What can I help with?</p>
            </div>
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 !pl-40">
                <div className="w-full max-w-4xl mx-auto px-4 pointer-events-auto">
                    <div className={`relative w-full ${isDark ? 'bg-gray-900/95 border-gray-700/50 hover:shadow-black/40' : 'bg-white/95 border-gray-200/50 hover:shadow-gray-900/20'} backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl`}>
                        <div className="p-8">
                            {/* Quick Action Buttons */}
                            <div className="flex items-center justify-center space-x-4 mb-8">
                                {quickActions.map((action, index) => (
                                    <button key={index} className={quickActionClass}>
                                        <action.icon className={iconClass} />
                                        <span className={labelClass}>{action.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Main Input Section */}
                            <div className="relative">
                                <div className={`relative flex items-end ${isDark ? 'bg-gray-800/50 focus-within:bg-gray-800/70 border-gray-600/30 focus-within:border-gray-500/50 focus-within:shadow-black/25' : 'bg-gray-50/50 focus-within:bg-gray-50/70 border-gray-400/50 focus-within:border-gray-300/50 focus-within:shadow-gray-500/20'} backdrop-blur-sm border rounded-2xl transition-all duration-300 focus-within:shadow-xl`}>
                                    {/* Plus Button */}
                                    <div className="relative pl-4 pb-2" ref={dropdownRef}>
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`flex items-center justify-center w-10 h-10 rounded-2xl ${isDark ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100/60'} ${baseButtonClass}`}
                                        >
                                            <Plus className={`w-5 h-5 transition-all duration-300 ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'} ${isDropdownOpen ? 'rotate-45' : 'rotate-0'}`} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isDropdownOpen && (
                                            <div className={`absolute bottom-full left-0 mb-2 w-64 z-50 ${isDark ? 'bg-gray-800/95 border-gray-700/50 shadow-black/40' : 'bg-white/95 border-gray-200/50 shadow-gray-900/20'} backdrop-blur-xl border rounded-2xl shadow-2xl transition-all duration-300`}>
                                                <div className="p-3">
                                                    {dropdownOptions.map((option, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={option.action}
                                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${isDark ? 'hover:bg-gray-700/60' : 'hover:bg-gray-50/60'} ${baseButtonClass} text-left`}
                                                        >
                                                            <option.icon className={iconClass} />
                                                            <span className={labelClass}>{option.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Textarea Field */}
                                    <textarea
                                        ref={textareaRef}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Message AgentX..."
                                        rows={1}
                                        className={`flex-1 bg-transparent outline-none px-4 py-4 resize-none overflow-y-auto ${isDark ? 'text-gray-200 placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'} text-base`}
                                        style={{ minHeight: '48px', maxHeight: '120px' }}
                                    />

                                    {/* Additional Input Actions */}
                                    <div className="flex items-center space-x-1 pr-2 pb-2">
                                        {[
                                            { icon: Paperclip, action: () => fileInputRef.current?.click() },
                                            { icon: Camera, action: () => {} },
                                            { icon: Mic, action: () => {} }
                                        ].map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={item.action}
                                                className={`p-2 rounded-xl ${isDark ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100/60'} ${baseButtonClass}`}
                                            >
                                                <item.icon className={`w-5 h-5 transition-all duration-300 ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Send Button */}
                                    <div>
                                    <button
                                        onClick={handleSend}
                                        disabled={!message.trim()}
                                        className={`flex items-center justify-center w-12 h-12 rounded-2xl mr-4 mb-1 ${message.trim() ? isDark ? 'bg-gray-200 text-gray-800 hover:bg-gray-100' : 'bg-black text-white' : isDark ? 'bg-black text-gray-500' : 'bg-gray-200 text-gray-400'} transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${message.trim() ? 'hover:shadow-lg' : ''}`}
                                    >
                                        <ArrowUp className={`w-5 h-5 transition-all duration-300 ${message.trim() ? 'scale-100' : 'scale-90'}`} />
                                    </button></div>
                                </div>
                            </div>

                            {/* Version Info */}
                            <div className="mt-6 text-center">
                                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    AgentX can make mistakes. Consider checking important information.
                                </p>
                            </div>
                        </div>

                        {/* Subtle accent border */}
                        <div className={`absolute inset-0 rounded-3xl ${isDark ? 'bg-gradient-to-r from-gray-600/20 via-transparent to-gray-600/20' : 'bg-gradient-to-r from-gray-300/20 via-transparent to-gray-300/20'} pointer-events-none`} />
                    </div>

                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={(e) => console.log('Files selected:', e.target.files)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatsMain;