import styles from "./SearchBar.module.scss";
import CloseIcon from "./icons/CloseIcon";
import SearchIcon from "./icons/SearchIcon";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.container} role="search">
      <SearchIcon className={styles.icon} />
      <input
        className={styles.input}
        type="search"
        placeholder="Buscar Pokémon…"
        aria-label="Buscar Pokémon"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button
          type="button"
          className={styles.clearButton}
          title="Limpar busca"
          aria-label="Limpar busca"
          onClick={() => onChange("")}
        >
          <CloseIcon className={styles.clearIcon} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
