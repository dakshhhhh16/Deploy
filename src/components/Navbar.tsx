import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logob from '@/assets/logob.png';

// Custom hook for scroll-based header styling
const useScrollHandler = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollHandler();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'pt-2' : 'pt-0'
      }`}
    >
      <div 
        className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-2xl border-x border-b border-gray-200/80 rounded-b-3xl' 
            : ''
        }`}
      >
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={scrollToTop}
            style={{ perspective: '1000px' }}
          >
            <img 
              src={logob} 
              alt="Blue Carbon Logo" 
              className="h-14 w-14 rounded-full object-cover transition-transform duration-500 ease-out group-hover:[transform:rotateY(15deg)_rotateX(-10deg)_translateZ(30px)] group-hover:shadow-2xl"
            />
            <span 
              className="text-2xl font-semibold tracking-wide transition-all duration-300 group-hover:brightness-110"
              style={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(45deg, #005f73, #0a9396, #94d2bd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Blue Carbon
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 font-medium text-gray-700">
            {['Home', 'Features', 'About'].map((item) => (
              <button
                key={item}
                onClick={item === 'Home' ? scrollToTop : () => scrollToSection(item.toLowerCase())}
                className="relative group pb-1"
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-400 ease-out group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Login/Signup and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                    <Button variant="ghost" className="font-semibold text-gray-600 hover:bg-gray-100/80 rounded-full px-5">
                        Login
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-full px-5 py-2.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105">
                        Sign Up
                    </Button>
                </Link>
            </div>
            
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-200/80 animate-in slide-in-from-top-3 duration-300">
            <div className="flex flex-col space-y-2">
              {['Home', 'Features', 'About'].map((item) => (
                 <button
                  key={item}
                  onClick={item === 'Home' ? scrollToTop : () => scrollToSection(item.toLowerCase())}
                  className="px-3 py-3 text-lg text-gray-700 hover:text-cyan-700 hover:bg-gray-100 rounded-md transition-colors text-left"
                >
                  {item}
                </button>
              ))}
              <div className="flex items-center space-x-2 pt-3 mt-2 border-t border-gray-200/80">
                <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full font-semibold">Login</Button>
                </Link>
                <Link to="/signup" className="w-full">
                    <Button className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-semibold">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

