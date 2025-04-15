import Papa from 'papaparse';
import { Cliente, Conta, Agencia } from "../types";

// Função genérica para buscar e transformar dados de um arquivo CSV
const clientesUrl =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";
const contasUrl =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";
const agenciasUrl =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

async function fetchCSV<T>(
  url: string,
  transform: (item: Record<string, string>) => T
): Promise<T[]> {
  const response = await fetch(url);
  const text = await response.text();
  // Retorna uma Promise que usa o PapaParse para transformar os dados do CSV
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<Record<string, string>>) => {
        resolve((results.data as Record<string, string>[]).map(transform));
      },
      error: (err: Error) => reject(err),
    });
  });
}

// Função para buscar e transformar dados dos clientes
export async function getClientes(): Promise<Cliente[]> {
  return fetchCSV<Cliente>(clientesUrl, (item) => ({
    id: item.id,
    cpfCnpj: item.cpfCnpj,
    rg: item.rg || undefined,
    dataNascimento: new Date(item.dataNascimento),
    nome: item.nome,
    nomeSocial: item.nomeSocial || undefined,
    email: item.email,
    endereco: item.endereco,
    rendaAnual: parseFloat(item.rendaAnual),
    patrimonio: parseFloat(item.patrimonio),
    estadoCivil: item.estadoCivil as "Solteiro" | "Casado" | "Viúvo" | "Divorciado",
    codigoAgencia: Number(item.codigoAgencia),
  }));
}

// Função para buscar e transformar dados das contas bancárias
export async function getContas(): Promise<Conta[]> {
  return fetchCSV<Conta>(contasUrl, (item) => ({
    id: item.id,
    cpfCnpjCliente: item.cpfCnpjCliente,
    tipo: item.tipo as 'corrente' | 'poupanca',
    saldo: parseFloat(item.saldo),
    limiteCredito: parseFloat(item.limiteCredito),
    creditoDisponivel: parseFloat(item.creditoDisponivel),
  }));
}

// Função para buscar e transformar dados das agências bancárias
export async function getAgencias(): Promise<Agencia[]> {
  return fetchCSV<Agencia>(agenciasUrl, (item) => ({
    id: item.id,
    codigo: Number(item.codigo),
    nome: item.nome,
    endereco: item.endereco,
  }));
}
