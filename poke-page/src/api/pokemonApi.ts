import type { Pokemon } from "../types/pokemon";
import { axiosClient } from "./axiosClient";

// Kanto: Bulbasaur, Charmander, Squirtle · Johto: Chikorita, Cyndaquil, Totodile
export const STARTER_NAMES = [
  "bulbasaur",
  "charmander",
  "squirtle",
  "chikorita",
  "cyndaquil",
  "totodile",
];

export async function fetchPokemon(
  name: string,
  signal?: AbortSignal,
): Promise<Pokemon> {
  const { data } = await axiosClient.get<Pokemon>(
    `/pokemon/${name.toLowerCase()}`,
    { signal },
  );
  return data;
}

export async function fetchStarters(signal?: AbortSignal): Promise<Pokemon[]> {
  return Promise.all(STARTER_NAMES.map((name) => fetchPokemon(name, signal)));
}
