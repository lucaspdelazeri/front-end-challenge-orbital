import { useState } from "react";

import type { Pokemon } from "../types/pokemon";

export function usePokemonSelection(pokemons: Pokemon[]) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  const openPokemon = pokemons.find((pokemon) => pokemon.id === openId) ?? null;

  function select(id: number) {
    setSelectedId(id);
    setOpenId(id);
  }

  function close() {
    setOpenId(null);
  }

  // anda na lista completa e dá a volta nas pontas
  function step(direction: number) {
    const index = pokemons.findIndex((pokemon) => pokemon.id === openId);
    if (index < 0) return;

    const next =
      pokemons[(index + direction + pokemons.length) % pokemons.length];
    setSelectedId(next.id);
    setOpenId(next.id);
  }

  return { selectedId, openPokemon, select, close, step };
}
