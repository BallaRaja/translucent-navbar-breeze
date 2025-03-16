
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-secondary/50 transition-all duration-300 ${isOpen ? 'bg-secondary/50' : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
          <User size={16} />
        </div>
        <span className="ml-2">Profile</span>
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg overflow-hidden animate-scale-in origin-top-right z-50">
          <div className="py-1">
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-secondary/50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              View Profile
            </Link>
            <Link
              to="/edit-profile"
              className="block px-4 py-2 hover:bg-secondary/50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Edit Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 hover:bg-secondary/50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
