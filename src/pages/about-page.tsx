import React, { useEffect } from "react";
import PageShell from "@/components/layout/page-shell";
import GlifoShizune from "@/components/shizune/glifo";
import { contactLinks } from "@/content/contacts";

const PRINCIPIOS = [
  {
    titulo: "Problema antes de tecnologia",
    texto: "Nenhum código avançado salva um produto que ninguém quer usar.",
  },
  {
    titulo: "Clareza e usabilidade",
    texto: "Interfaces simples, diretas e acessíveis a todas as pessoas.",
  },
  {
    titulo: "Engenharia sustentável",
    texto: "TypeScript estrito, componentes reutilizáveis e nenhuma dependência desnecessária.",
  },
] as const;

const INTERESSES = [
  "Sistemas operacionais Linux e personalização de terminal.",
  "Automações locais com scripts e shell.",
  "Produtividade no ecossistema Git e GitHub.",
  "IA aplicada ao desenvolvimento de software.",
] as const;

const TITULO_2 = "titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]";

/**
 * A rota `/sobre` — a tela 19b.
 *
 * O que mudou: o negrito do perfil aparecia cru, com asteriscos (o texto era
 * markdown dentro de JSX); agora é `<b>`. O cartão do assistente local "em
 * breve" saiu, e os títulos em caixa alta viraram texto normal.
 */
export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "Sobre | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  const shizune = contactLinks.publicRepos?.find((r) => r.name === "Shizune" && r.url);
  const githubSemProtocolo = contactLinks.github?.replace(/^https?:\/\//, "");

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-14 text-left sm:px-6 lg:px-8">
        {/* O avatar oficial do kit, com o texto alternativo do kit. */}
        <div className="flex flex-wrap items-center gap-8">
          <img
            src="/avatar/cadu-azeredo-avatar-480.webp"
            alt="Avatar ilustrado de Cadu Azeredo, dev de Palmas-TO, com dreads e camisa preta"
            width={168}
            height={168}
            decoding="async"
            className="h-[168px] w-[168px] rounded-full border-2 border-tinta object-cover"
          />
          <div className="space-y-3">
            <h1 className="titulo-serif text-[40px] leading-[1.04] text-foreground sm:text-[56px]">Sobre</h1>
            <p className="font-mono text-[13px] text-muted-foreground">
              dev em Palmas-TO · software com IA, com o processo à mostra
            </p>
          </div>
        </div>

        <section data-reveal className="max-w-[68ch] space-y-4">
          <h2 data-split className={TITULO_2}>
            Perfil profissional
          </h2>
          <p className="text-base leading-relaxed text-foreground">
            Olá, sou Carlos Eduardo Moura, profissionalmente conhecido como <b>Cadu Azeredo</b>. Sou
            graduado em <b>Sistemas para Internet</b> com cursos focados em <b>UX e UI Design</b>. Tenho mais
            de 5 anos de experiência no desenvolvimento web, iniciando no ecossistema WordPress e
            progredindo para front-end moderno com <b>React</b> e <b>TypeScript</b>.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Minha abordagem une a engenharia de front-end ao cuidado com a usabilidade, sempre orientando
            as decisões pela resolução de problemas reais de produto.
          </p>
        </section>

        <section data-reveal className="space-y-5">
          <h2 data-split className={TITULO_2}>
            Como penso produtos
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {PRINCIPIOS.map((p) => (
              <div key={p.titulo} className="space-y-2 rounded-lg border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground">{p.titulo}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section data-reveal className="space-y-4">
          <h2 data-split className={TITULO_2}>
            Interesses do workspace
          </h2>
          <ul className="m-0 list-disc space-y-2 pl-5 text-base text-muted-foreground">
            {INTERESSES.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>

        <section data-reveal className="space-y-5">
          <h2 data-split className={TITULO_2}>
            Repositórios e conteúdo
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {contactLinks.github && (
              <a
                href={contactLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary/50"
              >
                <span className="font-semibold text-foreground">Perfil no GitHub</span>
                <span className="text-sm text-muted-foreground">{githubSemProtocolo}</span>
              </a>
            )}
            {shizune?.url && (
              <a
                href={shizune.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 rounded-lg border border-tinta-deep/50 bg-surface p-5 transition-colors hover:border-tinta-deep"
              >
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  <GlifoShizune tamanho={18} className="text-tinta" />
                  Shizune
                </span>
                <span className="self-start rounded-full border border-status-live/40 px-2.5 py-0.5 font-mono text-[11px] text-status-live">
                  público
                </span>
              </a>
            )}
            {contactLinks.youtube && (
              <a
                href={contactLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary/50"
              >
                <span className="font-semibold text-foreground">Canal no YouTube</span>
                <span className="text-sm text-muted-foreground">vídeos sobre o método</span>
              </a>
            )}
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default AboutPage;
