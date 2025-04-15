import { Conta } from '../types';

// Define as props esperadas pelo componente
interface Props {
    contas: Conta[]; // Lista de contas bancárias do cliente
}

// Componente responsável por exibir as contas bancárias
export const ListaContas: React.FC<Props> = ({ contas }) => (
    <>
        {/* Título da seção de contas bancárias */}
        <h2 className="text-xl font-bold mt-6 mb-2">Contas Bancárias</h2>

        {/* Verifica se há contas a exibir */}
        {contas.length === 0 ? (
            // Mensagem de aviso caso nenhuma conta esteja associada ao cliente
            <p>Nenhuma conta bancária encontrada.</p>
        ) : (
            // Lista todas as contas encontradas
            <ul className="list-disc list-inside">
                {contas.map((conta) => (
                    <li key={conta.id}>
                        {/* Exibe tipo da conta, saldo, limite de crédito e crédito disponível formatados */}
                        <strong>{conta.tipo}</strong>:
                        Saldo R$ {conta.saldo.toLocaleString()} |
                        Limite R$ {conta.limiteCredito.toLocaleString()} |
                        Crédito Disponível R$ {conta.creditoDisponivel.toLocaleString()}
                    </li>
                ))}
            </ul>
        )}
    </>
);
