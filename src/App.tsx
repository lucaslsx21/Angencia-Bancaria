import { Outlet, Link } from 'react-router-dom';
import Logo from './assets/Logo-Banco.png';

// Componente principal que envolve o layout da aplicação
const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-blue-700 text-white px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-y-2">
          {/* Logo + Título do Banco */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Logo do Banco"
              className="h-24 w-auto" // Ajusta o tamanho da imagem da logo
            />
            <span className="text-2xl font-bold whitespace-nowrap">
              Banco Banestes Cover
            </span>
          </Link>

          {/* Navegação - Links de navegação da aplicação */}
          <nav className="w-full sm:w-auto flex justify-center sm:justify-end gap-4">
            {/* Link para a página de clientes */}
            <Link to="/" className="hover:underline">
              Clientes
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal da aplicação */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* O Outlet renderiza o conteúdo das rotas filhas */}
        <Outlet />
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
        {/* Exibe o ano atual dinâmico */}
        © {new Date().getFullYear()} Banco Banestes Cover. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;
