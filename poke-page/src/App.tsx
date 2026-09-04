import { useEffect } from "react";

import OrbitalIcon from "./assets/icons/orbital-rounded.png";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import PokemonModal from "./components/PokemonModal/PokemonModal";

import { prefetchPokemonDetails } from "./hooks/usePokemonDetails";
import { usePokemonSelection } from "./hooks/usePokemonSelection";
import { usePokedex } from "./hooks/usePokedex";

import styles from "./App.module.scss";


function App() {
  const { pokemons, isLoading, error } = usePokedex();
  const { selectedId, openPokemon, select, close, step } =
    usePokemonSelection(pokemons);

  /* Espécie e cadeia são o que falta para abrir um card, e só aparecem ao
     clicar. Buscá-las assim que a grade existe tira a espera da primeira
     abertura; em fila, para não disparar tudo de uma vez sobre a API. */
  useEffect(() => {
    if (pokemons.length === 0) return;

    void prefetchPokemonDetails(pokemons.map((pokemon) => pokemon.id));
  }, [pokemons]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.logoIcon} src={OrbitalIcon} alt="" />
        </div>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Orbital</h1>
          <p className={styles.subtitle}>Frontend Challenge</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.status} role="status" aria-live="polite">
          {error && <span className={styles.emptyState}>{error}</span>}

          {isLoading && <span className={styles.emptyState}>Loading…</span>}
        </div>

        {!isLoading && !error && (
          <ul className={styles.grid}>
            {pokemons.map((pokemon) => (
              <li key={pokemon.id}>
                <PokemonCard
                  id={pokemon.id}
                  name={pokemon.name}
                  spriteUrl={pokemon.sprites.other.home.front_default ?? ""}
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
          selectableIds={pokemons.map((pokemon) => pokemon.id)}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onSelectEvolution={select}
        />
      )}
    </div>
  );
}

export default App;
