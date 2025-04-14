import React from 'react';
import { Link } from 'react-router-dom';
import { Cliente } from '../types';

interface ClienteCardProps {
    cliente: Cliente;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ cliente }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between transition hover:shadow-lg">
            <div>
                <h2 className="text-lg font-semibold text-gray-800">{cliente.nome}</h2>
                <p className="text-sm text-gray-500">CPF/CNPJ: {cliente.cpfCnpj}</p>
                <p className="text-sm text-gray-500 mt-1">Email: {cliente.email}</p>
            </div>
            <Link
                to={`/cliente/${cliente.id}`}
                className="mt-4 text-sm text-blue-600 hover:underline self-start"
            >
                Ver detalhes →
            </Link>
        </div>
    );
};

export default ClienteCard;