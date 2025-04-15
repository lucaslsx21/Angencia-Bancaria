import React from 'react';
import { Link } from 'react-router-dom';
import { Cliente } from '../types';

//Define os tipos esperados para as props do componente ClienteCard
interface ClienteCardProps {
    cliente: Cliente; // A propriedade cliente deve seguir a estrutura do tipo Cliente
}

//Define o componente funcional ClienteCard, que recebe um cliente como prop
const ClienteCard: React.FC<ClienteCardProps> = ({ cliente }) => {
    return (
        //Container do card com estilos para aparência e interatividade
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between transition hover:shadow-lg">

            {/* Bloco superior com informações principais do cliente */}
            <div>
                {/* Nome do cliente em destaque */}
                <h2 className="text-lg font-semibold text-gray-800">
                    {cliente.nome}
                </h2>

                {/* CPF ou CNPJ do cliente */}
                <p className="text-sm text-gray-500">
                    CPF/CNPJ: {cliente.cpfCnpj}
                </p>

                {/* Email do cliente */}
                <p className="text-sm text-gray-500 mt-1">
                    Email: {cliente.email}
                </p>
            </div>

            {/* Link para visualizar mais detalhes do cliente */}
            <Link
                to={`/cliente/${cliente.id}`} // Rota dinâmica com o ID do cliente
                className="mt-4 text-sm text-blue-600 hover:underline self-start"
            >
                Ver detalhes →
            </Link>
        </div>
    );
};

//Exporta o componente para ser utilizado em outras partes da aplicação
export default ClienteCard;
