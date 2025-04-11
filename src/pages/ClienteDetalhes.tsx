import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCliente, getContasCliente, getAgencia } from '../services/api';
import { formatCurrency, formatCPFCNPJ } from '../lib/utils';
import { formatWithOptions } from 'date-fns/fp';
import { ptBR } from 'date-fns/locale';

export function ClienteDetails() {
    const { id } = useParams<{ id: string }>();

    const { data: cliente, isLoading: isLoadingCliente } = useQuery({
        queryKey: ['cliente', id],
        queryFn: () => getCliente(id!),
    });

    const { data: contas, isLoading: isLoadingContas } = useQuery({
        queryKey: ['contas', cliente?.cpfCnpj],
        queryFn: () => getContasCliente(cliente!.cpfCnpj),
        enabled: !!cliente,
    });

    const { data: agencia, isLoading: isLoadingAgencia } = useQuery({
        queryKey: ['agencia', cliente?.codigoAgencia],
        queryFn: () => getAgencia(cliente!.codigoAgencia),
        enabled: !!cliente,
    });

    if (isLoadingCliente || isLoadingContas || isLoadingAgencia) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Carregando...</div>
            </div>
        );
    }

    if (!cliente) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900">Cliente não encontrado</h2>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Detalhes do Cliente</h1>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Informações Pessoais</h2>
                </div>
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Nome</dt>
                        <dd className="mt-1 text-sm text-gray-900">{cliente.nome}</dd>
                    </div>
                    {cliente.nomeSocial && (
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Nome Social</dt>
                            <dd className="mt-1 text-sm text-gray-900">{cliente.nomeSocial}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="text-sm font-medium text-gray-500">CPF/CNPJ</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatCPFCNPJ(cliente.cpfCnpj)}</dd>
                    </div>
                    {cliente.rg && (
                        <div>
                            <dt className="text-sm font-medium text-gray-500">RG</dt>
                            <dd className="mt-1 text-sm text-gray-900">{cliente.rg}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Data de Nascimento</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            {formatWithOptions({ locale: ptBR })("dd 'de' MMMM 'de' yyyy")(new Date(cliente.dataNascimento))}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Estado Civil</dt>
                        <dd className="mt-1 text-sm text-gray-900">{cliente.estadoCivil}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">{cliente.email}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Endereço</dt>
                        <dd className="mt-1 text-sm text-gray-900">{cliente.endereco}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Renda Anual</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatCurrency(cliente.rendaAnual)}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Patrimônio</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatCurrency(cliente.patrimonio)}</dd>
                    </div>
                </div>
            </div>

            {agencia && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Informações da Agência</h2>
                    </div>
                    <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Código</dt>
                            <dd className="mt-1 text-sm text-gray-900">{agencia.codigo}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Nome</dt>
                            <dd className="mt-1 text-sm text-gray-900">{agencia.nome}</dd>
                        </div>
                        <div className="md:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Endereço</dt>
                            <dd className="mt-1 text-sm text-gray-900">{agencia.endereco}</dd>
                        </div>
                    </div>
                </div>
            )}

            {contas && contas.length > 0 && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Contas Bancárias</h2>
                    </div>
                    <div className="px-6 py-5">
                        <div className="grid grid-cols-1 gap-6">
                            {contas.map((conta) => (
                                <div key={conta.id} className="border rounded-lg p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Tipo de Conta</dt>
                                            <dd className="mt-1 text-sm text-gray-900 capitalize">{conta.tipo}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Saldo</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{formatCurrency(conta.saldo)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Limite de Crédito</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{formatCurrency(conta.limiteCredito)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Crédito Disponível</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{formatCurrency(conta.creditoDisponivel)}</dd>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}