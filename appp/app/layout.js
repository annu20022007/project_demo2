import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "appppp",
  description: "NASA NEO Tracker built with Next.js 13 and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
         {/* Navbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="text-xl font-bold tracking-wide text-cyan-400">
            ASTROMARK
          </div>
            <nav className="space-x-6 text-sm text-gray-300">
                         
            <Link href="/login" className="hover:text-cyan-400">
              Login
            </Link>
          </nav>
        </header>
          {/* Page Content */}
        <main className="px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 py-6 border-t border-gray-800">
          all rights reserved &copy; 2024 | Developed by UNION CODERS....
        </footer>
        
      </body>
    </html>
  );
}
