export interface PublicRepo {
  name: string;
  url?: string;
  status: "public" | "em-breve";
}

export interface ContactLinks {
  email?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  whatsapp?: string;
  youtube?: string;
  publicRepos?: PublicRepo[];
}

export const contactLinks: ContactLinks = {
  // Insira seus links reais abaixo. Campos vazios/nulos não serão exibidos no site.
  email: "caduazeredo@gmail.com", // Exemplo: "cadu@caduazeredo.com"
  linkedin: "https://www.linkedin.com/in/carlos-eduardoaz/", // Exemplo: "https://linkedin.com/in/caduazeredo"
  github: "https://github.com/CaduAzeredo", // Exemplo: "https://github.com/caduazeredo"
  instagram: "https://github.com/CaduAzeredo", // Exemplo: "https://instagram.com/caduazeredo"
  whatsapp: "https://wa.me/qr/2F5B3LFEJHYKM1", // Exemplo: "https://wa.me/5563999999999"
  youtube: "https://www.youtube.com/@CaduAzeredo",
  publicRepos: [
    {
      name: "Brain Framework",
      url: "https://github.com/CaduAzeredo/brain-framework",
      status: "public",
    },
    { name: "Rei", status: "em-breve" },
  ],
};
