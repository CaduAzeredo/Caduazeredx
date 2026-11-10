/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endpoint do Formspree que recebe as listas de espera e o e-mail do quiz. */
  readonly VITE_LEAD_FORM_ENDPOINT?: string;
}
