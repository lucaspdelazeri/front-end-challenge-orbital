import styles from './PokemonCard.module.scss'

type PokemonCardProps = {
    id: number
    name: string
    spriteUrl: string
    selected?: boolean
    onSelect: (id: number) => void
}

function PokemonCard({ id, name, spriteUrl, selected = false, onSelect }: PokemonCardProps) {
    return (
        <button
            type="button"
            className={selected ? `${styles.card} ${styles.selected}` : styles.card}
            title={name}
            aria-label={name}
            aria-pressed={selected}
            onClick={() => onSelect(id)}
        >
            <img
                className={styles.sprite}
                src={spriteUrl}
                alt=""
                loading="lazy"
            />
            <span className={styles.name}>{name}</span>
        </button>
    )
}

export default PokemonCard
