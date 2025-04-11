import axios from "axios";
import type { Agencia, Cliente, Conta } from "../types";

const api = axios.create({
  baseURL: "API_URL_HERE", // Replace with actual API URL
});

export async function getClientes(
  page: number = 1,
  search?: string
): Promise<{ data: Cliente[]; total: number }> {
  const params = new URLSearchParams();
  params.append("page", String(page));
  if (search) params.append("search", search);

  const response = await api.get<{ data: Cliente[]; total: number }>(
    "/clientes",
    { params }
  );
  return response.data;
}

export async function getCliente(id: string): Promise<Cliente> {
  const response = await api.get<Cliente>(`/clientes/${id}`);
  return response.data;
}

export async function getContasCliente(cpfCnpj: string): Promise<Conta[]> {
  const response = await api.get<Conta[]>(`/contas/${cpfCnpj}`);
  return response.data;
}

export async function getAgencia(codigo: number): Promise<Agencia> {
  const response = await api.get<Agencia>(`/agencias/${codigo}`);
  return response.data;
}
