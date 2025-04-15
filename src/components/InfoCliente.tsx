import { Cliente } from '../types';

// Define a interface para as props recebidas pelo componente
interface Props {
    cliente: Cliente; // O cliente cujas informações serão exibidas
}

// Componente responsável por renderizar os dados do cliente
export const InfoCliente: React.FC<Props> = ({ cliente }) => (
    <>
        {/* Exibe o nome completo do cliente */}
        <p>
            <strong>Nome:</strong> {cliente.nome}
        </p>

        {/* Exibe o nome social, se existir */}
        {cliente.nomeSocial && (
            <p>
                <strong>Nome Social:</strong> {cliente.nomeSocial}
            </p>
        )}

        {/* Documento do cliente: CPF ou CNPJ */}
        <p>
            <strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}
        </p>

        {/* Exibe o RG, ou 'Não informado' se estiver ausente */}
        <p>
            <strong>RG:</strong> {cliente.rg || 'Não informado'}
        </p>

        {/* Data de nascimento formatada para o padrão local */}
        <p>
            <strong>Data de Nascimento:</strong> {cliente.dataNascimento.toLocaleDateString()}
        </p>

        {/* Exibe o e-mail do cliente */}
        <p>
            <strong>Email:</strong> {cliente.email}
        </p>

        {/* Endereço do cliente */}
        <p>
            <strong>Endereço:</strong> {cliente.endereco}
        </p>

        {/* Renda anual formatada com separadores de milhar */}
        <p>
            <strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toLocaleString()}
        </p>

        {/* Patrimônio formatado */}
        <p>
            <strong>Patrimônio:</strong> R$ {cliente.patrimonio.toLocaleString()}
        </p>

        {/* Estado civil do cliente */}
        <p>
            <strong>Estado Civil:</strong> {cliente.estadoCivil}
        </p>
    </>
);
