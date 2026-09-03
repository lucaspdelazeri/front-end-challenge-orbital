# poke-page

## Organização

```
src/
  api/          cliente axios e as chamadas da PokéAPI
  components/   um diretório por componente, com seu .module.scss ao lado
    icons/      ícones em SVG inline, coloridos por currentColor
  hooks/        estado dos dados, seleção, foco preso e trava de rolagem
  styles/       tokens (cores, tipografia, espaçamento) e breakpoints
  types/        contrato da resposta da API
```

Os tokens de `styles/_tokens.scss` são emitidos como custom properties porque os
componentes precisam lê-los em tempo de execução — os `color-mix()` espalhados
pelos módulos trabalham em cima deles.