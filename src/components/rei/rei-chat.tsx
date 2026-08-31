import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { reiTrocas, reiAbertura } from "@/content/rei-respostas";
import { contactLinks } from "@/content/contacts";
import type { ReiDestino, ReiTroca } from "@/types";

/**
 * A Rei como guia do site.
 *
 * Ela é **presença, não assistente**: fica onde foi posta, não persegue o
 * scroll, não abre sozinha, não pergunta se você precisa de ajuda. Quem só
 * quer contratar passa por ela sem ser interrompido — e é essa contenção que
 * a impede de virar mascote fofo num site que vende trabalho técnico.
 *
 * Não simula conversa livre. Não há servidor por trás, e fingir que há seria
 * mentir sobre o que o site faz. O que existe é um roteiro curado onde toda
 * resposta termina num destino real — e, quando a pessoa pode resolver
 * sozinha, o destino é o repositório aberto.
 */

const DestinoLink: React.FC<{ destino: ReiDestino }> = ({ destino }) => {
  const classe =
    "inline-flex items-center gap-1.5 rounded-full border border-border-accent px-3 py-1.5 font-mono text-[11px] text-primary transition-colors hover:bg-primary/10";

  if (destino.tipo === "repo") {
    const repo = contactLinks.publicRepos?.find(
      (r) => r.status === "public" && r.url,
    );
    if (!repo?.url) return null;
    return (
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className={classe}
      >
        {destino.rotulo} <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      to={destino.tipo === "produtos" ? "/produtos" : "/contato"}
      className={classe}
    >
      {destino.rotulo} <ArrowRight className="h-3 w-3" aria-hidden="true" />
    </Link>
  );
};

export const ReiChat: React.FC = () => {
  const [aberta, setAberta] = useState<ReiTroca | null>(null);

  const restantes = reiTrocas.filter((t) => t.id !== aberta?.id).slice(0, 3);

  return (
    <section
      aria-label="Rei — perguntas sobre o trabalho"
      className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
    >
      <header className="flex items-center gap-3 border-b border-border bg-surface-elevated px-4 py-3">
        <img
          src="/rei/rei-96.png"
          alt=""
          width={30}
          height={30}
          className="h-[30px] w-[30px] rounded-md border border-border-accent object-cover"
        />
        <div className="flex flex-col">
          <span className="text-[12.5px] font-semibold text-foreground">
            Rei
          </span>
          <span className="font-mono text-[9.5px] text-muted-foreground">
            console do ecossistema · respostas escritas, não geradas
          </span>
        </div>
        <span
          className="ml-auto h-1.5 w-1.5 rounded-full bg-status-live"
          aria-hidden="true"
        />
      </header>

      <div className="flex min-h-[232px] flex-col gap-3 px-4 py-4">
        <p className="max-w-[86%] self-start rounded-xl rounded-bl-sm border border-primary/25 bg-primary/[0.07] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-foreground">
          {aberta ? aberta.resposta : reiAbertura}
        </p>

        {aberta && (
          <div className="self-start">
            <DestinoLink destino={aberta.destino} />
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 self-start pt-1">
          {restantes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setAberta(t)}
              className="rounded-full border border-border px-3 py-1.5 text-left font-mono text-[10.5px] text-muted-foreground transition-colors hover:border-border-accent hover:text-foreground"
            >
              {t.pergunta}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReiChat;
