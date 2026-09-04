export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string } }[];
  abilities: { slot: number; is_hidden: boolean; ability: { name: string } }[];
  sprites: {
    front_default: string | null;
    other: {
      home: { front_default: string | null };
    };
  };
};

export type ChainLink = {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
};

export type PokemonSpecies = {
  id: number;
  name: string;
  genera: { genus: string; language: { name: string } }[];
  evolution_chain: { url: string };
};

export type EvolutionChain = {
  chain: ChainLink;
};

export type EvolutionStage = {
  id: number;
  name: string;
  spriteUrl: string;
};
