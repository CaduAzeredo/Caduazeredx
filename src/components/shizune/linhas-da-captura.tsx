import React from "react";
import { cn } from "@/lib/utils";

/**
 * A saída do validador, como o comando a imprimiu — com cor por regra.
 *
 * `ok` verde, `[seção]` âmbar, a palavra que reprova em vermelho, e a linha que o
 * exemplo explica num fundo um tom acima. Nenhuma palavra é acrescentada ou
 * tirada: a saída é em português porque o comando imprime em português, e ela
 * rola em vez de quebrar linha, porque quebrar seria editar.
 */
const REPROVA = /\b(reprovou|reprova)\b/;

function trechos(texto: string): React.ReactNode[] {
  const m = texto.match(REPROVA);
  if (!m || m.index === undefined) return [texto];
  return [
    texto.slice(0, m.index),
    <span key={m.index} className="text-status-alert">
      {m[0]}
    </span>,
    ...trechos(texto.slice(m.index + m[0].length)),
  ];
}

function Linha({ linha, destacada }: { linha: string; destacada: boolean }) {
  const secao = linha.match(/^(\[[^\]]+\])(.*)$/);
  const ok = linha.match(/^(\s+)(ok)(\s.*)$/);
  let conteudo: React.ReactNode;
  if (secao) {
    conteudo = (
      <>
        <span className="text-tinta">{secao[1]}</span>
        {secao[2]}
      </>
    );
  } else if (ok) {
    conteudo = (
      <>
        {ok[1]}
        <span className="text-primary">{ok[2]}</span>
        <span className={cn(destacada && "text-foreground")}>{trechos(ok[3])}</span>
      </>
    );
  } else if (/^test-validate-decisions:/.test(linha)) {
    conteudo = <span className="text-primary">{linha}</span>;
  } else {
    conteudo = linha;
  }
  return destacada ? <span className="inline-block min-w-full bg-surface">{conteudo}</span> : <>{conteudo}</>;
}

export const LinhasDaCaptura: React.FC<{ texto: string; destaques?: readonly string[] }> = ({
  texto,
  destaques = [],
}) => (
  <>
    {texto.split("\n").map((linha, i) => (
      <React.Fragment key={i}>
        {i > 0 && "\n"}
        <Linha linha={linha} destacada={destaques.some((d) => linha.includes(d))} />
      </React.Fragment>
    ))}
  </>
);

export default LinhasDaCaptura;
