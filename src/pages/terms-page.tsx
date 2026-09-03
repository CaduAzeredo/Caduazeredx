import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/layout/page-shell";
import { contactLinks } from "@/content/contacts";

/**
 * Fonte deste texto: `docs/site-termos.md` no repositório de governança.
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

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Termos de Uso | Cadu Azeredo";
  }, []);

  const email = contactLinks.email;

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header className="space-y-4 border-b border-border/80 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
            Termos de Uso
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Este site é uma vitrine com um formulário de contato. Não vende nada
            online, não tem conta de usuário e não entrega software por aqui.
            Estes termos cobrem exatamente esse cenário.
          </p>
          <p className="font-mono text-xs text-muted-foreground/70">
            Última atualização: {ATUALIZADO_EM}
          </p>
        </header>

        <Secao titulo="1. Sobre estes termos">
          <p>
            Ao usar este site, você concorda com o que está escrito aqui. Se não
            concordar, não use o site.
          </p>
          <p>
            O site é operado por{" "}
            <strong className="text-foreground">
              Carlos Eduardo Azeredo Moura
            </strong>
            , pessoa física, inscrito no CPF, atuando como desenvolvedor e
            consultor independente.
          </p>
        </Secao>

        <Secao titulo="2. O que o site é">
          <p>
            Um site de apresentação: descreve trabalho técnico, publica
            materiais e oferece um formulário de contato.
          </p>
          <p>
            Enviar o formulário{" "}
            <strong className="text-foreground">
              não cria contrato, não reserva agenda e não garante resposta
            </strong>
            . É o começo de uma conversa. Cada proposta comercial, se houver, é
            tratada e formalizada separadamente, com escopo escrito.
          </p>
        </Secao>

        <Secao titulo="3. Propriedade intelectual">
          <p>
            <strong className="text-foreground">O conteúdo do site</strong> —
            textos, imagens, layout e o código do próprio site — pertence ao
            operador. Você pode citar e linkar livremente, com atribuição. Não
            pode republicar o conteúdo inteiro como se fosse seu.
          </p>
          <p>
            <strong className="text-foreground">
              O Shizune — antes chamado Brain Framework — é software livre
            </strong>
            , publicado sob a Licença Apache 2.0 em{" "}
            <a
              href="https://github.com/CaduAzeredo/shizune"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              github.com/CaduAzeredo/shizune
            </a>
            . A licença dele vale por si e não é restringida por estes termos:
            você pode usar, modificar, distribuir e usar comercialmente nos
            termos da Apache 2.0.
          </p>
          <p>
            <strong className="text-foreground">Marca.</strong> O nome "Brain
            Framework", a composição "Brain Framework — by Cadu Azeredo" e o
            nome "Cadu Azeredo" <strong className="text-foreground">não</strong>{" "}
            são licenciados junto com o código: a seção 6 da Apache 2.0 é
            explícita em não conceder direito de marca. Você pode dizer que seu
            trabalho foi feito <em>com</em> o Brain Framework; não pode se
            apresentar sob o nome composto nem sugerir endosso, parceria ou
            afiliação que não existam.
          </p>
        </Secao>

        <Secao titulo="4. Conteúdo técnico não é consultoria">
          <p>
            O material técnico publicado aqui é informação geral, escrita a
            partir de experiência real, mas{" "}
            <strong className="text-foreground">sem conhecer o seu caso</strong>
            .
          </p>
          <p>
            Aplicar qualquer coisa daqui ao seu sistema é decisão sua, e a
            responsabilidade pelo resultado é sua. Antes de mexer em produção,
            teste, tenha backup e — quando o risco for relevante — busque
            avaliação específica.
          </p>
          <p>
            Números e afirmações de desempenho só aparecem quando foram medidos,
            e vêm com a data da medição. O que não foi medido é apresentado como
            hipótese, e hipótese não é promessa.
          </p>
        </Secao>

        <Secao titulo="5. Software fornecido como está">
          <p>
            O Brain Framework é distribuído{" "}
            <strong className="text-foreground">sem garantias</strong>, nos
            termos das seções 7 e 8 da Apache 2.0: sem garantia de adequação a
            um propósito, e sem responsabilidade por danos decorrentes do uso.
          </p>
          <p>
            Em bom português: as ferramentas de validação e de exportação
            incluídas no framework são{" "}
            <strong className="text-foreground">
              rede de segurança, não garantia
            </strong>
            . Quem opera uma instância é responsável pelo conteúdo dela —
            inclusive por não colocar segredo nem dado de terceiro onde não
            deve.
          </p>
        </Secao>

        <Secao titulo="6. Uso aceitável">
          <p>Ao usar o site, você concorda em não:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              tentar obter acesso não autorizado a qualquer parte dele ou à
              infraestrutura;
            </li>
            <li>
              enviar pelo formulário conteúdo ilegal, ofensivo, ou dado pessoal
              de terceiros sem base legal;
            </li>
            <li>
              usar o formulário para disparo automatizado ou publicidade não
              solicitada;
            </li>
            <li>usar o conteúdo para se passar pelo operador.</li>
          </ul>
        </Secao>

        <Secao titulo="7. Links para fora">
          <p>
            O site aponta para serviços de terceiros — repositórios, vídeos,
            documentação. Esses destinos têm regras próprias e não estão sob
            controle do operador.
          </p>
        </Secao>

        <Secao titulo="8. Disponibilidade">
          <p>
            O site é oferecido no estado em que está, sem compromisso de
            disponibilidade contínua. Pode sair do ar para manutenção, mudar de
            endereço ou ser descontinuado.
          </p>
        </Secao>

        <Secao titulo="9. Alterações">
          <p>
            Estes termos podem mudar. A versão vigente é sempre a publicada
            nesta página, com a data de atualização no topo. Uso continuado
            depois de uma alteração significa concordância com a versão nova.
          </p>
        </Secao>

        <Secao titulo="10. Lei aplicável">
          <p>
            Estes termos são regidos pela lei brasileira. Fica eleito o foro do
            domicílio do operador para resolver o que não se resolver por
            acordo.
          </p>
          {email ? (
            <p>
              Dúvidas sobre estes termos:{" "}
              <a
                href={`mailto:${email}?subject=Termos%20de%20Uso`}
                className="text-primary hover:underline break-all"
              >
                {email}
              </a>
              .
            </p>
          ) : null}
        </Secao>

        <footer className="pt-6 border-t border-border/60">
          <p className="text-xs font-mono text-muted-foreground">
            Ver também a{" "}
            <Link to="/privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </footer>
      </div>
    </PageShell>
  );
};

export default TermsPage;
