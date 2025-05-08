import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';
import Countdown from '../components/ui/Countdown';
import { ArrowRight, Star, Trophy, User, Shield, MessageCircle } from 'lucide-react';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { drawDate } = useRaffle();

  // Função para calcular a próxima quarta-feira às 19h
  const getNextWednesday = () => {
    const now = new Date();
    const nextWed = new Date();
    nextWed.setDate(now.getDate() + ((3 + 7 - now.getDay()) % 7));
    nextWed.setHours(19, 0, 0, 0);
    
    // Se já passou das 19h de quarta, adiciona 7 dias
    if (now > nextWed) {
      nextWed.setDate(nextWed.getDate() + 7);
    }
    
    return nextWed;
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-image flex items-center justify-center min-h-screen relative"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4">
            {/* Centered content */}
            <div className="text-center mb-12">
              <div
                className={`transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <h1 className="text-3xl md:text-4xl text-white mb-8 font-bold">
                  🍀 AQUI TEM GANHADOR O TEMPO TODO 🍀
                </h1>
              </div>
            </div>

            {/* Countdown section */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl p-6">
                <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-xl mb-6 text-center font-bold text-xl shadow-lg border border-white/30">
                  SORTEIO {getNextWednesday().toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase()} ÀS 19H
                </div>
                
                <div className="p-6 rounded-xl mb-6">
                  <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider text-center">
                    Próximo Sorteio Em:
                  </h3>
                  <div className="rounded-xl p-6">
                    <Countdown 
                      targetDate={getNextWednesday()} 
                      className="text-6xl md:text-7xl font-black tracking-wider text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/comprar"
                    className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300 shadow-xl text-center"
                  >
                    PARTICIPAR AGORA <ArrowRight size={20} className="inline ml-2" />
                  </Link>
                  
                  <a
                    href="https://wa.me/SEUNUMEROAQUI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition duration-300 shadow-xl"
                  >
                    <MessageCircle size={20} className="mr-2" />
                    Acompanhar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto -mt-24 relative z-20">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 text-gray-800 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: How it works */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Como participar?
                </h2>
                <p className="text-gray-600 mb-8">
                  É simples e rápido! Compre seus bilhetes online e concorra a um BMW zero quilômetro. 
                  A cada bilhete adquirido, você aumenta suas chances de ganhar.
                </p>

                <div className="space-y-6">
                  <div className="flex bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all border border-gray-700">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700">
                      <span className="font-bold text-white">1</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg text-white">Escolha seus bilhetes</h3>
                      <p className="text-gray-300">
                        Selecione o pacote que melhor atende às suas necessidades. Quanto mais bilhetes, maiores suas chances.
                      </p>
                    </div>
                  </div>

                  <div className="flex bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all border border-gray-700">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700">
                      <span className="font-bold text-white">2</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg text-white">Faça o pagamento</h3>
                      <p className="text-gray-300">
                        Pague com cartão de crédito, débito, PIX ou boleto bancário de forma rápida e segura.
                      </p>
                    </div>
                  </div>

                  <div className="flex bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all border border-gray-700">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700">
                      <span className="font-bold text-white">3</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg text-white">Aguarde o sorteio</h3>
                      <p className="text-gray-300">
                        O sorteio será realizado {getNextWednesday().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} às 19h ao vivo pelas nossas redes sociais.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/comprar"
                    className="inline-block bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition duration-300"
                  >
                    Comprar bilhetes <ArrowRight size={18} className="inline ml-2" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Prize */}
              <div>
                <div className="bg-white rounded-xl p-6 h-full flex flex-col border border-gray-200">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Prêmio principal
                    </h3>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Carro"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                    <h4 className="text-xl font-bold text-gray-800">
                      O CARRO
                    </h4>
                    <p className="text-gray-600">
                      Zero km, documentação inclusa
                    </p>
                  </div>

                  <div className="mt-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-2">Outros prêmios:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center bg-white p-2 rounded border border-gray-200">
                        <Trophy size={18} className="text-gray-600 mr-2" />
                        <span className="text-gray-600">2º lugar: R$ 5.000,00 em dinheiro</span>
                      </li>
                      <li className="flex items-center bg-white p-2 rounded border border-gray-200">
                        <Trophy size={18} className="text-gray-600 mr-2" />
                        <span className="text-gray-600">3º lugar: R$ 3.000,00 em dinheiro</span>
                      </li>
                      <li className="flex items-center bg-white p-2 rounded border border-gray-200">
                        <Trophy size={18} className="text-gray-600 mr-2" />
                        <span className="text-gray-600">4º lugar: R$ 1.000,00 em dinheiro</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 p-6 rounded-xl mb-12 border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Ganhadores anteriores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:bg-gray-50 transition-all border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Maria Silva"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Maria Silva</h4>
                  <p className="text-gray-500 text-sm">Ganhadora 2023</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Nunca imaginei que ganharia um carro desses! A BMW mudou minha vida e agora posso viajar com toda a família com conforto e segurança."
              </p>
              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-current mr-1"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:bg-gray-50 transition-all border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Carlos Oliveira"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Carlos Oliveira</h4>
                  <p className="text-gray-500 text-sm">Ganhador 2022</p>
                </div>
              </div>
              <p className="text-gray-600">
                "A qualidade do carro é impressionante. Desde o atendimento até a entrega, tudo foi perfeito. Recomendo a todos que participem desta promoção!"
              </p>
              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-current mr-1"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:bg-gray-50 transition-all border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Ana Santos"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Ana Santos</h4>
                  <p className="text-gray-500 text-sm">Ganhadora 2021</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Participar foi muito simples e ganhar foi uma surpresa maravilhosa. O carro é espetacular em todos os aspectos. Vale muito a pena tentar!"
              </p>
              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-current mr-1"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Por que escolher a WIL RIFAS?
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            A maior e mais confiável plataforma de sorteios semanais do Brasil! 🍀
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <Shield size={24} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">100% Seguro</h3>
              <p className="text-gray-600">
                Sorteios auditados e transmitidos ao vivo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <Trophy size={24} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Prêmios Garantidos</h3>
              <p className="text-gray-600">
                Sorteios toda semana com ganhadores reais.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <User size={24} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Milhares de Ganhadores</h3>
              <p className="text-gray-600">
                Aqui tem ganhador o tempo todo! 🍀
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <ArrowRight size={24} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Entrega Imediata</h3>
              <p className="text-gray-600">
                Prêmios entregues em até 24 horas após o sorteio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Não perca esta oportunidade!
          </h2>
          <div className="bg-gray-50 text-gray-800 p-4 rounded-lg mb-8 inline-block border border-gray-200">
            <h3 className="text-xl font-bold">PRÓXIMO SORTEIO: {getNextWednesday().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()} ÀS 19H</h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/comprar"
              className="inline-block bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition duration-300"
            >
              GARANTIR MINHA COTA <ArrowRight size={20} className="inline ml-2" />
            </Link>
            <a
              href="https://wa.me/SEUNUMEROAQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition duration-300"
            >
              ACOMPANHAR NO WHATSAPP <MessageCircle size={20} className="inline ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;