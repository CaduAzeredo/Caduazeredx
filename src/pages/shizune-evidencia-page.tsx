import React from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import useSeo from "@/lib/use-seo";
import ficha, {
  comandoDe,
  estadoDe,
  estadoDoDegrau,
  medicaoDe,
  type EstadoDaAfirmacao,
} from "@/content/ficha";
import { contribuicoes, evidencia } from "@/content/shizune";
import { nomeDoDegrau, ROTULO_DO_ESTADO } from "@/content/degraus";
import { contagemPorExtenso, fonteConferida, VIZINHOS } from "@/content/vizinhos";
import SubmenuShizune from "@/components/shizune/submenu";
import PaginaComSumario from "@/components/shizune/pagina-com-sumario";
import BlocoDeComando from "@/components/shizune/bloco-de-comando";
import FaixaDaFicha from "@/components/shizune/faixa-da-ficha";
import { MarcaRascunho, Medicao } from "@/components/shizune/marcas";
import { useEscopoShizune } from "@/components/shizune/escopo";
import { PUBLICACAO } from "@/lib/ambiente";
import { oQueAparece } from "@/lib/publicacao";
import { cn } from "@/lib/utils";

const { cabeca, comoLer, afirmacoes, naoAfirmamos, encaixe } = evidencia;

function Afirmacao({
  titulo,
  valor,
  texto,
  mostra,
  naoMostra,
  comandos,
  estado,
  medicao,
  rotuloDoComando = afirmacoes.rotuloDoComando,
  children,
}: {
  titulo: string;
  valor?: string | number;
  texto: string;
  mostra: string;
  naoMostra: string;
  comandos: readonly string[];
  estado: EstadoDaAfirmacao;
  medicao: React.ReactNode;
  rotuloDoComando?: string;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "grid grid-cols-1 gap-5 rounded-xl border bg-surface p-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:p-6",
        estado === "desatualizada" ? "border-tinta-deep/50" : "border-border",
      )}
    >
      <div className="flex min-w-0 flex-col gap-2.5">
        <h3 className="text-lg font-semibold text-foreground">{titulo}</h3>
        {valor !== undefined && (
          <p className={cn("font-mono text-[44px] leading-none", estado === "desatualizada" ? "text-tinta" : "text-foreground")}>
            {valor}
          </p>
        )}
        <p className="text-sm text-muted-foreground">{texto}</p>
        <p className="text-sm text-muted-foreground">
          <b className="font-semibold text-foreground">{afirmacoes.mostra}</b> {mostra}
          <br />
          <b className="font-semibold text-foreground">{afirmacoes.naoMostra}</b> {naoMostra}
        </p>
        {children}
      </div>
      <div className="min-w-0">
        <BlocoDeComando compacto rotulo={rotuloDoComando} linhas={comandos} medicao={medicao} />
      </div>
    </article>
  );
}

function medicaoDaFicha(id: string) {
  const m = medicaoDe(id);
  return <Medicao estado={estadoDe(id)} data={m.data} sha={m.shaCurto} />;
}

/**
 * A rota `/shizune/evidencia` — a tela 18a: o espelho em português do
 * `/evidence` do shizune.dev.
 *
 * Cada afirmação tem o valor, o comando que a confere num clone limpo do pacote
 * público, o estado e o dia da medição — tudo da ficha da release. As
 * contribuições são a exceção declarada: rodam contra o GitHub, e a linha diz.
 * Os vizinhos passam pela regra de publicação: sem fonte conferida, rascunho no
 * preview e nada em produção — se nenhum aparecer, a seção inteira some.
 */
