// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Home, MessageCircle, FileText, History, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "Your personal AI assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen`}>
        <aside className="w-64 bg-white/50 backdrop-blur-lg border border-zinc-200 px-6 py-8 space-y-6 shadow-xl rounded-r-2xl m-4">
          <div className="flex flex-col items-center space-y-2">
            <Image src="/NEW.svg" alt="Logo" width={360} height={260} className="rounded-full" />
            <h2 className="text-xl font-bold text-zinc-800">🎯 AI Career Coach</h2>
          </div>
          <nav className="flex flex-col space-y-4 text-zinc-800 text-[15px]">
            <Link href="/ai-chat" className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all transition-colors duration-200 hover:bg-white/70 hover:shadow-md hover:text-black">
              <MessageCircle size={18} /> Chat
            </Link>
            <Link href="/roadmap" className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all transition-colors duration-200 hover:bg-white/70 hover:shadow-md hover:text-black">
              <FileText size={18} /> Roadmap
            </Link>
            <Link href="/resume" className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all transition-colors duration-200 hover:bg-white/70 hover:shadow-md hover:text-black">
              <FileText size={18} /> Resume
            </Link>
            <Link href="/history" className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all transition-colors duration-200 hover:bg-white/70 hover:shadow-md hover:text-black">
              <History size={18} /> History
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all transition-colors duration-200 hover:bg-white/70 hover:shadow-md hover:text-black">
              <Settings size={18} /> Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-[#fdfcf8]">{children}</main>
      </body>
    </html>
  );
}
