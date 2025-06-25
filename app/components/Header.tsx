"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Sparkles, Palette, Users, LayoutDashboard } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="w-full border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Beautiful Logo */}
        <Link href="/" className="group flex items-center gap-2 transition-all duration-300 hover:scale-105">
          <div className="relative">
            {/* Logo Icon Container */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {/* Sparkle Effect */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
          </div>
          
          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 dark:from-violet-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-blue-500 transition-all duration-300">
              Artistly
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
              Creative Hub
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/artists">
            <Button 
              variant="ghost" 
              className="group relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-950 dark:hover:to-purple-950 hover:shadow-md"
            >
              <Users className="w-4 h-4 mr-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300" />
              <span className="group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                Browse Artists
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Button>
          </Link>
          
          <Link href="/onboard">
            <Button 
              variant="ghost"
              className="group relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950 dark:hover:to-indigo-950 hover:shadow-md"
            >
              <Palette className="w-4 h-4 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Onboard Artist
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button 
              variant="ghost"
              className="group relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950 dark:hover:to-teal-950 hover:shadow-md"
            >
              <LayoutDashboard className="w-4 h-4 mr-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" />
              <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                Dashboard
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></div>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="relative group border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative w-5 h-5">
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-orange-500 group-hover:text-orange-400 transition-all duration-300 group-hover:rotate-12" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 group-hover:text-indigo-500 transition-all duration-300 group-hover:-rotate-12" />
              )}
            </div>
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </Button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="relative group border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300"
            >
              <div className="flex flex-col gap-1">
                <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-300 group-hover:bg-violet-600 dark:group-hover:bg-violet-400 transition-colors duration-300"></div>
                <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-300 group-hover:bg-violet-600 dark:group-hover:bg-violet-400 transition-colors duration-300"></div>
                <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-300 group-hover:bg-violet-600 dark:group-hover:bg-violet-400 transition-colors duration-300"></div>
              </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col gap-2">
            <Link href="/artists">
              <Button 
                variant="ghost" 
                className="w-full justify-start group hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-950 dark:hover:to-purple-950"
              >
                <Users className="w-4 h-4 mr-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300" />
                <span className="group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                  Browse Artists
                </span>
              </Button>
            </Link>
            
            <Link href="/onboard">
              <Button 
                variant="ghost"
                className="w-full justify-start group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950 dark:hover:to-indigo-950"
              >
                <Palette className="w-4 h-4 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Onboard Artist
                </span>
              </Button>
            </Link>
            
            <Link href="/dashboard">
              <Button 
                variant="ghost"
                className="w-full justify-start group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950 dark:hover:to-teal-950"
              >
                <LayoutDashboard className="w-4 h-4 mr-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" />
                <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  Dashboard
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}