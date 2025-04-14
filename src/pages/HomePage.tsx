import { useEffect, useState } from 'react';
import { Cliente } from '../types';
import { getClientes } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [busca, setBusca] = useState('');
    const [pagina, setPagina] = useState(1);
    const porPagina = 10;

    useEffect(() => {
        getClientes().then(setClientes);
    }, []);

    const filtrados = clientes.filter(c =>
        c.nome.toLowerCase().includes(busca.toLowerCase()) ||
        c.cpfCnpj.includes(busca)
    );

    const totalPaginas = Math.ceil(filtrados.length / porPagina);
    const inicio = (pagina - 1) * porPagina;
    const fim = inicio + porPagina;
    const paginaAtual = filtrados.slice(inicio, fim);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Lista de Clientes</h1>

            <div className="mb-4 px-2 sm:px-0">
                <input
                    type="text"
                    placeholder="Buscar por nome ou CPF/CNPJ"
                    value={busca}
                    onChange={(e) => {
                        setBusca(e.target.value);
                        setPagina(1);
                    }}
                    className="border p-2 rounded w-full max-w-md mx-auto block"
                />
            </div>

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
                        {paginaAtual.map((cliente) => (
                            <tr key={cliente.id} className="hover:bg-gray-50">
                                <td className="border p-2 whitespace-nowrap max-w-[200px] sm:max-w-none truncate">{cliente.nome}</td>
                                <td className="border p-2 whitespace-nowrap max-w-[160px] sm:max-w-none truncate">{cliente.cpfCnpj}</td>
                                <td className="border p-2 whitespace-nowrap">R$ {cliente.rendaAnual.toLocaleString()}</td>
                                <td className="border p-2 whitespace-nowrap text-center">
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

                {/* Layout mobile */}
                <div className="sm:hidden space-y-4">
                    {paginaAtual.map((cliente) => (
                        <div key={cliente.id} className="border rounded p-4 shadow-sm">
                            <p className="text-sm font-semibold">Nome: <span className="font-normal">{cliente.nome}</span></p>
                            <p className="text-sm font-semibold">CPF/CNPJ: <span className="font-normal">{cliente.cpfCnpj}</span></p>
                            <p className="text-sm font-semibold">Renda Anual: <span className="font-normal">R$ {cliente.rendaAnual.toLocaleString()}</span></p>
                            <div className="mt-2">
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

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4 text-sm px-2 sm:px-0">
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
