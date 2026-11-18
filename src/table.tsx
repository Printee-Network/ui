"use client"

import * as React from "react"

import { cn } from "./utils"

function Table({
  className,
  scorreFuori = false,
  ...props
}: React.ComponentProps<"table"> & {
  /**
   * La tabella sta in un contenitore della pagina che scorre (in verticale e, se serve, in orizzontale):
   * il suo involucro non deve essere a sua volta un contenitore di scorrimento, altrimenti
   * l'intestazione fissa (`TableHeader fisso`) resterebbe ferma lì dentro, cioè scorrerebbe via.
   */
  scorreFuori?: boolean
}) {
  return (
    <div
      data-slot="table-container"
      className={cn("relative w-full", !scorreFuori && "overflow-x-auto")}
    >
      <table
        data-slot="table"
        className={cn(// Prima e ultima colonna senza rientro: la tabella si allinea ai bordi del contenuto.
        "w-full caption-bottom text-sm [&_td:first-child]:pl-0 [&_td:last-child]:pr-0 [&_th:first-child]:pl-0 [&_th:last-child]:pr-0", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({
  className,
  fisso = false,
  ...props
}: React.ComponentProps<"thead"> & {
  /**
   * La riga delle etichette resta in cima mentre l'elenco scorre. Il filetto sotto è un'ombra: il bordo
   * della riga, con i bordi collassati della tabella, scorrerebbe via con le righe. Va con `Table
   * scorreFuori` dentro un contenitore che scorre.
   */
  fisso?: boolean
}) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        fisso
          ? "sticky top-0 z-10 bg-background [&_th]:shadow-[inset_0_-1px_0_var(--border)]"
          : "[&_tr]:border-b",
        className,
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-9 px-2 text-left align-middle text-sm font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-2 py-1.5 align-middle text-[13px] whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
