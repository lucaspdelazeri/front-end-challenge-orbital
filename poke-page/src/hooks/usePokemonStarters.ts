import { useEffect, useState } from "react";
import { isAbortError } from "../api/axiosClient";
import { fetchStarters } from "../api/pokemonApi";
import type { Pokemon } from "../types/pokemon";

export function usePokemonStarters() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchStarters(controller.signal)
      .then(setPokemons)
      .catch((cause: unknown) => {
        if (isAbortError(cause)) return;
        setError("Não foi possível carregar os Pokémon.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { pokemons, isLoading, error };
}
