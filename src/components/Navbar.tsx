
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'glass shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight transform transition-transform duration-300 hover:scale-105"
          >
            <span className="text-primary">Pulse</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/group"
              className={`nav-link ${isActive('/group') ? 'active' : ''}`}
            >
              Group
            </Link>
            <Link
              to="/resources"
              className={`nav-link ${isActive('/resources') ? 'active' : ''}`}
            >
              Resources
            </Link>
            <Link
              to="/calendar"
              className={`nav-link ${isActive('/calendar') ? 'active' : ''}`}
            >
              Calendar
            </Link>
          </nav>

          {/* Profile (Desktop) */}
          <div className="hidden md:block">
            <ProfileDropdown />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-3 flex flex-col space-y-3">
            <Link
              to="/group"
              className={`nav-link text-center ${isActive('/group') ? 'bg-secondary/50' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Group
            </Link>
            <Link
              to="/resources"
              className={`nav-link text-center ${isActive('/resources') ? 'bg-secondary/50' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/calendar"
              className={`nav-link text-center ${isActive('/calendar') ? 'bg-secondary/50' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Calendar
            </Link>
            <div className="pt-2 border-t border-gray-200">
              <Link
                to="/profile"
                className="block text-center py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block text-center py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
