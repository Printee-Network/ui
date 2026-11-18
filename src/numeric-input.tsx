"use client";

import { useState } from "react";
import { Input } from "./input";

/** Cifre + al più un separatore decimale (virgola o punto). Nessun segno: importi >= 0. */
const NUMERIC_RE = /^\d*(?:[.,]\d*)?$/;
const INTEGER_RE = /^\d*$/;

/**
 * Regex per un numero con al più `maxDecimals` cifre decimali.
 * Serve a campi come lo sconto, dove oltre i centesimi non ha senso digitare.
 */
function decimalsRe(maxDecimals: number): RegExp {
  return new RegExp(`^\\d*(?:[.,]\\d{0,${maxDecimals}})?$`);
}

/** Parsing coerente col campo: accetta la virgola ("3,5" → 3.5). */
export function parseAmount(value: string): number {
  const n = Number(value.replace(",", "."));
  return Number.isNaN(n) ? 0 : n;
}

type NumericInputProps =
  & Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange">
  & {
    value: string;
    onChange: (value: string) => void;
  };

/**
 * Campo numerico SENZA freccette: niente `type="number"` (spinner nativo), è un campo testo con
 * tastiera decimale e validazione regex a ogni battuta (i caratteri non numerici vengono rifiutati).
 */
export default function NumericInput({
  value,
  onChange,
  ...props
}: NumericInputProps) {
  return (
    <Input
      {...props}
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(e) => {
        const next = e.target.value;
        if (next === "" || NUMERIC_RE.test(next)) onChange(next);
      }}
    />
  );
}

type NumericFieldProps =
  & Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange">
  & {
    value: number | null | undefined;
    onValueChange: (value: number | null) => void;
    /** Solo cifre intere (quantità, colori). */
    integer?: boolean;
    /** Massimo numero di cifre decimali digitabili (ignorato se `integer`). */
    maxDecimals?: number;
  };

/**
 * Variante NUMBER-based di {@link NumericInput}, per form che tengono numeri nello stato
 * (es. react-hook-form). Mantiene una bozza testuale interna così la virgola non sparisce
 * mentre si digita ("0," non collassa a "0"); campo vuoto → `null`.
 */
export function NumericField({
  value,
  onValueChange,
  integer = false,
  maxDecimals,
  ...props
}: NumericFieldProps) {
  const [draft, setDraft] = useState<string>(
    value == null ? "" : String(value),
  );

  // Riallinea la bozza SOLO se il valore esterno è cambiato davvero (reset, altra entity),
  // non quando è l'eco della nostra stessa digitazione ("3," → 3).
  const parsedDraft = draft === "" ? null : parseAmount(draft);
  if ((value ?? null) !== parsedDraft) {
    setDraft(value == null ? "" : String(value));
  }

  const re = integer
    ? INTEGER_RE
    : maxDecimals != null
    ? decimalsRe(maxDecimals)
    : NUMERIC_RE;
  return (
    <Input
      {...props}
      type="text"
      inputMode={integer ? "numeric" : "decimal"}
      value={draft}
      onChange={(e) => {
        const next = e.target.value;
        if (next !== "" && !re.test(next)) return;
        setDraft(next);
        onValueChange(next === "" ? null : parseAmount(next));
      }}
    />
  );
}
