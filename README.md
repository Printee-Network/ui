# @printee-network/ui

Le primitive grafiche comuni dei frontend Next di Printee (shadcn/Radix + Tailwind 4) e i componenti che
portano le regole d'interazione del progetto:

- `numeric-input`: campi numerici senza frecce, con la virgola;
- `barra-azioni`: la barra d'azione su una selezione, piccola e in basso a destra;
- `pagination-bar`;
- i toni di stato (`theme.css`).

## Uso

```bash
npm install github:Printee-Network/ui#vX.Y.Z
```

Nel `globals.css` dell'app, subito dopo `@import "tailwindcss";`:

```css
@import "@printee-network/ui/theme.css";
@source "../node_modules/@printee-network/ui/build";
```

Senza `@source` Tailwind non vede le classi dei componenti e la pagina esce senza i loro stili.

```tsx
import { Button } from "@printee-network/ui/button";
import { cn } from "@printee-network/ui/utils";
```

Un file per componente: si importa solo quello che serve.

## Cosa entra

Un componente entra solo se lo usano almeno due app, oppure se porta una regola del progetto. Quello che
conosce il dominio (campi, chiamate al backend, testi di una pagina) resta nell'app. Le varianti di una
pagina si fanno con `className`, non con un'opzione nuova qui.

`react`, `react-dom`, `react-hook-form`, `sonner` e `next-themes` sono peer dependency: devono essere le
stesse istanze dell'app (contesti e toast).
