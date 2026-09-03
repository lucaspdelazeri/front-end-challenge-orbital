# Front-end Challenge — Orbital

Pokédex dos seis iniciais de Kanto e Johto, com os dados vindos da [PokéAPI](https://pokeapi.co/).
Cada card abre um diálogo com número, tipos, altura, peso e as estatísticas base.

**Ver online:** https://lucaspdelazeri.github.io/front-end-challenge-orbital/

O código da aplicação está em [`poke-page/`](poke-page/).

## Stack

- **React 19 + TypeScript** sobre **Vite**
- **SCSS Modules** — tokens e breakpoints centralizados em `src/styles/`
- **axios** para o consumo da API
- **Montserrat** via `@fontsource-variable/montserrat` (a mesma família do Google Fonts, servida junto com o build, sem requisição a terceiros)

## Como rodar

```bash
cd poke-page
npm install
npm run dev
```

Outros comandos: `npm run build` (typecheck + build de produção), `npm run preview`, `npm run lint`.

## Deploy

GitHub Pages, publicado pelo workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) a cada push na `main`.
