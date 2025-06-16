"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#6b21a8] text-white px-8 py-12 rounded-3xl shadow-lg border border-gray-300 mx-auto my-2 max-w-7xl">
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md px-10 py-3 rounded-2xl flex justify-between items-center text-white">
        <div className="flex items-center space-x-3">
          <Image
            src="/NEW.svg"
            alt="AI Career Coach Logo"
            width={128}
            height={128}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-white">AI Career Coach</span>
        </div>
        <nav className="flex space-x-8 text-sm font-medium text-white/90">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <Link href="/ai-chat" className="hover:text-black transition">AI Chat</Link>
          <Link href="/roadmap" className="hover:text-black transition">Roadmap</Link>
          <Link href="/history" className="hover:text-black transition">History</Link>
        </nav>
      </header>

      <section className="relative bg-gradient-to-br from-[#3b82f6] to-[#6366f1] rounded-2xl shadow-inner text-center max-w-5xl mx-auto mb-20 mt-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 animate-pulse" />
        <div className="relative px-6 py-16 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Build Your Future with AI</h1>
          <p className="text-white/80 mb-6">
            An AI-powered platform to help you design, explore, and track your ideal career path.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/ai-chat">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition duration-300 transform hover:scale-105">
                Get Started 🧠
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button className="bg-white text-blue-700 px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                Generate Roadmap →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold mb-2">Chat with a Career Expert</h3>
          <p className="text-gray-800 text-sm">Get expert career advice in real time.</p>
        </div>
        <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold mb-2">Generate Custom Roadmaps</h3>
          <p className="text-gray-800 text-sm">
            Create a personalized step-by-step plan for any career goal.
          </p>
        </div>
        <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md text-center">
          <div className="text-4xl mb-4">💾</div>
          <h3 className="text-xl font-semibold mb-2">View Roadmap History</h3>
          <p className="text-gray-800 text-sm">Access and manage your saved roadmaps.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
        <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">5,000+ Goals Mapped</h3>
          <p className="text-gray-800 text-sm">Helping users find their dream careers.</p>
        </div>
        <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">AI-Powered Guidance</h3>
          <p className="text-gray-800 text-sm">Smart suggestions, roadmaps, and support.</p>
        </div>
        <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">Built for Students</h3>
          <p className="text-gray-800 text-sm">Designed for learners, dreamers, and doers.</p>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-[#1e3a8a] via-[#312e81] to-[#6b21a8] mt-20 py-10 rounded-xl shadow-inner overflow-hidden">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">98% Satisfaction</h3>
            <p className="text-gray-800 text-sm">Loved by learners & career seekers</p>
          </div>
          <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Real-time Responses</h3>
            <p className="text-gray-800 text-sm">Ask anything. Get guided in seconds.</p>
          </div>
          <div className="bg-white/90 text-black hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Fully Free</h3>
            <p className="text-gray-800 text-sm">No charges. No ads. Just growth.</p>
          </div>
        </div>
      </section>

      <footer className="mt-20 py-10 text-center text-sm text-white/70 animate-fadeInUp space-y-2 transition-opacity duration-1000 ease-in-out">
        <p>&copy; {new Date().getFullYear()} AI Career Coach. All rights reserved.</p>
        <div className="flex justify-center gap-4 text-white/70 text-sm">
          <Link href="/about" className="hover:text-black underline">About</Link>
          <Link href="/terms" className="hover:text-black underline">Terms</Link>
          <a href="https://github.com/your-username/ai-career-coach" target="_blank" rel="noopener noreferrer" className="hover:text-black underline">GitHub Repo</a>
        </div>
        <p className="text-xs text-white/70 mt-1">Made with ❤️ by ABHISHEK CHHANDAK.</p>
      </footer>
    </main>
  );
}