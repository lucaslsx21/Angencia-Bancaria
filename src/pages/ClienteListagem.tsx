import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getClientes } from '../services/api';
import { formatCPFCNPJ } from '../lib/utils';
import styles from './ClienteListagem.module.css';

export function ClientesList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['clientes', page, search],
        queryFn: () => getClientes(page, search),
    });

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div>Carregando...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Clientes</h1>
                <div className={styles.searchContainer}>
                    <Search className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou CPF/CNPJ"
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.table}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th className={styles.tableHeaderCell}>Nome</th>
                            <th className={styles.tableHeaderCell}>CPF/CNPJ</th>
                            <th className={styles.tableHeaderCell}>Email</th>
                            <th className={styles.tableHeaderCell} style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data && data.data.map((cliente) => (
                            <tr key={cliente.id}>
                                <td className={styles.tableCell}>
                                    <div className={styles.tableCellContent}>{cliente.nome}</div>
                                    {cliente.nomeSocial && (
                                        <div className={styles.socialName}>{cliente.nomeSocial}</div>
                                    )}
                                </td>
                                <td className={styles.tableCell}>
                                    <div className={styles.tableCellContent}>{formatCPFCNPJ(cliente.cpfCnpj)}</div>
                                </td>
                                <td className={styles.tableCell}>
                                    <div className={styles.tableCellContent}>{cliente.email}</div>
                                </td>
                                <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                                    <Link to={`/cliente/${cliente.id}`} className={styles.link}>
                                        Ver detalhes
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {!data?.data?.length && (
                            <tr>
                                <td colSpan={4} className={styles.emptyState}>
                                    Nenhum cliente encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                <div className={styles.paginationText}>
                    Mostrando {data?.data?.length ? ((page - 1) * 10) + 1 : 0} a {Math.min(page * 10, data?.total || 0)} de {data?.total || 0} resultados
                </div>
                <div className={styles.paginationButtons}>
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={styles.paginationButton}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={!data || page * 10 >= data.total}
                        className={styles.paginationButton}
                    >
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
}