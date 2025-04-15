import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cliente, Conta, Agencia } from "../types";
import { getClientes, getContas, getAgencias } from "../services/api";

// Hook personalizado para carregar os detalhes de um cliente
export function useClienteDetalhes() {
  // Extrai o ID do cliente a partir da URL (params da rota)
  const { id } = useParams<{ id: string }>();

  // Estados para armazenar os dados carregados
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);
  const [loading, setLoading] = useState(true); // Controla estado de carregamento
  const [erro, setErro] = useState<string | null>(null); // Armazena possíveis erros

  // Hook de efeito que executa a busca dos dados assim que o ID mudar
  useEffect(() => {
    async function fetchData() {
      try {
        // Realiza todas as chamadas de dados em paralelo
        const [clientes, contas, agencias] = await Promise.all([
          getClientes(),
          getContas(),
          getAgencias(),
        ]);

        // Localiza o cliente correspondente ao ID
        const clienteSelecionado = clientes.find((c) => c.id === id);

        if (!clienteSelecionado) {
          setErro("Cliente não encontrado.");
          return;
        }

        // Atualiza o estado com os dados do cliente
        setCliente(clienteSelecionado);

        // Filtra as contas relacionadas ao CPF/CNPJ do cliente
        const contasCliente = contas.filter(
          (conta) => conta.cpfCnpjCliente === clienteSelecionado.cpfCnpj
        );
        setContas(contasCliente);

        // Localiza a agência associada ao cliente
        const agenciaCliente =
          agencias.find(
            (ag) => ag.codigo === clienteSelecionado.codigoAgencia
          ) || null;
        setAgencia(agenciaCliente);
      } catch (e) {
        // Em caso de erro, registra no console e atualiza estado de erro
        console.error("Erro ao carregar dados:", e);
        setErro("Erro ao carregar dados.");
      } finally {
        // Finaliza o carregamento
        setLoading(false);
      }
    }

    // Executa a função de busca de dados
    fetchData();
  }, [id]);

  // Retorna os dados e estados para serem usados no componente
  return { cliente, contas, agencia, loading, erro };
}
