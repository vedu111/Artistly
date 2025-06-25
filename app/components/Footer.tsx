import React from "react";
import { Instagram, Linkedin, Mail, MapPin, Sparkles, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/30 dark:from-zinc-900 dark:via-violet-950/20 dark:to-blue-950/20 border-t border-violet-200/50 dark:border-violet-800/30 pt-16 pb-8 px-4 mt-12 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-500/10 dark:bg-violet-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand/mission */}
          <div className="space-y-6">
            {/* Logo Section */}
            <div className="group flex items-center gap-3">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 dark:from-violet-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Artistly
                </span>
                <span className="text-sm text-violet-600/70 dark:text-violet-400/70 -mt-1">
                  Creative Hub
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Connecting Events & Talent
              </div>
              <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The platform for booking world-class artists for any event. Discover amazing talent and create unforgettable experiences.
              </div>
            </div>
          </div>

          {/* Mumbai Contact */}
          <div className="space-y-4">
            <div className="relative">
              <div className="font-bold text-lg bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent mb-1">
                MUMBAI
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
            </div>
            
            <div className="space-y-3">
              <div className="group">
                <a 
                  href="mailto:info@artistly.com" 
                  className="inline-flex items-center text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300 group-hover:translate-x-1"
                >
                  <Mail className="w-4 h-4 mr-2 text-violet-500" />
                  <span className="font-medium">info@artistly.com</span>
                </a>
              </div>
              
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <span className="w-4 h-4 mr-2"></span>
                <span>+91 90000 00000</span>
              </div>
              
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <span className="w-4 h-4 mr-2"></span>
                <span>Andheri West, Mumbai, India</span>
              </div>
              
              <a
                href="https://goo.gl/maps/xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-all duration-300 group hover:translate-x-1 font-medium"
              >
                <MapPin className="w-4 h-4 mr-2" />
                SEE ON MAP
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* London Contact */}
          <div className="space-y-4">
            <div className="relative">
              <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-1">
                LONDON
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
            
            <div className="space-y-3">
              <div className="group">
                <a 
                  href="mailto:london@artistly.com" 
                  className="inline-flex items-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1"
                >
                  <Mail className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="font-medium">london@artistly.com</span>
                </a>
              </div>
              
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <span className="w-4 h-4 mr-2"></span>
                <span>+44 20 1234 5678</span>
              </div>
              
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <span className="w-4 h-4 mr-2"></span>
                <span>123 Oxford St, London, UK</span>
              </div>
              
              <a
                href="https://goo.gl/maps/xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 group hover:translate-x-1 font-medium"
              >
                <MapPin className="w-4 h-4 mr-2" />
                SEE ON MAP
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-8">
            {/* Newsletter Section */}
            <div className="space-y-4">
              <div className="relative">
                <div className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-1">
                  STAY UPDATED
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              </div>
              
              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Want to be the smartest in your office?
              </div>
              
              <a
                href="#"
                className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <span>SIGN UP FOR NEWSLETTER</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            
            {/* Social Section */}
            <div className="space-y-4">
              <div className="font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
                FOLLOW US
              </div>
              
              <div className="flex gap-3">
                <a 
                  href="#" 
                  aria-label="Instagram" 
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                
                <a 
                  href="#" 
                  aria-label="LinkedIn" 
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                
                <a 
                  href="mailto:info@artistly.com" 
                  aria-label="Email" 
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-violet-200/50 dark:border-violet-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} Artistly. All rights reserved. Made with ❤️ for artists worldwide.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}