import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Info, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import TerminalWindow from "@/components/terminal/terminal-window";
import type { ProductSlug } from "@/types";

export type LeadFormStatus =
  "idle" | "submitting" | "success" | "error" | "config-pending";

export interface LeadFormProps {
  produto: ProductSlug;
}

export const LeadForm: React.FC<LeadFormProps> = ({ produto }) => {
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  // O consentimento da LGPD tem de ser afirmativo e informado, e o opt-in nunca
  // pode vir pre-marcado. Por isso o estado nasce falso e o botao fica desabilitado
  // ate voce marcar: nao ha caminho para enviar sem consentir.
  const [consentiu, setConsentiu] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const endpoint = import.meta.env.VITE_LEAD_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus("config-pending");
      return;
    }

    if (!consentiu) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("produto", produto);
    formData.append("consentimento", "aceito");

    setStatus("submitting");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setConsentiu(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <TerminalWindow title="lead-capture --status">
        <div className="flex items-start space-x-3 text-emerald-400">
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-bold">[Status: Recebido]</p>
            <p className="text-muted-foreground leading-relaxed">
              Sua entrada na lista de espera foi registrada. Em breve entramos
              em contato.
            </p>
          </div>
        </div>
      </TerminalWindow>
    );
  }

  if (status === "error") {
    return (
      <TerminalWindow title="lead-capture --status">
        <div className="flex items-start space-x-3 text-primary-muted">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-bold">[Status: Falha no envio]</p>
            <p className="text-muted-foreground leading-relaxed">
              Não foi possível registrar sua entrada agora. Tente novamente em
              instantes.
            </p>
          </div>
        </div>
      </TerminalWindow>
    );
  }

  if (status === "config-pending") {
    return (
      <TerminalWindow title="lead-capture --status">
        <div className="flex items-start space-x-3 text-primary-muted">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-bold">
              [Status: Captura de lead em configuração]
            </p>
            <p className="text-muted-foreground leading-relaxed">
              O envio deste formulário ainda não foi configurado nesta
              instalação. Defina a variável VITE_LEAD_FORM_ENDPOINT para ativar.
            </p>
          </div>
        </div>
      </TerminalWindow>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-product={produto}
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="lead-name"
            className="text-xs font-mono text-muted-foreground uppercase"
          >
            Nome
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            className="w-full rounded bg-surface-elevated border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="lead-email"
            className="text-xs font-mono text-muted-foreground uppercase"
          >
            E-mail
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            className="w-full rounded bg-surface-elevated border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="lead-message"
          className="text-xs font-mono text-muted-foreground uppercase"
        >
          Conte seu caso (opcional)
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          placeholder="O que você precisa resolver?"
          className="w-full rounded bg-surface-elevated border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
        />
      </div>

      <div className="flex items-start space-x-2.5 pt-1">
        <input
          id="lead-consent"
          name="consentimento"
          type="checkbox"
          checked={consentiu}
          onChange={(e) => setConsentiu(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-border bg-surface-elevated accent-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <label
          htmlFor="lead-consent"
          className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
        >
          Concordo que meu nome, e-mail e mensagem sejam usados para responder
          este contato, nos termos da{" "}
          <Link
            to="/privacidade"
            className="text-primary hover:underline"
            target="_blank"
          >
            Política de Privacidade
          </Link>
          . Posso pedir a exclusão a qualquer momento.
        </label>
      </div>

      <Button
        type="submit"
        disabled={status === "submitting" || !consentiu}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Enviando...</span>
          </span>
        ) : (
          "Entrar na lista de espera"
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
