import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { User, Mail, Phone, Lock, LogOut, UserCircle, Clock, FileText, CreditCard } from 'lucide-react';

const AccountPage = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
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
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    alert('Perfil atualizado com sucesso!');
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's password
    alert('Senha atualizada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Minha conta</h1>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Sidebar Navigation */}
          <div className="md:w-64 bg-gray-50 p-6 border-r border-gray-200">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <UserCircle size={40} className="text-gray-500" />
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                  activeTab === 'profile'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <User size={18} className="mr-3" />
                Perfil
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                  activeTab === 'security'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Lock size={18} className="mr-3" />
                Segurança
              </button>
              
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                  activeTab === 'history'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Clock size={18} className="mr-3" />
                Histórico
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                  activeTab === 'orders'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FileText size={18} className="mr-3" />
                Pedidos
              </button>
              
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                  activeTab === 'payment'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                Pagamento
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 rounded-lg text-left font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={18} className="mr-3" />
                Sair
              </button>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-6 md:p-8">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações pessoais</h2>
                
                <form onSubmit={handleProfileSubmit} className="space-y-5">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Nome completo</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        className="form-input pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        className="form-input pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefone</label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        className="form-input pl-10"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                      />
                      <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="btn btn-primary">
                      Salvar alterações
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Segurança</h2>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <div className="form-group">
                    <label htmlFor="currentPassword" className="form-label">Senha atual</label>
                    <div className="relative">
                      <input
                        type="password"
                        id="currentPassword"
                        className="form-input pl-10"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                      <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">Nova senha</label>
                    <div className="relative">
                      <input
                        type="password"
                        id="newPassword"
                        className="form-input pl-10"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirme a nova senha</label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-input pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="btn btn-primary">
                      Atualizar senha
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Histórico de participações</h2>
                
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <Clock size={40} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-bold mb-2">Nenhum histórico ainda</h3>
                  <p className="text-gray-600 mb-4">
                    Você ainda não participou de nenhum sorteio finalizado.
                  </p>
                  <a href="/comprar" className="btn btn-primary">
                    Participar agora
                  </a>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Meus pedidos</h2>
                
                <div className="bg-gray-100 rounded-lg p-8 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pedido #BMW-5439</p>
                      <h3 className="font-bold text-lg">BMW Série 3 2025</h3>
                      <p className="text-sm text-gray-600">100 bilhetes • R$ 10,00</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mb-1">
                        Pago
                      </span>
                      <p className="text-sm text-gray-500">15/10/2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pedido #BMW-5372</p>
                      <h3 className="font-bold text-lg">BMW Série 3 2025</h3>
                      <p className="text-sm text-gray-600">400 bilhetes • R$ 38,00</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mb-1">
                        Pago
                      </span>
                      <p className="text-sm text-gray-500">28/09/2023</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Métodos de pagamento</h2>
                
                <div className="mb-6">
                  <div className="bg-gray-100 rounded-lg p-6 border border-gray-200 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-black rounded mr-4 flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4529</p>
                          <p className="text-sm text-gray-500">Expira em 09/2026</p>
                        </div>
                      </div>
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Padrão
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="text-blue-600 font-medium hover:underline">
                    + Adicionar novo método de pagamento
                  </button>
                </div>
                
                <h3 className="text-xl font-bold mb-4">Histórico de transações</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium">Data</th>
                        <th className="px-4 py-3 text-sm font-medium">Descrição</th>
                        <th className="px-4 py-3 text-sm font-medium">Valor</th>
                        <th className="px-4 py-3 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3 text-sm">15/10/2023</td>
                        <td className="px-4 py-3">BMW Série 3 2025 - 100 bilhetes</td>
                        <td className="px-4 py-3 font-medium">R$ 10,00</td>
                        <td className="px-4 py-3">
                          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Aprovado
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 text-sm">28/09/2023</td>
                        <td className="px-4 py-3">BMW Série 3 2025 - 400 bilhetes</td>
                        <td className="px-4 py-3 font-medium">R$ 38,00</td>
                        <td className="px-4 py-3">
                          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Aprovado
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;