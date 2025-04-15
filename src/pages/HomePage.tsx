import { useEffect, useState } from 'react';
import { Cliente } from '../types';
import { getClientes } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
    // Estado para armazenar os clientes, filtro de busca e controle de paginação
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [busca, setBusca] = useState('');        // Valor de busca (nome ou CPF/CNPJ)
    const [pagina, setPagina] = useState(1);       // Página atual para navegação
    const porPagina = 10;                          // Limite de clientes por página

    // Efeito colateral para buscar os dados dos clientes ao carregar a página
    useEffect(() => {
        getClientes().then(setClientes);  // Atualiza o estado com a lista de clientes
    }, []);

    // Filtra os clientes conforme a busca realizada
    const filtrados = clientes.filter(c =>
        c.nome.toLowerCase().includes(busca.toLowerCase()) ||    // Busca por nome
        c.cpfCnpj.includes(busca)                                  // Busca por CPF/CNPJ
    );

    // Cálculo do total de páginas com base no número de clientes filtrados
    const totalPaginas = Math.ceil(filtrados.length / porPagina);

    // Calcula o índice inicial e final para a paginação
    const inicio = (pagina - 1) * porPagina;
    const fim = inicio + porPagina;

    // Obtém os clientes da página atual
    const paginaAtual = filtrados.slice(inicio, fim);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            {/* Título da página */}
            <h1 className="text-2xl font-bold mb-4 text-center">Lista de Clientes</h1>

            {/* Campo de busca */}
            <div className="mb-4 px-2 sm:px-0">
                <input
                    type="text"
                    placeholder="Buscar por nome ou CPF/CNPJ"
                    value={busca}
                    onChange={(e) => {
                        setBusca(e.target.value);  // Atualiza o valor da busca
                        setPagina(1);              // Reseta para a primeira página ao buscar
                    }}
                    className="border p-2 rounded w-full max-w-md mx-auto block"
                />
            </div>

            {/* Tabela de clientes (desktop) */}
            <div className="overflow-x-auto px-2 sm:px-0">
                <table className="w-full min-w-[640px] border text-left text-sm hidden sm:table">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 whitespace-nowrap">Nome</th>
                            <th className="border p-2 whitespace-nowrap">CPF/CNPJ</th>
                            <th className="border p-2 whitespace-nowrap">Renda Anual</th>
                            <th className="border p-2 whitespace-nowrap">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeia os clientes da página atual */}
                        {paginaAtual.map((cliente) => (
                            <tr key={cliente.id} className="hover:bg-gray-50">
                                <td className="border p-2 whitespace-nowrap max-w-[200px] sm:max-w-none truncate">{cliente.nome}</td>
                                <td className="border p-2 whitespace-nowrap max-w-[160px] sm:max-w-none truncate">{cliente.cpfCnpj}</td>
                                <td className="border p-2 whitespace-nowrap">R$ {cliente.rendaAnual.toLocaleString()}</td>
                                <td className="border p-2 whitespace-nowrap text-center">
                                    {/* Link para página de detalhes do cliente */}
                                    <Link
                                        to={`/cliente/${cliente.id}`}
                                        className="text-blue-600 underline text-xs sm:text-sm md:text-base"
                                    >
                                        Ver Detalhes
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Layout mobile (quando a tela é menor) */}
                <div className="sm:hidden space-y-4">
                    {paginaAtual.map((cliente) => (
                        <div key={cliente.id} className="border rounded p-4 shadow-sm">
                            <p className="text-sm font-semibold">Nome: <span className="font-normal">{cliente.nome}</span></p>
                            <p className="text-sm font-semibold">CPF/CNPJ: <span className="font-normal">{cliente.cpfCnpj}</span></p>
                            <p className="text-sm font-semibold">Renda Anual: <span className="font-normal">R$ {cliente.rendaAnual.toLocaleString()}</span></p>
                            <div className="mt-2">
                                {/* Link para detalhes do cliente no layout mobile */}
                                <Link
                                    to={`/cliente/${cliente.id}`}
                                    className="text-blue-600 underline text-sm"
                                >
                                    Ver Detalhes
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controles de paginação */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4 text-sm px-2 sm:px-0">
                {/* Botão de página anterior */}
                <button
                    onClick={() => setPagina((p) => Math.max(p - 1, 1))}
                    disabled={pagina === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span>
                    Página {pagina} de {totalPaginas}
                </span>
                {/* Botão de página seguinte */}
                <button
                    onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
                    disabled={pagina === totalPaginas}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default HomePage;
