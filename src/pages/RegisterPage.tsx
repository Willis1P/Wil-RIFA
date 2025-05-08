import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { User, Mail, Lock, Phone } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useUser();
  const navigate = useNavigate();
  
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
  
  const validateForm = () => {
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return false;
    }
    
    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(name, email, password, phone);
      
      if (success) {
        navigate('/meus-bilhetes');
      } else {
        setErrorMessage('Não foi possível completar o cadastro. Tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro ao tentar fazer o cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Criar conta</h1>
        
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nome completo</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="form-input pl-10"
                placeholder="Seu nome completo"
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
                placeholder="Seu melhor e-mail"
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
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Senha</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="form-input pl-10"
                placeholder="Mínimo de 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirme sua senha</label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                className="form-input pl-10"
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              Concordo com os{' '}
              <a href="#" className="text-black underline">
                termos e condições
              </a>{' '}
              e a{' '}
              <a href="#" className="text-black underline">
                política de privacidade
              </a>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full py-3 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cadastrando...
              </span>
            ) : (
              'Criar conta'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-black font-medium hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;