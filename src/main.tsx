import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ClienteDetalhes from './pages/ClienteDetalhes';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> {/* Layout compartilhado pode ser colocado aqui futuramente */}
          <Route index element={<HomePage />} />
          <Route path="cliente/:id" element={<ClienteDetalhes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

export { App };