
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Sistema Bancário</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        &copy; 2025 Banco. Todos os direitos reservados.
      </footer>
    </div>
  );
}