"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  FileText,
  History,
  Settings,
  Menu,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const links = [
  { href: "/ai-chat", label: "Chat", icon: MessageCircle },
  { href: "/roadmap", label: "Roadmap", icon: FileText },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
  {
  label: "Saved Roadmaps",
  icon: FileText,
  href: "/saved-roadmaps",
}
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex flex-col space-y-3">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all hover:bg-white/40 hover:backdrop-blur-sm ${
            pathname === href ? "bg-white/60 font-semibold text-zinc-900" : "text-zinc-700"
          }`}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile Navbar Button */}
      <div className="md:hidden p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="w-5 h-5 mr-2" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-white/70 backdrop-blur-md shadow-xl p-6 rounded-r-lg border-none"
          >
            <h2 className="text-xl font-bold mb-4 text-zinc-800">
              🎯 AI Career Coach
            </h2>
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>x

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen bg-white/60 backdrop-blur-md border-r border-zinc-300 p-8 shadow-lg space-y-6 rounded-tr-lg rounded-br-lg">
        <h2 className="text-xl font-bold text-zinc-800">🎯 AI Career Coach</h2>
        <NavLinks />
      </aside>
    </>
  );
}