import React, { useEffect } from "react";
import PageShell from "@/components/layout/page-shell";
import Button from "@/components/ui/button";
import TerminalWindow from "@/components/terminal/terminal-window";
import { contactLinks } from "@/content/contacts";
import { Mail, MessageSquare, Info } from "lucide-react";

// Componentes SVG customizados para ícones de marcas (removidos do lucide-react 1.0+)
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const ContactPage: React.FC = () => {
  // Atualizar título para SEO
  useEffect(() => {
    document.title =
      "Contato | Cadu Azeredo — Front-end Developer & Product Builder";
  }, []);

  // Mapeia ícones para cada canal
  const config = [
    {
      key: "email",
      label: "Enviar E-mail",
      url: `mailto:${contactLinks.email}`,
      icon: Mail,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      url: contactLinks.linkedin,
      icon: LinkedinIcon,
    },
    {
      key: "github",
      label: "GitHub",
      url: contactLinks.github,
      icon: GithubIcon,
    },
    {
      key: "instagram",
      label: "Instagram",
      url: contactLinks.instagram,
      icon: InstagramIcon,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      url: contactLinks.whatsapp,
      icon: MessageSquare,
    },
  ];

  // Filtra apenas os canais com valor preenchido
  const activeContacts = config.filter((c) => {
    const val = contactLinks[c.key as keyof typeof contactLinks];
    return val && val.trim() !== "";
  });

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
        {/* Cabeçalho */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
            Contato
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed font-sans">
            Se você tem uma ideia, produto ou projeto para conversar, pode me
            encontrar pelos canais ativos abaixo.
          </p>
        </div>

        <hr className="border-border/60" />

        {/* EXIBIÇÃO DINÂMICA DE CONTATOS */}
        {activeContacts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.key}
                  href={contact.url}
                  target={contact.key === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start space-x-3 py-4 border-glow"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{contact.label}</span>
                  </Button>
                </a>
              );
            })}
          </div>
        ) : (
          /* Mensagem técnica caso não haja contatos configurados (Conforme regras de honestidade) */
          <TerminalWindow title="system-log --contact-status">
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3 text-primary-muted">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-bold">
                    [Status: Canais de contato em configuração]
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Nenhum canal de contato foi configurado para exibição
                    pública na V1 ainda.
                  </p>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/60 border border-border/80 rounded font-mono text-[11px] text-muted-foreground/80 leading-relaxed">
                <p className="text-primary font-semibold mb-1">
                  Como ativar os canais de contato:
                </p>
                <p>
                  1. Abra o arquivo:{" "}
                  <code className="text-foreground">
                    src/content/contacts.ts
                  </code>
                </p>
                <p>2. Preencha os campos com suas URLs e e-mails reais.</p>
                <p>
                  3. Os botões de atalho correspondentes serão ativados e
                  exibidos aqui automaticamente.
                </p>
              </div>
            </div>
          </TerminalWindow>
        )}
      </div>
    </PageShell>
  );
};

export default ContactPage;
