import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';
import { useUser } from '../contexts/UserContext';
import { CheckCircle, CreditCard, ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, totalPrice, totalTickets, availablePackages, clearCart } = useRaffle();
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  if (!cart) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Carrinho vazio</h1>
        <p className="text-xl text-gray-600 mb-6">
          Você ainda não selecionou nenhum pacote de bilhetes.
        </p>
        <button
          onClick={() => navigate('/comprar')}
          className="btn btn-primary"
        >
          Comprar bilhetes
        </button>
      </div>
    );
  }
  
  const selectedPackage = availablePackages.find(pkg => pkg.id === cart.packageId);
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    }
    if (value.length > 10) {
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    setPhone(value.substring(0, 15));
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    setCardNumber(value.substring(0, 19));
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, '$1/$2');
    }
    
    setExpiryDate(value.substring(0, 5));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/sucesso');
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Voltar
      </button>
      
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Customer and Payment Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-bold">Informações pessoais</h2>
              </div>
              
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="name" className="form-label bg-gray-100 px-3 py-1 rounded">Nome completo</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input bg-white"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label bg-gray-100 px-3 py-1 rounded">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input bg-white"
                    placeholder="Digite seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label bg-gray-100 px-3 py-1 rounded">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-input bg-white"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl shadow-lg p-6">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-bold">Método de pagamento</h2>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit-card')}
                    className={`flex items-center px-4 py-3 rounded-lg border hover:bg-gray-100 ${
                      paymentMethod === 'credit-card'
                        ? 'border-black bg-gray-100'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <CreditCard size={20} className="mr-2" />
                    Cartão de crédito
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex items-center px-4 py-3 rounded-lg border hover:bg-gray-100 ${
                      paymentMethod === 'pix'
                        ? 'border-black bg-gray-100'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <span className="font-bold mr-2">PIX</span>
                    Pagamento instantâneo
                  </button>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
                    <div className="form-group">
                      <label htmlFor="cardNumber" className="form-label bg-white px-3 py-1 rounded">Número do cartão</label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="form-input bg-white"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="expiryDate" className="form-label bg-white px-3 py-1 rounded">Validade</label>
                        <input
                          type="text"
                          id="expiryDate"
                          className="form-input bg-white"
                          placeholder="MM/AA"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cvv" className="form-label bg-white px-3 py-1 rounded">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          className="form-input bg-white"
                          placeholder="000"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'pix' && (
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-gray-600 mb-4">
                      Ao confirmar a compra, você receberá um QR Code para pagamento via PIX.
                    </p>
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <img
                        src="/pix-qr-code-example.png"
                        alt="QR Code PIX"
                        className="w-48 h-48 mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-8">
                <p className="text-gray-600">
                  Ao finalizar, você concorda com os <a href="#" className="text-black underline">termos e condições</a>
                </p>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`btn btn-primary py-3 px-6 ${
                    isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </span>
                  ) : (
                    'Finalizar pagamento'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Right column - Order Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Resumo do pedido</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Pacote</span>
                <span className="font-medium">{selectedPackage?.quantity} bilhetes</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span>Quantidade</span>
                <span className="font-medium">{cart.quantity}</span>
              </div>
              
              <div className="flex justify-between text-lg">
                <span>Total de bilhetes</span>
                <span className="font-bold">{totalTickets}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center text-xl">
                <span>Total</span>
                <span className="font-bold">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <CheckCircle size={16} className="mr-1" />
                Preço com todos os impostos incluídos
              </p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Bilhetes premium BMW</h3>
              <p className="text-sm text-gray-600 mb-2">
                Cada bilhete lhe dá uma chance de ganhar:
              </p>
              <ul className="text-sm text-gray-600">
                <li className="flex items-start mb-1">
                  <CheckCircle size={16} className="text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                  <span>BMW Série 3 2025, zero quilômetro</span>
                </li>
                <li className="flex items-start mb-1">
                  <CheckCircle size={16} className="text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                  <span>Vários prêmios secundários</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                  <span>Sorteio transparente e auditado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;