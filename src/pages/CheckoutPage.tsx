import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffleCode } from '../contexts/RaffleCodeContext';
import { ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { selectedPackage, setRaffleCode } = useRaffleCode();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: ''
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4').substring(0, 14);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3').substring(0, 15);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData(prev => ({ ...prev, [name]: formatCPF(value) }));
    } else if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gerar código único para a rifa
    const raffleCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRaffleCode(raffleCode);
    
    // Aqui você implementaria a lógica de pagamento real
    // Por enquanto vamos apenas redirecionar para a página de sucesso
    navigate('/sucesso');
  };

  if (!selectedPackage) {
    navigate('/comprar');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <button
        onClick={() => navigate('/comprar')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
      >
        <ArrowLeft size={20} />
        Voltar para seleção de pacotes
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Finalizar Compra</h1>
          <p className="text-gray-600">
            Preencha seus dados para concluir a compra dos bilhetes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Dados Pessoais</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  maxLength={14}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  maxLength={15}
                  required
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">Pagamento via PIX</h3>
                <p className="text-gray-600 mb-4">
                  Após confirmar a compra, você receberá um QR Code para pagamento via PIX.
                </p>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img
                    src="/pix-qr-code-example.png"
                    alt="QR Code PIX"
                    className="w-48 h-48 mx-auto"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Finalizar Compra
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Resumo da Compra</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="font-bold mb-2">Pacote Selecionado</h3>
                <p className="text-gray-600">{selectedPackage.title}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-bold mb-2">Quantidade de Bilhetes</h3>
                <p className="text-gray-600">{selectedPackage.quantity} bilhetes</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">Subtotal</span>
                  <span>R$ {selectedPackage.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>R$ {selectedPackage.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;