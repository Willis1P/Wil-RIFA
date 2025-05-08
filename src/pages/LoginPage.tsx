import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/meus-bilhetes');
      } else {
        setErrorMessage('E-mail ou senha incorretos.');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-gray-50 rounded-xl shadow-lg p-8">
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h1 className="text-3xl font-bold text-center">Entrar</h1>
        </div>
        
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email" className="form-label bg-gray-100 px-3 py-1 rounded">E-mail</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="form-input pl-10 bg-white"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="form-group">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="form-label bg-gray-100 px-3 py-1 rounded">Senha</label>
              <a href="#" className="text-sm text-gray-600 hover:text-black bg-gray-100 px-3 py-1 rounded">
                Esqueceu a senha?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="form-input pl-10 bg-white"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-black font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;