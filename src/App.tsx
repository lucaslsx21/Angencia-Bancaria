import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-y-2">
          <Link to="/" className="text-2xl font-bold whitespace-nowrap">Banco XYZ</Link>
          <nav className="w-full sm:w-auto flex justify-center sm:justify-end gap-4">
            <Link to="/" className="hover:underline">Clientes</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Banco XYZ. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;