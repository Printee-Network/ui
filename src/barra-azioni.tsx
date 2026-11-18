import type { ReactNode } from "react";
import { cn } from "./utils";

/**
 * La barra delle azioni su una selezione (prodotti di un catalogo, voci degli ordini): una pillola
 * compatta in basso a destra, su una riga, mai una fascia larga quanto la pagina. Dentro: il conteggio
 * in testo 13px, le azioni secondarie `ghost`, quella principale piena e arrotondata per ultima.
 *
 * `visibile` a false la fa scendere fuori dallo schermo invece di smontarla (resta un attimo per
 * l'animazione); la lista sotto lascia in fondo lo spazio per non farsi coprire (`SpazioBarraAzioni`).
 */
export function BarraAzioni({
  etichetta,
  visibile = true,
  children,
}: {
  /** Per i lettori di schermo: cosa si sta scegliendo. */
  etichetta: string;
  visibile?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      role="region"
      aria-label={etichetta}
      aria-hidden={!visibile}
      className={cn(
        "fixed bottom-6 right-4 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border bg-background py-1.5 pl-4 pr-1.5 shadow-sm transition-transform duration-100 ease-out md:right-8",
        visibile ? "translate-y-0" : "pointer-events-none translate-y-[calc(100%+2rem)]",
      )}
    >
      {children}
    </div>
  );
}

/**
 * Lo spazio in fondo alla lista sotto la barra, perché le ultime righe non restino coperte. Quanto
 * occupa la barra e niente di più: 24px dal fondo + 46px di pillola, meno i 16px di margine della
 * pagina, più 10px d'aria. Va messo dove il contenitore non aggiunge un `gap`, che lo allungherebbe.
 */
export function SpazioBarraAzioni() {
  return <div className="h-16 shrink-0" aria-hidden />;
}
