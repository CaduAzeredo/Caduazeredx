import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CornerDownLeft } from "lucide-react";
import { aberturaDoConsole, respostaSemDado, trocasDoConsole } from "@/content/respostas-console";
import { consoleAntesDaInvasao } from "@/content/invasao";
import { definirInvasao, ehComandoDeInvasao } from "@/lib/use-invasao";
import { repositorio } from "@/content/shizune";
import { useSiteMode } from "@/lib/use-site-mode";
import TypewriterText from "@/components/terminal/typewriter-text";
import GlifoShizune from "@/components/shizune/glifo";
import { cn } from "@/lib/utils";
import type { DestinoDoConsole, TrocaDoConsole } from "@/types";

/**
 * O console do ecossistema, na home.
 *
 * É **presença, não assistente**: fica onde foi posto, não persegue o scroll,
 * não abre sozinho, não pergunta se você precisa de ajuda. Quem só quer
 * contratar passa por ele sem ser interrompido.
 *
 * **Ele não simula conversa livre.** Não há servidor por trás, e fingir que há
 * seria mentir sobre o que o site faz. O que existe é um roteiro curado
 * (`respostas-console.ts`) onde toda resposta termina num destino real — e,
 * quando a pessoa pode resolver sozinha, o destino é o repositório aberto.
 *
 * - A conversa **acumula** em vez de trocar a resposta no lugar.
 * - O **campo de texto livre** casa por palavra-chave contra o roteiro. É uma
 *   porta de entrada, não inteligência.
 * - **Quando nada casa, ele diz que não sabe** e oferece o destino mais próximo.
 * - Ele **lê o modo de leitura**: em Empresa oferece escopo e contato primeiro;
 *   em Dev, o repositório aberto primeiro. A ordem muda, o conteúdo não.
 *
 * Até a v4 do site este painel tinha nome e avatar de personagem. Saíram na
 * troca de 15/10: o símbolo do Shizune fica no lugar do avatar, e o painel se
 * chama pelo que é.
 */

interface Mensagem {
  id: string;
  de: "console" | "pessoa";
  texto: string;
  destino?: DestinoDoConsole;
  /** Só a última resposta se digita; as antigas já estão escritas. */
  digitando?: boolean;
}

// ── casamento por palavra-chave ─────────────────────────────────────────────

