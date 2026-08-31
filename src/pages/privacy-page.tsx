import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import TerminalWindow from "@/components/terminal/terminal-window";
import { contactLinks } from "@/content/contacts";

/**
 * Fonte deste texto: `docs/site-privacidade.md` no repositório de governança.
 * Alterações nascem lá e vêm para cá — não o contrário.
 */

const ATUALIZADO_EM = "31 de agosto de 2026";

const Secao: React.FC<{ titulo: string; children: React.ReactNode }> = ({
  titulo,
  children,
}) => (
  <section className="space-y-3">
    <h2 className="text-lg font-bold tracking-tight font-sans">{titulo}</h2>
    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
      {children}
    </div>
  </section>
);

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | Cadu Azeredo";
  }, []);

  const email = contactLinks.email;

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header className="space-y-4 border-b border-border/80 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
            Política de Privacidade
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Este site coleta muito pouco, e só o que você digita por vontade
            própria. Esta página diz exatamente o quê, para quê, por quanto
            tempo e como pedir que seja apagado.
          </p>
          <p className="font-mono text-xs text-muted-foreground/70">
            Última atualização: {ATUALIZADO_EM}
          </p>
        </header>

        <Secao titulo="1. Quem trata os seus dados">
          <p>
            O controlador dos dados coletados neste site é{" "}
            <strong className="text-foreground">
              Carlos Eduardo Azeredo Moura
            </strong>
            , pessoa física, inscrito no CPF, atuando como desenvolvedor e
            consultor independente.
          </p>
          {email ? (
            <p>
              Para qualquer assunto de privacidade — inclusive para exercer os
              direitos da seção 6 —, escreva para{" "}
              <a
                href={`mailto:${email}?subject=Privacidade`}
                className="text-primary hover:underline break-all"
              >
                {email}
              </a>
              .
            </p>
          ) : null}
        </Secao>

        <Secao titulo="2. Quais dados são coletados">
          <p>
            Não há cadastro, não há login e não há área restrita. O único
            momento em que você entrega dados é ao enviar o formulário de
            contato.
          </p>
          <TerminalWindow title="dados --coletados">
            <ul className="space-y-2">
              <li>
                <span className="text-primary">nome</span> — para saber como te
                chamar na resposta.
              </li>
              <li>
                <span className="text-primary">e-mail</span> — para responder ao
                seu contato.
              </li>
              <li>
                <span className="text-primary">mensagem</span> — para entender o
                que você precisa antes de responder.
              </li>
              <li>
                <span className="text-primary">produto</span> — qual página
                originou o contato, para dar contexto à conversa.
              </li>
            </ul>
          </TerminalWindow>
          <p>
            <strong className="text-foreground">Dados de navegação.</strong> O
            site usa a análise de tráfego da Vercel, que mede visitas de forma
            agregada e <strong className="text-foreground">não</strong> usa
            cookies de identificação nem cria perfil individual. Não há pixel de
            rede social, não há remarketing e não há cookie de publicidade.
          </p>
          <p>
            Não são coletados dados sensíveis na acepção do artigo 5º, II da
            LGPD, e o site não se destina a menores de 18 anos.
          </p>
        </Secao>

        <Secao titulo="3. Com que base legal">
          <p>
            A base legal é o{" "}
            <strong className="text-foreground">consentimento</strong> (artigo
            7º, I da LGPD). Você fornece os dados ao preencher o formulário e
            marcar a caixa de concordância — que nunca vem marcada de antemão.
            Sem essa marcação, o envio não acontece.
          </p>
          <p>
            Você pode retirar o consentimento a qualquer momento pelo canal da
            seção 1. A retirada não invalida o tratamento feito antes dela.
          </p>
        </Secao>

        <Secao titulo="4. Com quem são compartilhados">
          <p>
            Com dois operadores, e apenas para executar o que você pediu ao
            enviar a mensagem:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Formspree</strong> — processa
              e entrega o envio do formulário. Recebe nome, e-mail e mensagem.
              Servidores nos Estados Unidos.
            </li>
            <li>
              <strong className="text-foreground">Vercel</strong> — hospedagem e
              análise de tráfego. Recebe dados de acesso agregados. Servidores
              nos Estados Unidos.
            </li>
          </ul>
          <p>
            <strong className="text-foreground">
              Transferência internacional.
            </strong>{" "}
            Os dois operadores ficam fora do Brasil. A transferência ocorre para
            executar exatamente o que você pediu, com amparo no seu
            consentimento (artigo 33, VIII da LGPD).
          </p>
          <p>
            Seus dados{" "}
            <strong className="text-foreground">
              não são vendidos, alugados nem cedidos
            </strong>{" "}
            a ninguém, em nenhuma hipótese.
          </p>
        </Secao>

        <Secao titulo="5. Por quanto tempo ficam guardados">
          <p>
            Mensagens de contato são mantidas por até{" "}
            <strong className="text-foreground">24 meses</strong> contados do
            último contato entre nós, e depois apagadas. Se você pedir a
            exclusão antes disso, ela acontece no prazo da seção seguinte.
          </p>
        </Secao>

        <Secao titulo="6. Seus direitos">
          <p>
            O artigo 18 da LGPD garante a você, a qualquer momento e sem custo:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>confirmação de que existe tratamento dos seus dados;</li>
            <li>acesso aos dados;</li>
            <li>correção de dado incompleto, inexato ou desatualizado;</li>
            <li>
              anonimização, bloqueio ou eliminação de dado desnecessário,
              excessivo ou tratado fora da lei;
            </li>
            <li>
              portabilidade a outro fornecedor, mediante requisição expressa;
            </li>
            <li>eliminação dos dados tratados com base no consentimento;</li>
            <li>informação sobre com quem os dados foram compartilhados;</li>
            <li>
              informação sobre a possibilidade de não consentir e as
              consequências disso;
            </li>
            <li>revogação do consentimento.</li>
          </ul>
          <p>
            Para exercer qualquer um deles, use o canal da seção 1. A resposta
            sai em até <strong className="text-foreground">15 dias</strong>.
          </p>
          <p>
            Você também pode peticionar diretamente à ANPD, a Autoridade
            Nacional de Proteção de Dados.
          </p>
        </Secao>

        <Secao titulo="7. Segurança">
          <p>
            Os dados trafegam por HTTPS. O acesso às mensagens recebidas é
            individual e protegido por autenticação em duas etapas.
          </p>
          <p>
            Nenhuma medida de segurança é absoluta. Se acontecer um incidente
            que possa gerar risco relevante a você, a comunicação será feita a
            você e à ANPD, no prazo legal.
          </p>
        </Secao>

        <Secao titulo="8. Mudanças nesta política">
          <p>
            Alterações são publicadas nesta mesma página, com a data de
            atualização no topo. Mudança que altere a finalidade do tratamento é
            comunicada a quem já enviou dados, e pede consentimento novo.
          </p>
        </Secao>

        <footer className="pt-6 border-t border-border/60">
          <p className="text-xs font-mono text-muted-foreground">
            Ver também os{" "}
            <Link to="/termos" className="text-primary hover:underline">
              Termos de Uso
            </Link>
            .
          </p>
        </footer>
      </div>
    </PageShell>
  );
};

export default PrivacyPage;
