import { useEffect, useState } from "react";

import { fetchEvolutionStages, fetchSpecies } from "../api/pokemonApi";
import type { EvolutionStage } from "../types/pokemon";

type Details = {
  id: number;
  genus: string | null;
  evolutions: EvolutionStage[];
};

const cache = new Map<number, Details>();

/* As buscas em curso ficam guardadas junto: quem pedir o mesmo Pokémon no meio
   do caminho aproveita a mesma promessa em vez de abrir outra requisição.
   É também o que faz o aquecimento e a abertura se encontrarem, quando o
   usuário clica num card antes de a prévia daquele ter terminado. */
const pending = new Map<number, Promise<Details>>();

function loadDetails(id: number): Promise<Details> {
  const done = cache.get(id);
  if (done) return Promise.resolve(done);

  const inFlight = pending.get(id);
  if (inFlight) return inFlight;

  const request = (async () => {
    const species = await fetchSpecies(id);

    const genus =
      species.genera.find((item) => item.language.name === "en")?.genus ?? null;

    const evolutions = await fetchEvolutionStages(species.evolution_chain.url);
    const details: Details = { id, genus, evolutions };

    cache.set(id, details);
    return details;
  })();

  pending.set(id, request);
  request
    .catch(() => undefined)
    .finally(() => {
      pending.delete(id);
    });

  return request;
}

export async function prefetchPokemonDetails(ids: number[]) {
  for (const id of ids) {
    await loadDetails(id).catch(() => undefined);
  }
}

export function usePokemonDetails(pokemonId: number | null) {
  const [entry, setEntry] = useState<Details | null>(null);

  useEffect(() => {
    if (pokemonId === null || cache.has(pokemonId)) return;

    let active = true;

    loadDetails(pokemonId)
      .then((details) => {
        if (active) setEntry(details);
      })
      .catch(() => {
        if (active) setEntry(null);
      });

    return () => {
      active = false;
    };
  }, [pokemonId]);

  const cached = pokemonId === null ? undefined : cache.get(pokemonId);
  const current = cached ?? (entry?.id === pokemonId ? entry : null);

  return {
    genus: current?.genus ?? null,
    evolutions: current?.evolutions ?? [],
    isLoading: pokemonId !== null && current === null,
  };
}
