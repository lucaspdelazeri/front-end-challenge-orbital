import { useState } from "react";

import PokeballIcon from "./assets/icons/pokeball-pokemon.svg";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import PokemonModal from "./components/PokemonModal/PokemonModal";
import SearchBar from "./components/SearchBar";

import { usePokemonSelection } from "./hooks/usePokemonSelection";
import { usePokemonStarters } from "./hooks/usePokemonStarters";

import styles from "./App.module.scss";

import "@fontsource-variable/montserrat";

function App() {
  const [search, setSearch] = useState("");
  const { pokemons, isLoading, error } = usePokemonStarters();
  const { selectedId, openPokemon, select, close, step } =
    usePokemonSelection(pokemons);

  const query = search.trim().toLowerCase();
  const filtered = query
    ? pokemons.filter((pokemon) => pokemon.name.includes(query))
    : pokemons;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.logoIcon} src={PokeballIcon} alt="" />
        </div>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Orbital</h1>
          <p className={styles.subtitle}>Frontend Challenge</p>
        </div>
      </header>

      <main className={styles.main}>
        <SearchBar value={search} onChange={setSearch} />

        <div className={styles.status} role="status" aria-live="polite">
          {error && <span className={styles.emptyState}>{error}</span>}

          {isLoading && <span className={styles.emptyState}>Carregando…</span>}

          {!isLoading && !error && filtered.length === 0 && (
            <span className={styles.emptyState}>Nenhum Pokémon encontrado.</span>
          )}
        </div>

        {!isLoading && !error && filtered.length > 0 && (
          <ul className={styles.grid}>
            {filtered.map((pokemon) => (
              <li key={pokemon.id}>
                <PokemonCard
                  id={pokemon.id}
                  name={pokemon.name}
                  spriteUrl={
                    pokemon.sprites.other["official-artwork"].front_default ?? ""
                  }
                  selected={pokemon.id === selectedId}
                  onSelect={select}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      {openPokemon && (
        <PokemonModal
          pokemon={openPokemon}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </div>
  );
}

export default App;
