import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importação das dependências de roteamento
import App from './App';
import HomePage from './pages/HomePage';
import ClienteDetalhes from './components/ClienteDetalhes';
import './index.css'; // Importação do CSS global

// Renderização da aplicação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Configuração do Router para navegar entre as páginas */}
    <BrowserRouter>
      <Routes>
        {/* Rota principal, envolve o layout compartilhado entre as páginas */}
        <Route path="/" element={<App />}>
          {/* Página inicial (HomePage) */}
          <Route index element={<HomePage />} />

          {/* Rota dinâmica para detalhes de um cliente */}
          <Route path="cliente/:id" element={<ClienteDetalhes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

export { App }; // Exportando o componente App para uso em outros locais
