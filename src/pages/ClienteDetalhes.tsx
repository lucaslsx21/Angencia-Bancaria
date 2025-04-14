import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Cliente, Conta, Agencia } from '../types';
import { getClientes, getContas, getAgencias } from '../services/api';

const ClienteDetalhes = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [clientes, contas, agencias] = await Promise.all([
        getClientes(),
        getContas(),
        getAgencias(),
      ]);

      const clienteSelecionado = clientes.find((c) => c.id === id);
      if (clienteSelecionado) {
        setCliente(clienteSelecionado);
        setContas(contas.filter((c) => c.cpfCnpjCliente === clienteSelecionado.cpfCnpj));
        setAgencia(agencias.find((a) => a.codigo === clienteSelecionado.codigoAgencia) || null);
      }
    }
    fetchData();
  }, [id]);

  if (!cliente) return <div className="p-4">Carregando dados do cliente...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Cliente</h1>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      {cliente.nomeSocial && <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>}
      <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
      <p><strong>RG:</strong> {cliente.rg || 'Não informado'}</p>
      <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento.toLocaleDateString()}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Endereço:</strong> {cliente.endereco}</p>
      <p><strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toLocaleString()}</p>
      <p><strong>Patrimônio:</strong> R$ {cliente.patrimonio.toLocaleString()}</p>
      <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>

      <h2 className="text-xl font-bold mt-6 mb-2">Contas Bancárias</h2>
      {contas.length === 0 ? (
        <p>Nenhuma conta bancária encontrada.</p>
      ) : (
        <ul className="list-disc list-inside">
          {contas.map((conta) => (
            <li key={conta.id}>
              <strong>{conta.tipo}</strong>: Saldo R$ {conta.saldo.toLocaleString()} | Limite R$ {conta.limiteCredito.toLocaleString()} | Crédito Disponível R$ {conta.creditoDisponivel.toLocaleString()}
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-bold mt-6 mb-2">Agência</h2>
      {agencia ? (
        <div>
          <p><strong>Nome:</strong> {agencia.nome}</p>
          <p><strong>Endereço:</strong> {agencia.endereco}</p>
        </div>
      ) : (
        <p>Agência não encontrada.</p>
      )}

      <div className="mt-4">
        <Link to="/" className="text-blue-600 underline">← Voltar para lista</Link>
      </div>
    </div>
  );
};

export default ClienteDetalhes;