function normalizar(s: string): string {
  // Depois do NFD, cada letra acentuada vira letra + marca combinante, e
  // \p{Diacritic} remove a marca. Propriedade Unicode nomeada e não um
  // intervalo de caracteres crus: intervalo escrito com os caracteres em si
  // some ao passar por editor, formatador ou cópia e cola.
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function casar(entrada: string): TrocaDoConsole | null {
  const alvo = normalizar(entrada);
  if (alvo.length < 2) return null;

  let melhor: TrocaDoConsole | null = null;
  let melhorNota = 0;

  for (const t of trocasDoConsole) {
    let nota = 0;
    for (const p of t.palavras) {
      if (alvo.includes(normalizar(p))) nota += p.includes(" ") ? 3 : 2;
    }
    // A pergunta escrita conta também: quem digita quase a pergunta acerta.
    if (alvo.includes(normalizar(t.pergunta).slice(0, 12))) nota += 4;
    if (nota > melhorNota) {
      melhorNota = nota;
      melhor = t;
    }
  }

  return melhorNota >= 2 ? melhor : null;
}

// ── destino ─────────────────────────────────────────────────────────────────

const DestinoLink: React.FC<{ destino: DestinoDoConsole }> = ({ destino }) => {
  const classe =
    "inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border-accent px-3.5 py-2 font-mono text-[11px] text-primary transition-colors hover:bg-primary/10";

  if (destino.tipo === "repo") {
    return (
      <a href={repositorio} target="_blank" rel="noopener noreferrer" className={classe}>
        {destino.rotulo} <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link to={destino.tipo === "shizune" ? "/shizune" : "/contato"} className={classe}>
      {destino.rotulo} <ArrowRight className="h-3 w-3" aria-hidden="true" />
    </Link>
  );
};

// ── componente ──────────────────────────────────────────────────────────────

export const ConsoleEcossistema: React.FC = () => {
  const [modo] = useSiteMode();
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { id: "abertura", de: "console", texto: aberturaDoConsole },
  ]);
  const [usadas, setUsadas] = useState<string[]>([]);
  const [rascunho, setRascunho] = useState("");
  const fim = useRef<HTMLDivElement>(null);
  const contador = useRef(0);

  // A conversa rola dentro do próprio painel. `block: "nearest"` é o que
  // impede a página inteira de saltar quando o console responde.
  useEffect(() => {
    if (mensagens.length > 1) fim.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [mensagens]);

  const responder = useCallback((pergunta: string, troca: TrocaDoConsole | null) => {
    const n = ++contador.current;
    setMensagens((m) => [
      ...m.map((x) => ({ ...x, digitando: false })),
      { id: `p${n}`, de: "pessoa", texto: pergunta },
      troca
        ? { id: `r${n}`, de: "console", texto: troca.resposta, destino: troca.destino, digitando: true }
        : {
            id: `r${n}`,
            de: "console",
            texto: respostaSemDado,
            destino: { rotulo: "falar comigo direto", tipo: "contato" },
            digitando: true,
          },
    ]);
    if (troca) setUsadas((u) => [...u, troca.id]);
  }, []);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = rascunho.trim();
    if (!texto) return;
    setRascunho("");

    // O console é a porta do easter egg. Ele responde uma linha antes de o site
    // inteiro ficar vermelho — o atraso existe para a frase ser lida, e não
    // atropelada pela encenação.
    if (ehComandoDeInvasao(texto)) {
      const n = ++contador.current;
      setMensagens((m) => [
        ...m.map((x) => ({ ...x, digitando: false })),
        { id: `p${n}`, de: "pessoa", texto },
        { id: `r${n}`, de: "console", texto: consoleAntesDaInvasao, digitando: true },
      ]);
      setTimeout(() => definirInvasao(true), 1400);
      return;
    }

    responder(texto, casar(texto));
  };

  // Em Empresa, escopo e contato vêm primeiro; em Dev, o repositório. A ordem
  // muda, nada some — quem escolheu Empresa ainda pode querer ver o código.
  const peso = (t: TrocaDoConsole) => {
    const dev = t.destino.tipo === "repo";
    if (modo === "empresa") return dev ? 1 : 0;
    return dev ? 0 : 1;
  };

  const sugestoes = trocasDoConsole
    .filter((t) => !usadas.includes(t.id))
    .sort((a, b) => peso(a) - peso(b))
    .slice(0, 3);

  return (
    <section
      aria-label="Console do ecossistema — perguntas sobre o trabalho"
      className="panel-shadow overflow-hidden rounded-xl border border-border bg-surface"
    >
      <header className="flex items-center gap-3 border-b border-border bg-surface-elevated px-4 py-3">
        <span
          aria-hidden="true"
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-border-accent text-tinta"
        >
          <GlifoShizune tamanho={18} />
        </span>
        <div className="flex flex-col">
          <span className="text-[12.5px] font-semibold text-foreground">console do ecossistema</span>
          <span className="font-mono text-[9.5px] text-muted-foreground">respostas escritas, não geradas</span>
        </div>
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-status-live" aria-hidden="true" />
      </header>

      <div className="flex max-h-[300px] min-h-[236px] flex-col gap-2.5 overflow-y-auto px-4 py-4" aria-live="polite">
        {mensagens.map((m) => (
          <React.Fragment key={m.id}>
            <p
              className={cn(
                "max-w-[88%] rounded-xl px-3.5 py-2.5 text-[12.5px] leading-relaxed",
                m.de === "console"
                  ? "self-start rounded-bl-sm border border-primary/25 bg-primary/[0.07] text-foreground"
                  : "self-end rounded-br-sm border border-border bg-surface-elevated text-muted-foreground",
              )}
            >
              {m.digitando ? <TypewriterText text={m.texto} speed={9} /> : m.texto}
            </p>
            {m.destino && (
              <span className="self-start">
                <DestinoLink destino={m.destino} />
              </span>
            )}
          </React.Fragment>
        ))}
        <div ref={fim} />
      </div>

      {sugestoes.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {sugestoes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => responder(t.pergunta, t)}
              className="min-h-9 rounded-full border border-border px-3.5 py-2 text-left font-mono text-[10.5px] text-muted-foreground transition-colors hover:border-border-accent hover:text-foreground"
            >
              {t.pergunta}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={enviar} className="flex items-center gap-2.5 border-t border-border px-4 py-2.5">
        <span className="font-mono text-[12px] text-primary" aria-hidden="true">
          ›
        </span>
        <input
          value={rascunho}
          onChange={(e) => setRascunho(e.target.value)}
          placeholder="pergunte alguma coisa…"
          aria-label="Escreva uma pergunta para o console"
          className="grow bg-transparent font-mono text-[11.5px] text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Enviar pergunta"
          className="flex min-h-8 min-w-8 items-center justify-center rounded border border-border px-2.5 text-muted-foreground transition-colors hover:border-border-accent hover:text-foreground"
        >
          <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
        </button>
      </form>
    </section>
  );
};

export default ConsoleEcossistema;