export const ShizuneEvidenciaPage: React.FC = () => {
  useSeo({
    titulo: "Evidência — Shizune | Cadu Azeredo",
    descricao:
      "Cada afirmação do Shizune, o comando que a confere no repositório público e quando ela foi medida pela última vez.",
    caminho: "/shizune/evidencia",
  });
  useEscopoShizune();
  const vizinhos = oQueAparece(VIZINHOS, fonteConferida, PUBLICACAO);

  const sumario = [
    { ancora: comoLer.ancora, rotulo: "Como ler" },
    { ancora: afirmacoes.ancora, rotulo: "Afirmações que você roda" },
    { ancora: naoAfirmamos.ancora, rotulo: "O que não afirmamos" },
    ...(vizinhos.length > 0 ? [{ ancora: encaixe.ancora, rotulo: encaixe.rotulo }] : []),
  ];

  return (
    <PageShell>
      <SubmenuShizune />
      <PaginaComSumario sumario={sumario}>
        <section className="flex flex-col gap-4">
          <p className="font-mono text-[12px] text-muted-foreground">{cabeca.rotulo}</p>
          <h1 className="titulo-serif text-[40px] leading-[1.04] text-foreground sm:text-[56px]">
            {cabeca.titulo}
          </h1>
          <p className="max-w-[70ch] text-lg leading-relaxed text-foreground">{cabeca.texto}</p>
        </section>

        <section id={comoLer.ancora} className="flex scroll-mt-24 flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground">{comoLer.titulo}</h2>
          <p className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[12px] text-muted-foreground">
            {comoLer.legenda.map((l) => (
              <span
                key={l.marca}
                className={cn(
                  l.estado === "reproduzida" && "text-primary",
                  l.estado === "desatualizada" && "text-tinta",
                  l.estado === "falhou" && "text-status-alert",
                )}
              >
                {l.marca}
              </span>
            ))}
          </p>
          <p className="max-w-[68ch] text-sm text-muted-foreground">
            <b className="font-semibold text-foreground">{comoLer.desatualizada}</b>
            {comoLer.explicacao}
          </p>
          <FaixaDaFicha />
        </section>

        <section id={afirmacoes.ancora} className="flex scroll-mt-24 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">{afirmacoes.titulo}</h2>
            <p className="text-muted-foreground">{afirmacoes.texto}</p>
          </div>
          <Afirmacao
            {...afirmacoes.validador}
            valor={ficha.asseracoes}
            comandos={[comandoDe("negative-test-assertions"), comandoDe("negative-test-output")]}
            estado={estadoDe("negative-test-assertions")}
            medicao={medicaoDaFicha("negative-test-assertions")}
          />
          <Afirmacao
            {...afirmacoes.chaveDeMaquina}
            comandos={[comandoDe("negative-test-output")]}
            estado={estadoDe("negative-test-output")}
            medicao={medicaoDaFicha("negative-test-output")}
          />
          <Afirmacao
            {...afirmacoes.doctor}
            valor={`${ficha.doctor.passaram} · ${ficha.doctor.na}`}
            comandos={[comandoDe("doctor-summary")]}
            estado={estadoDe("doctor-summary")}
            medicao={medicaoDaFicha("doctor-summary")}
          />
          <Afirmacao
            {...afirmacoes.pacote}
            valor={ficha.arquivos}
            comandos={[comandoDe("package-files")]}
            estado={estadoDe("package-files")}
            medicao={medicaoDaFicha("package-files")}
          />
          <Afirmacao
            {...afirmacoes.contribuicoes}
            valor={contribuicoes.abertas}
            comandos={[contribuicoes.comandoAbertas]}
            estado="reproduzida"
            rotuloDoComando={afirmacoes.contribuicoes.rotuloDoComando}
            medicao={
              <Medicao
                data={contribuicoes.medidoEm}
                extra={<span>{afirmacoes.contribuicoes.ondeRoda}</span>}
              />
            }
          >
            <div className="flex flex-col gap-2 pt-1">
              <p className="text-sm text-muted-foreground">
                <b className="font-semibold text-foreground">
                  {afirmacoes.contribuicoes.aceitas} {contribuicoes.aceitas}
                </b>{" "}
                {afirmacoes.contribuicoes.aceitasTexto}
              </p>
              <BlocoDeComando compacto rotulo={afirmacoes.contribuicoes.rotuloDoComando} linhas={[contribuicoes.comandoAceitas]} />
              <details className="border-t border-border pt-2">
                <summary className="inline-flex min-h-8 cursor-pointer items-center text-sm text-tinta">
                  {afirmacoes.contribuicoes.lista}
                </summary>
                <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0 text-sm">
                  {contribuicoes.itens.map((c) => (
                    <li key={c.url} className="flex flex-wrap gap-x-2">
                      <a href={c.url} className="text-tinta underline underline-offset-2">
                        {c.repo}#{c.numero}
                      </a>
                      <span className="text-muted-foreground">
                        {c.tipo} · {c.estado}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">{afirmacoes.contribuicoes.estadoEm}</p>
              </details>
            </div>
          </Afirmacao>
        </section>

        <section id={naoAfirmamos.ancora} className="flex scroll-mt-24 flex-col gap-5">
          <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">{naoAfirmamos.titulo}</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {naoAfirmamos.itens.map((i) => (
              <div key={i.titulo} className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
                <p className="font-mono text-[12px] text-status-alert">{i.titulo}</p>
                <p className="text-sm text-muted-foreground">{i.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {vizinhos.length > 0 && (
          <section id={encaixe.ancora} className="flex scroll-mt-24 flex-col gap-5">
            <p className="font-mono text-[12px] text-muted-foreground">{encaixe.rotulo}</p>
            <h2 className="titulo-serif text-[30px] leading-[1.1] text-foreground sm:text-[40px]">
              {encaixe.titulo(contagemPorExtenso(vizinhos.length))}
            </h2>
            <p className="max-w-[70ch] text-lg leading-relaxed text-foreground">{encaixe.texto}</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {encaixe.faixas.map((f) => (
                <div
                  key={f.texto}
                  className={cn(
                    "flex flex-col gap-1.5 rounded-lg border px-4 py-4",
                    f.produto ? "border-tinta-deep/50 bg-surface" : "border-border",
                  )}
                >
                  <p className={cn("font-mono text-[12px]", f.produto ? "text-tinta" : "text-muted-foreground")}>
                    {f.rotulo}
                  </p>
                  <p className="text-foreground">{f.texto}</p>
                </div>
              ))}
            </div>
            <p className="max-w-[72ch] text-sm text-muted-foreground">{encaixe.nota}</p>

            <div className="flex flex-col gap-3">
              <div
                aria-hidden="true"
                className="hidden grid-cols-[1.2fr_1fr_1fr_1.1fr_1fr] gap-4 px-5 font-mono text-[11px] text-muted-foreground lg:grid"
              >
                {encaixe.colunas.map((c, i) => (
                  <span key={c} className={cn(i === 3 && "text-tinta")}>
                    {c}
                  </span>
                ))}
              </div>
              {vizinhos.map(({ item: v, rascunho }) => {
                const e = estadoDoDegrau(v.degrau);
                return (
                  <article key={v.nome} className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr_1fr]">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[11px] text-muted-foreground lg:hidden">{encaixe.colunas[0]}</span>
                        <h3 className="font-semibold text-foreground">{v.nome}</h3>
                        <span className="text-sm text-muted-foreground">{v.exemplos}</span>
                      </div>
                      <div className="flex flex-col gap-1 text-sm text-foreground">
                        <span className="font-mono text-[11px] text-muted-foreground lg:hidden">{encaixe.colunas[1]}</span>
                        <p>{v.resolve}</p>
                      </div>
                      <div className="flex flex-col gap-1 text-sm text-foreground">
                        <span className="font-mono text-[11px] text-muted-foreground lg:hidden">{encaixe.colunas[2]}</span>
                        <p>{v.lacuna}</p>
                      </div>
                      <div className="flex flex-col gap-1 rounded-md border border-tinta-deep/40 px-3 py-2 text-sm text-foreground">
                        <span className="font-mono text-[11px] text-tinta">{encaixe.colunas[3]}</span>
                        <p>{v.conecta}</p>
                      </div>
                      <div className="flex flex-col gap-1 text-sm text-foreground">
                        <span className="font-mono text-[11px] text-muted-foreground lg:hidden">{encaixe.colunas[4]}</span>
                        <span className={cn("font-mono text-[12px]", e === "now" ? "text-tinta" : "text-muted-foreground")}>
                          {ROTULO_DO_ESTADO[e]}
                        </span>
                        <span>{nomeDoDegrau(v.degrau)}</span>
                      </div>
                    </div>
                    <p className="m-0 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 font-mono text-[11px] text-muted-foreground">
                      {v.fonte ? (
                        <a href={v.fonte} className="inline-flex min-h-6 items-center text-tinta underline underline-offset-2">
                          {encaixe.fonte}
                        </a>
                      ) : (
                        <span>
                          {encaixe.fonte}{" "}
                          <span className="border-b border-dashed border-muted-foreground">{encaixe.semFonte}</span>
                        </span>
                      )}
                      <span>
                        {encaixe.lidaEm}{" "}
                        <span className={cn(!v.lidaEm && "border-b border-dashed border-muted-foreground")}>
                          {v.lidaEm ?? encaixe.semData}
                        </span>
                      </span>
                      {rascunho && <MarcaRascunho>{encaixe.rascunho}</MarcaRascunho>}
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              {encaixe.rodape}{" "}
              <Link to="/shizune/roadmap" className="inline-flex min-h-6 items-center text-tinta underline underline-offset-2">
                {encaixe.verDegraus}
              </Link>
            </p>
          </section>
        )}
      </PaginaComSumario>
    </PageShell>
  );
};

export default ShizuneEvidenciaPage;
