import React, { useEffect } from "react";
import PageShell from "@/components/layout/page-shell";
import { BotaoCopiar } from "@/components/shizune/bloco-de-comando";
import { contactLinks } from "@/content/contacts";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";

// Ícones de marca desenhados aqui: o lucide-react 1.0+ removeu os de marca.
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Canal {
  chave: string;
  rotulo: string;
  url?: string;
  detalhe: string;
  icone: React.ComponentType<{ className?: string }>;
}

/**
 * A rota `/contato` — a tela 19c.
 *
 * O e-mail aparece como texto, com botão de copiar, porque um link `mailto:`
 * nem sempre abre o programa certo. Os outros canais abrem numa aba nova. Canal
 * sem valor em `contacts.ts` não aparece.
 */
export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = "Contato | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  const canais: Canal[] = [
    { chave: "linkedin", rotulo: "LinkedIn", url: contactLinks.linkedin, detalhe: "abre o perfil", icone: LinkedinIcon },
    {
      chave: "github",
      rotulo: "GitHub",
      url: contactLinks.github,
      detalhe: contactLinks.github?.replace(/^https?:\/\//, "") ?? "",
      icone: GithubIcon,
    },
    { chave: "whatsapp", rotulo: "WhatsApp", url: contactLinks.whatsapp, detalhe: "abre a conversa", icone: MessageSquare },
  ].filter((c) => c.url && c.url.trim() !== "");

  const linha = "flex min-h-14 items-center gap-4 border-b border-border px-1 py-3 last:border-b-0";

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-14 text-left sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h1 className="titulo-serif text-[40px] leading-[1.04] text-foreground sm:text-[56px]">Contato</h1>
          <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            Se você tem uma ideia, produto ou projeto para conversar, pode me encontrar pelos canais abaixo.
          </p>
        </div>

        <ul className="m-0 list-none rounded-lg border border-border bg-surface px-4 py-1">
          {contactLinks.email && contactLinks.email.trim() !== "" && (
            <li className={linha}>
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex min-w-0 grow flex-col">
                <span className="text-sm font-semibold text-foreground">E-mail</span>
                <span className="select-all break-all font-mono text-[13px] text-muted-foreground">{contactLinks.email}</span>
              </div>
              <BotaoCopiar texto={contactLinks.email} rotulo="Copiar o e-mail" />
            </li>
          )}
          {canais.map((c) => {
            const Icone = c.icone;
            return (
              <li key={c.chave} className={linha}>
                <Icone className="h-4 w-4 shrink-0 text-primary" />
                <div className="flex min-w-0 grow flex-col">
                  <span className="text-sm font-semibold text-foreground">{c.rotulo}</span>
                  <span className="truncate text-[13px] text-muted-foreground">{c.detalhe}</span>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${c.rotulo} numa aba nova`}
                  className="inline-flex min-h-8 items-center gap-1 rounded-md border border-border px-3 font-mono text-[11px] text-foreground transition-colors hover:border-muted-foreground"
                >
                  abrir
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="text-sm text-muted-foreground">
          O e-mail aparece como texto, com botão de copiar, porque um link de e-mail nem sempre abre o
          programa certo.
        </p>
      </div>
    </PageShell>
  );
};

export default ContactPage;
