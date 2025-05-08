import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-8 pb-4 relative">
      <div className="absolute inset-0 bg-gray-800"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="flex items-center mb-3 bg-gray-900 p-3 rounded-lg border border-gray-700">
              <Logo className="h-6 w-auto text-white" />
              <span className="ml-2 font-bold text-lg text-white">
                WIL RIFAS
              </span>
            </div>
            <p className="text-gray-300 text-base mb-4">
              Participe dos nossos sorteios semanais e concorra a prêmios incríveis! 🍀 AQUI TEM GANHADOR O TEMPO TODO 🍀
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-700 transition-all duration-300 border border-gray-700"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-700 transition-all duration-300 border border-gray-700"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-700 transition-all duration-300 border border-gray-700"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-700 transition-all duration-300 border border-gray-700"
                aria-label="Youtube"
              >
                <Youtube size={18} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold mb-3 bg-gray-900 p-2 rounded-lg border border-gray-700 text-white">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition block p-2 rounded-lg hover:bg-gray-900 border border-gray-700 bg-gray-800">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/comprar" className="text-gray-300 hover:text-white transition block p-2 rounded-lg hover:bg-gray-900 border border-gray-700 bg-gray-800">
                  Comprar Bilhetes
                </Link>
              </li>
              <li>
                <Link to="/regulamento" className="text-gray-300 hover:text-white transition block p-2 rounded-lg hover:bg-gray-900 border border-gray-700 bg-gray-800">
                  Regulamento
                </Link>
              </li>
              <li>
                <Link to="/ganhadores" className="text-gray-300 hover:text-white transition block p-2 rounded-lg hover:bg-gray-900 border border-gray-700 bg-gray-800">
                  Ganhadores anteriores
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-gray-300 hover:text-white transition block p-2 rounded-lg hover:bg-gray-900 border border-gray-700 bg-gray-800">
                  Termos e condições
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-300 hover:text-white transition block p-2 rounded-lg hover:bg-gray-900 border border-gray-700 bg-gray-800">
                  Política de privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-3 bg-gray-900 p-2 rounded-lg border border-gray-700 text-white">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center bg-gray-900 p-2 rounded-lg border border-gray-700">
                <Phone size={18} className="text-white mr-2" />
                <span className="text-white font-medium">
                  0800 123 4567
                </span>
              </li>
              <li className="flex items-center bg-gray-900 p-2 rounded-lg border border-gray-700">
                <Mail size={18} className="text-white mr-2" />
                <span className="text-white font-medium">
                  contato@wilrifas.com.br
                </span>
              </li>
              <li className="flex items-start bg-gray-900 p-2 rounded-lg border border-gray-700">
                <MapPin size={18} className="text-white mr-2 mt-1" />
                <span className="text-white font-medium">
                  Av. das Nações Unidas, 12901 
                  <br />
                  São Paulo, SP
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-3 bg-gray-900 p-2 rounded-lg border border-gray-700 text-white">Newsletter</h3>
            <p className="text-gray-300 font-medium mb-3">
              Inscreva-se para receber novidades e promoções exclusivas.
            </p>
            <form className="mb-3">
              <div className="flex bg-gray-900 p-2 rounded-lg border border-gray-700">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 py-1 px-3 rounded-lg border-0 focus:ring-2 focus:ring-gray-700 bg-gray-700 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-white text-gray-800 px-4 py-1 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 ml-2 shadow-lg"
                >
                  Inscrever
                </button>
              </div>
            </form>
            <p className="text-gray-300 font-medium text-sm">
              Receba alertas sobre os próximos sorteios e novos prêmios.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 mt-4 text-center">
          <p className="mb-1 text-white font-medium">
            &copy; {currentYear} WIL RIFAS. Todos os direitos reservados.
          </p>
          <p className="text-gray-300 text-sm font-medium">
            Sorteios realizados ao vivo e auditados. Entrega dos prêmios em até 24 horas.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;