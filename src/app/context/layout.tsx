// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Your App Name',
  description: 'Your app description here.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-800 text-white">
          <h1 className="text-xl font-bold">My App Header</h1>
        </header>
        
        <main className="min-h-screen p-4">
          {children}
        </main>

        <footer className="p-4 bg-gray-200 text-center text-sm">
          © 2025 My App. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
