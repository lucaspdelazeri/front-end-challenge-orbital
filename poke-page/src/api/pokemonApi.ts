import type {
  ChainLink,
  EvolutionChain,
  EvolutionStage,
  Pokemon,
  PokemonSpecies,
} from "../types/pokemon";
import { axiosClient } from "./axiosClient";

// A seleção do design: os três iniciais de Kanto e mais cinco da rota inicial.
export const POKEDEX_NAMES = [
  "bulbasaur",
  "charmander",
  "squirtle",
  "caterpie",
  "pidgey",
  "rattata",
  "ekans",
  "pikachu",
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

export async function fetchPokedex(signal?: AbortSignal): Promise<Pokemon[]> {
  return Promise.all(POKEDEX_NAMES.map((name) => fetchPokemon(name, signal)));
}

export async function fetchSpecies(
  id: number,
  signal?: AbortSignal,
): Promise<PokemonSpecies> {
  const { data } = await axiosClient.get<PokemonSpecies>(
    `/pokemon-species/${id}`,
    { signal },
  );
  return data;
}

export async function fetchEvolutionStages(
  chainUrl: string,
  signal?: AbortSignal,
): Promise<EvolutionStage[]> {
  const { data } = await axiosClient.get<EvolutionChain>(chainUrl, { signal });

  return Promise.all(
    flattenChain(data.chain).map(async ({ id, name }) => {
      const pokemon = await fetchPokemon(String(id), signal);
      return {
        id,
        name,
        spriteUrl: pokemon.sprites.other.home.front_default ?? "",
      };
    }),
  );
}

function flattenChain(link: ChainLink): { id: number; name: string }[] {
  const id = speciesIdFromUrl(link.species.url);
  const current = id === null ? [] : [{ id, name: link.species.name }];

  return [...current, ...link.evolves_to.flatMap(flattenChain)];
}

function speciesIdFromUrl(url: string): number | null {
  const match = url.match(/\/pokemon-species\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}
