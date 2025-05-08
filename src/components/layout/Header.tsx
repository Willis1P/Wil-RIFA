import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, MessageCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useRaffle } from '../../contexts/RaffleContext';
import Logo from '../ui/Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useUser();
  const { totalTickets } = useRaffle();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo
              className="h-10 w-auto text-black"
            />
            <span
              className="ml-2 font-bold text-xl text-black"
            >
              WIL RIFAS
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="font-medium text-black hover:text-gray-800"
            >
              Início
            </Link>
            <Link
              to="/comprar"
              className="font-medium text-black hover:text-gray-800"
            >
              Comprar Bilhetes
            </Link>
            <Link
              to="/meus-bilhetes"
              className="font-medium text-black hover:text-gray-800"
            >
              Meus Bilhetes
            </Link>
            
            {isAuthenticated ? (
              <Link
                to="/conta"
                className="flex items-center font-medium text-black hover:text-gray-800"
              >
                <User size={18} className="mr-1" />
                {user?.name.split(' ')[0]}
              </Link>
            ) : (
              <Link
                to="/login"
                className="font-medium text-black hover:text-gray-800"
              >
                Entrar
              </Link>
            )}
            
            <a
              href="https://wa.me/SEUNUMEROAQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center font-medium bg-green-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all"
            >
              <MessageCircle size={18} className="mr-2" />
              WhatsApp
            </a>
            
            <Link
              to="/checkout"
              className="flex items-center bg-black text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-all"
            >
              <ShoppingCart size={18} className="mr-2" />
              {totalTickets > 0 ? `${totalTickets} bilhetes` : 'Carrinho'}
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 shadow-lg absolute top-full left-0 right-0">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="font-medium text-gray-800 hover:text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
            >
              Início
            </Link>
            <Link
              to="/comprar"
              className="font-medium text-gray-800 hover:text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
            >
              Comprar Bilhetes
            </Link>
            <Link
              to="/meus-bilhetes"
              className="font-medium text-gray-800 hover:text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
            >
              Meus Bilhetes
            </Link>
            
            {isAuthenticated ? (
              <Link
                to="/conta"
                className="flex items-center font-medium text-gray-800 hover:text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
              >
                <User size={18} className="mr-1" />
                {user?.name.split(' ')[0]}
              </Link>
            ) : (
              <Link
                to="/login"
                className="font-medium text-gray-800 hover:text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
              >
                Entrar
              </Link>
            )}

            <a
              href="https://wa.me/SEUNUMEROAQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center font-medium bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
            >
              <MessageCircle size={18} className="mr-2" />
              WhatsApp
            </a>
            
            <Link
              to="/checkout"
              className="flex items-center bg-black text-white px-4 py-3 rounded-full font-medium hover:opacity-90 transition-all"
            >
              <ShoppingCart size={18} className="mr-2" />
              {totalTickets > 0 ? `${totalTickets} bilhetes` : 'Carrinho'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;