const TYPE_COLORS: Record<string, string> = {
  grass: "#4aa96c",
  fire: "#f39204",
  water: "#3d8bd4",
  bug: "#8dad2b",
  normal: "#8a8a7a",
  poison: "#9351a8",
  electric: "#e0b115",
  flying: "#7fa5d9",
};

const FALLBACK = "#9184d9";

export function typeColor(type: string | undefined): string {
  return (type && TYPE_COLORS[type]) || FALLBACK;
}
