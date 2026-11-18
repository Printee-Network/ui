"use client";

import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
  from: number;
  to: number;
  total: number;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Nome dell'elemento al plurale: «75 lavorazioni», «75 preventivi». */
  label: string;
  /** Quanti elementi ci sarebbero senza filtri: si mostra solo se diverso dal totale. */
  unfilteredTotal?: number;
}

/**
 * Piede delle liste lunghe: dice sempre a che punto sei, e i comandi compaiono solo
 * quando c'è più di una pagina — su una lista corta due frecce spente sono rumore.
 */
export default function PaginationBar({
  from,
  to,
  total,
  page,
  pageCount,
  onPageChange,
  label,
  unfilteredTotal,
}: PaginationBarProps) {
  const filtered = unfilteredTotal != null && unfilteredTotal !== total;

  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-t py-2 text-xs text-muted-foreground">
      <span>
        {total === 0
          ? `Nessun risultato${filtered ? ` su ${unfilteredTotal}` : ""}`
          : `${from}-${to} di ${total} ${label}${
            filtered ? ` (su ${unfilteredTotal})` : ""
          }`}
      </span>

      {pageCount > 1 && (
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 px-2"
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Precedenti
          </Button>
          <span className="px-1 font-mono">{page + 1}/{pageCount}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 px-2"
            disabled={page >= pageCount - 1}
            onClick={() => onPageChange(page + 1)}
          >
            Successive
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
