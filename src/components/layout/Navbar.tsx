import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 glass-panel border-b border-white/5 shadow-2xl shadow-black/20' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-9 h-9 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img src="/logo.png" className="w-9 h-9 object-contain" alt="" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-white group-hover:text-white/90 transition-colors">
              Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Task Flow</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              onClick={(e) => handleScrollToSection(e, 'features')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#workflow" 
              onClick={(e) => handleScrollToSection(e, 'workflow')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Workflow
            </a>
            <a 
              href="#ai-engine" 
              onClick={(e) => handleScrollToSection(e, 'ai-engine')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              AI Engine
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => handleScrollToSection(e, 'testimonials')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleScrollToSection(e, 'faq')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Sign in
            </Link>
            <Link 
              to="/register"
              className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/25 hover:shadow-lg hover:shadow-brand-purple/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 py-4 px-6 glass-panel-heavy border-b border-white/5 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              onClick={(e) => handleScrollToSection(e, 'features')}
              className="text-base font-medium text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors block text-left"
            >
              Features
            </a>
            <a 
              href="#workflow" 
              onClick={(e) => handleScrollToSection(e, 'workflow')}
              className="text-base font-medium text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors block text-left"
            >
              Workflow
            </a>
            <a 
              href="#ai-engine" 
              onClick={(e) => handleScrollToSection(e, 'ai-engine')}
              className="text-base font-medium text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors block text-left"
            >
              AI Engine
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => handleScrollToSection(e, 'testimonials')}
              className="text-base font-medium text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors block text-left"
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleScrollToSection(e, 'faq')}
              className="text-base font-medium text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors block text-left"
            >
              FAQ
            </a>
            
            <div className="pt-4 flex flex-col gap-3">
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-base font-medium text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors block"
              >
                Sign in
              </Link>
              <Link 
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
