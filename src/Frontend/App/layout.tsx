"use client";
import React, { useState } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import ChatsMain from "../Routes/Chats";
import WalletMain from "../Routes/Wallet";


const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('chat'); // 'chat' or 'wallet'

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'wallet':
        return <WalletMain />;
      case 'chat':
        return<ChatsMain />;
      default:
        return <ChatsMain />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          navigateToScreen={navigateToScreen}
          currentScreen={currentScreen}
        />
        <main
          className={`
            transition-all duration-300 pt-20 relative z-10
            ${isOpen ? 'ml-72' : 'ml-20'}
          `}
        >
          {renderCurrentScreen()}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;