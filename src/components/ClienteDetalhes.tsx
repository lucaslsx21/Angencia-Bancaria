import { Link } from 'react-router-dom';
import { useClienteDetalhes } from '../hooks/useClienteDetalhes';
import { InfoCliente } from './InfoCliente';
import { ListaContas } from './ListaContas';
import { InfoAgencia } from './InfoAgencia';

// Componente principal que exibe os detalhes de um cliente
const ClienteDetalhes = () => {
  // Desestrutura os dados retornados pelo hook
  const { cliente, contas, agencia, loading, erro } = useClienteDetalhes();

  // Enquanto os dados estão sendo carregados, exibe uma mensagem
  if (loading) {
    return <div className="p-4">Carregando dados do cliente...</div>;
  }

  // Caso ocorra um erro na busca dos dados
  if (erro) {
    return <div className="p-4 text-red-600">{erro}</div>;
  }

  // Se por algum motivo o cliente não for encontrado, não renderiza nada
  if (!cliente) return null;

  // Renderiza os dados do cliente, contas e agência
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Cliente</h1>

      {/* Exibe as informações do cliente */}
      <InfoCliente cliente={cliente} />

      {/* Lista as contas associadas ao cliente */}
      <ListaContas contas={contas} />

      {/* Exibe informações da agência vinculada */}
      <InfoAgencia agencia={agencia} />

      {/* Link para voltar à listagem geral */}
      <div className="mt-4">
        <Link to="/" className="text-blue-600 underline">
          ← Voltar para lista
        </Link>
      </div>
    </div>
  );
};

export default ClienteDetalhes;
