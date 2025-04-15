import { Agencia } from '../types';

// Define a interface para as props recebidas pelo componente
interface Props {
    agencia: Agencia | null; // Pode ser uma agência ou null
}

// Componente responsável por exibir informações da agência
export const InfoAgencia: React.FC<Props> = ({ agencia }) => (
    <>
        {/* Título da seção */}
        <h2 className="text-xl font-bold mt-6 mb-2">Agência</h2>

        {/* Verifica se existe uma agência válida */}
        {agencia ? (
            <div>
                {/* Exibe o nome da agência */}
                <p>
                    <strong>Nome:</strong> {agencia.nome}
                </p>

                {/* Exibe o endereço da agência */}
                <p>
                    <strong>Endereço:</strong> {agencia.endereco}
                </p>
            </div>
        ) : (
            // Caso a agência não seja encontrada
            <p>Agência não encontrada.</p>
        )}
    </>
);
