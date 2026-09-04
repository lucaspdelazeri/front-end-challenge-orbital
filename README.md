# Front-end Challenge — Orbital

Pokédex de oito Pokémon da primeira geração, com os dados vindos da [PokéAPI](https://pokeapi.co/).
Cada card abre um painel com número, gênero, altura, peso, habilidades e a cadeia de evolução completa.

**Ver online:** https://lucaspdelazeri.github.io/front-end-challenge-orbital/

O código da aplicação está em [`poke-page/`](poke-page/).

## Stack

- **React 19 + TypeScript** sobre **Vite**
- **SCSS Modules** — tokens e breakpoints centralizados em `src/styles/`
- **axios** para o consumo da API
- **Montserrat** do Google Fonts, com `preconnect` e `display=swap`

## Sobre os dados

Três endpoints da PokéAPI: `/pokemon` para os atributos e as artes, `/pokemon-species`
para o gênero, e `/evolution-chain` para as evoluções. As imagens são as artes `home`,
cujas URLs vêm na própria resposta da API.

## Como rodar

```bash
cd poke-page
npm install
npm run dev
```

Outros comandos: `npm run build` (typecheck + build de produção), `npm run preview`, `npm run lint`.

## Deploy

GitHub Pages, publicado pelo workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) a cada push na `main`.
