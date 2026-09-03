import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

/* requisição cancelada pelo cleanup do efeito não é falha: não vira mensagem de erro */
export const isAbortError = axios.isCancel;
