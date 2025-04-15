import { type ClassValue, clsx } from "clsx"; 
import { twMerge } from "tailwind-merge";

// Função utilitária para combinar classes CSS de forma inteligente com Tailwind
export function cn(...inputs: ClassValue[]) {
  // clsx combina as classes, e twMerge resolve os conflitos do Tailwind (ex: 'p-2' vs 'p-4')
  return twMerge(clsx(inputs));
}

// Função que formata um número como moeda no padrão brasileiro (R$)
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency", // Define o estilo como moeda
    currency: "BRL", // Define a moeda como Real brasileiro (R$)
  }).format(value); // Aplica a formatação ao valor passado
}

// Função que formata automaticamente CPF (11 dígitos) ou CNPJ (14 dígitos)
export function formatCPFCNPJ(value: string): string {
  // Se tiver 11 caracteres, formata como CPF: XXX.XXX.XXX-XX
  if (value.length === 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }

  // Se tiver mais de 11 (geralmente 14), formata como CNPJ: XX.XXX.XXX/XXXX-XX
  return value.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    "$1.$2.$3/$4-$5"
  );
}
