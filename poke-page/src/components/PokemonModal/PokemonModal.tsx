import { useEffect } from "react";

import CaretLeftIcon from "../icons/CaretLeftIcon";
import CaretRightIcon from "../icons/CaretRightIcon";
import CloseIcon from "../icons/CloseIcon";

import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useScrollLock } from "../../hooks/useScrollLock";

import type { Pokemon } from "../../types/pokemon";

import styles from "./PokemonModal.module.scss";

type PokemonModalProps = {
  pokemon: Pokemon;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque esp.",
  "special-defense": "Defesa esp.",
  speed: "Velocidade",
};

const TYPE_LABELS: Record<string, string> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Grama",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
};

/* as barras usam 160 como régua: é a faixa em que ficam as maiores estatísticas base do jogo. */
const STAT_SCALE = 160;

function formatDexNumber(id: number) {
  return "#" + String(id).padStart(3, "0");
}

/* a API devolve altura em decímetros e peso em hectogramas */
function formatMeasure(raw: number, unit: string) {
  return `${(raw / 10).toFixed(1).replace(".", ",")} ${unit}`;
}

function PokemonModal({ pokemon, onClose, onPrev, onNext }: PokemonModalProps) {
  useScrollLock();
  const dialogRef = useFocusTrap<HTMLDivElement>();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const total = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  const spriteUrl =
    pokemon.sprites.other["official-artwork"].front_default ?? "";

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={pokemon.name}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.identity}>
            <span className={styles.number}>{formatDexNumber(pokemon.id)}</span>
            <h2 className={styles.name}>{pokemon.name}</h2>
            <div className={styles.types}>
              {pokemon.types.map(({ type }) => (
                <span key={type.name} className={styles.tag}>
                  {TYPE_LABELS[type.name] ?? type.name}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={onPrev}
              title="Anterior"
              aria-label="Anterior"
            >
              <CaretLeftIcon className={styles.buttonIcon} />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={onNext}
              title="Próximo"
              aria-label="Próximo"
            >
              <CaretRightIcon className={styles.buttonIcon} />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={onClose}
              title="Fechar"
              aria-label="Fechar"
            >
              <CloseIcon className={styles.buttonIcon} />
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.media}>
            <div className={styles.spriteBox}>
              <img
                className={styles.sprite}
                src={spriteUrl}
                alt={pokemon.name}
              />
            </div>

            <div className={styles.measures}>
              <div className={styles.measure}>
                <span className={styles.measureLabel}>Altura</span>
                <span className={styles.measureValue}>
                  {formatMeasure(pokemon.height, "m")}
                </span>
              </div>
              <div className={styles.measure}>
                <span className={styles.measureLabel}>Peso</span>
                <span className={styles.measureValue}>
                  {formatMeasure(pokemon.weight, "kg")}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            <span className={styles.statsTitle}>Estatísticas base</span>

            {pokemon.stats.map(({ stat, base_stat }) => (
              <div key={stat.name} className={styles.stat}>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>
                    {STAT_LABELS[stat.name] ?? stat.name}
                  </span>
                  <span className={styles.statValue}>{base_stat}</span>
                </div>
                <div className={styles.track}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${Math.round((base_stat / STAT_SCALE) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className={styles.total}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
