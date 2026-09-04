import { useEffect } from "react";
import type { CSSProperties } from "react";

import CaretLeftIcon from "../icons/CaretLeftIcon";
import CaretRightIcon from "../icons/CaretRightIcon";
import CloseIcon from "../icons/CloseIcon";

import { useFocusTrap } from "../../hooks/useFocusTrap";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useSpriteTopPadding } from "../../hooks/useSpriteTopPadding";

import type { Pokemon } from "../../types/pokemon";

import { typeColor } from "./typeColors";

import styles from "./PokemonModal.module.scss";

type PokemonModalProps = {
  pokemon: Pokemon;
  /* ids já carregados: só para eles a navegação pela cadeia leva a algum lugar */
  selectableIds: number[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectEvolution: (id: number) => void;
};

/* três é o tamanho da maioria das cadeias: segura a altura da seção enquanto
   a resposta não chega, para o painel não crescer embaixo do cursor */
const PLACEHOLDER_KEYS = ["a", "b", "c"];

function formatDexNumber(id: number) {
  return "#" + String(id).padStart(3, "0");
}

/* a API devolve altura em decímetros e peso em hectogramas */
function formatMeasure(raw: number, unit: string) {
  return `${(raw / 10).toFixed(1)} ${unit}`;
}

/* "solar-power" chega assim da API e vira "Solar Power" */
function formatAbility(name: string) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function PokemonModal({
  pokemon,
  selectableIds,
  onClose,
  onPrev,
  onNext,
  onSelectEvolution,
}: PokemonModalProps) {
  useScrollLock();
  const dialogRef = useFocusTrap<HTMLDivElement>();
  const { genus, evolutions, isLoading } = usePokemonDetails(pokemon.id);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const spriteUrl = pokemon.sprites.other.home.front_default ?? "";
  const ground = typeColor(pokemon.types[0]?.type.name);

  /* subir a arte pela própria margem transparente encosta o desenho no topo da
     caixa, e aí o recuo do CSS vale igual para todos */
  const topPadding = useSpriteTopPadding(spriteUrl);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.frame}
        role="dialog"
        aria-modal="true"
        aria-label={pokemon.name}
        style={{ "--type-color": ground } as CSSProperties}
      >
        <button
          type="button"
          className={`${styles.iconButton} ${styles.close}`}
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          title="Close"
          aria-label="Close"
        >
          <CloseIcon className={styles.buttonIcon} />
        </button>
        <button
          type="button"
          className={`${styles.iconButton} ${styles.prev}`}
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          title="Previous"
          aria-label="Previous"
        >
          <CaretLeftIcon className={styles.buttonIcon} />
        </button>
        <button
          type="button"
          className={`${styles.iconButton} ${styles.next}`}
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          title="Next"
          aria-label="Next"
        >
          <CaretRightIcon className={styles.buttonIcon} />
        </button>

        <div
          className={styles.panel}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.content} key={pokemon.id}>
            <div className={styles.top}>
              <div className={styles.identity}>
                <span className={styles.number}>
                  {formatDexNumber(pokemon.id)}
                </span>
                <h2 className={styles.name}>{pokemon.name}</h2>
                <span className={styles.genus}>{genus}</span>

                <dl className={styles.meta}>
                  <div className={styles.metaItem}>
                    <dt className={styles.metaLabel}>Height</dt>
                    <dd className={styles.metaValue}>
                      {formatMeasure(pokemon.height, "m")}
                    </dd>
                  </div>
                  <div className={styles.metaItem}>
                    <dt className={styles.metaLabel}>Weight</dt>
                    <dd className={styles.metaValue}>
                      {formatMeasure(pokemon.weight, "kg")}
                    </dd>
                  </div>
                  <div className={styles.metaItem}>
                    <dt className={styles.metaLabel}>Abilities</dt>
                    {pokemon.abilities.map(({ ability }) => (
                      <dd key={ability.name} className={styles.metaValue}>
                        {formatAbility(ability.name)}
                      </dd>
                    ))}
                  </div>
                </dl>
              </div>

              <img
                className={
                  topPadding === null
                    ? `${styles.hero} ${styles.heroPending}`
                    : styles.hero
                }
                src={spriteUrl}
                alt={pokemon.name}
                style={{
                  transform: topPadding
                    ? `translateY(${(-topPadding * 100).toFixed(2)}%)`
                    : undefined,
                }}
              />
            </div>

            {(isLoading || evolutions.length > 0) && (
              <div className={styles.evolutions}>
                <h3 className={styles.evolutionsTitle}>Evolutions</h3>

                <div className={styles.chain}>
                  {isLoading &&
                    PLACEHOLDER_KEYS.map((key) => (
                      <span
                        key={key}
                        className={`${styles.stage} ${styles.stagePlaceholder}`}
                        aria-hidden="true"
                      >
                        <span className={styles.stageSprite} />
                        <span className={styles.stageName}>&nbsp;</span>
                      </span>
                    ))}

                  {evolutions.map((stage) => {
                    const current = stage.id === pokemon.id;

                    return (
                      <button
                        key={stage.id}
                        type="button"
                        className={
                          current
                            ? `${styles.stage} ${styles.stageCurrent}`
                            : styles.stage
                        }
                        title={stage.name}
                        aria-label={stage.name}
                        aria-current={current ? "true" : undefined}
                        disabled={!selectableIds.includes(stage.id)}
                        onClick={() => onSelectEvolution(stage.id)}
                      >
                        <img
                          className={styles.stageSprite}
                          src={stage.spriteUrl}
                          alt=""
                          loading="lazy"
                        />
                        <span className={styles.stageName}>{stage.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
