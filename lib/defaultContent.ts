import type { SiteContent } from "./content.types";
import { placeholderImage } from "./placeholder";

/**
 * Conteúdo inicial da PATRONO Barbearia (pt-BR), seguindo o manual da marca.
 * Usado como seed do banco e como fallback quando ainda não há dados salvos.
 *
 * As imagens são placeholders embutidos (SVG data-URI) nas cores da marca —
 * substitua pelas fotos reais no modo de edição.
 */
export const defaultContent: SiteContent = {
  brand: {
    name: "PATRONO",
    tagline: "Barbearia",
    logoUrl: "",
  },
  hero: {
    title: "Pra homem que não complica.",
    subtitle:
      "Corte, barba e cuidado do jeito que tem que ser. Sem excesso, sem enrolação — só o que é clássico e bem-feito.",
    ctaLabel: "Agendar horário",
    media: {
      type: "image",
      url: placeholderImage("Foto de destaque (hero)", { w: 1600, h: 1000, icon: "🐺" }),
      caption: "Ambiente da barbearia",
    },
  },
  about: {
    kicker: "Sobre",
    title: "Para quem entende o valor do clássico",
    text: "A PATRONO nasceu pra quem já sabe o que quer. Aqui o corte é na régua, a barba é desenhada e o atendimento é de verdade. Excesso nunca foi sinal de domínio — o que vale é a técnica, o capricho e o respeito pelo seu tempo.",
    image: placeholderImage("Foto da barbearia", { w: 1000, h: 1250, icon: "🐺" }),
  },
  services: {
    kicker: "Serviços",
    title: "O que fazemos",
    items: [
      {
        id: "svc-corte",
        name: "Corte de cabelo",
        description: "Corte personalizado, lavagem e finalização.",
        durationMin: 40,
        price: "R$ 50",
      },
      {
        id: "svc-barba",
        name: "Barba",
        description: "Toalha quente, navalha e hidratação.",
        durationMin: 30,
        price: "R$ 40",
      },
      {
        id: "svc-combo",
        name: "Corte + Barba",
        description: "O pacote completo. Do jeito que tem que ser.",
        durationMin: 70,
        price: "R$ 80",
      },
      {
        id: "svc-pezinho",
        name: "Acabamento (pezinho)",
        description: "Retoque rápido pra manter tudo na régua.",
        durationMin: 15,
        price: "R$ 25",
      },
    ],
  },
  gallery: {
    kicker: "Galeria",
    title: "Nossos trabalhos",
    items: [
      { id: "g1", type: "image", url: placeholderImage("Trabalho 1", { w: 900, h: 900, icon: "🐺" }), caption: "Corte degradê" },
      { id: "g2", type: "image", url: placeholderImage("Trabalho 2", { w: 900, h: 900, icon: "🐺" }), caption: "Barba desenhada" },
      { id: "g3", type: "image", url: placeholderImage("Trabalho 3", { w: 900, h: 900, icon: "🐺" }), caption: "Ambiente" },
      { id: "g4", type: "image", url: placeholderImage("Trabalho 4", { w: 900, h: 900, icon: "🐺" }), caption: "Cadeira clássica" },
      { id: "g5", type: "image", url: placeholderImage("Trabalho 5", { w: 900, h: 900, icon: "🐺" }), caption: "Detalhes" },
      { id: "g6", type: "image", url: placeholderImage("Trabalho 6", { w: 900, h: 900, icon: "🐺" }), caption: "Corte finalizado" },
    ],
  },
  team: {
    kicker: "Equipe",
    title: "Nossos barbeiros",
    items: [
      { id: "t1", name: "Rafael Souza", role: "Barbeiro master", photo: placeholderImage("Foto do barbeiro", { w: 600, h: 800, icon: "🐺" }), instagram: "" },
      { id: "t2", name: "Lucas Almeida", role: "Especialista em barba", photo: placeholderImage("Foto do barbeiro", { w: 600, h: 800, icon: "🐺" }), instagram: "" },
      { id: "t3", name: "Diego Martins", role: "Barbeiro", photo: placeholderImage("Foto do barbeiro", { w: 600, h: 800, icon: "🐺" }), instagram: "" },
    ],
  },
  testimonials: {
    kicker: "Depoimentos",
    title: "O que dizem",
    items: [
      { id: "d1", name: "André P.", text: "Cheguei sabendo o que queria e saí exatamente como imaginei. Sem enrolação.", rating: 5 },
      { id: "d2", name: "Marcelo R.", text: "Ambiente à altura da marca. Profissionais que entendem do clássico.", rating: 5 },
      { id: "d3", name: "Bruno S.", text: "Pra homem que não complica é isso aqui. Virei cliente fiel.", rating: 5 },
    ],
  },
  contact: {
    kicker: "Contato",
    title: "Agende seu horário",
    address: "R. Sergipe, 780 — Alvorada, Francisco Beltrão - PR, 85601-040",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4722.143721246181!2d-53.058254399999996!3d-26.0792233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f073000b337bb3%3A0xc105ed488838fbfb!2sPatrono%20Barbearia!5e0!3m2!1spt-BR!2sbr!4v1783542593885!5m2!1spt-BR!2sbr",
    hours: [
      { label: "Segunda a Sexta", value: "09h — 20h" },
      { label: "Sábado", value: "09h — 18h" },
      { label: "Domingo", value: "Fechado" },
    ],
    whatsapp: "5511999999999",
    whatsappMessage: "Olá! Gostaria de agendar um horário na PATRONO.",
    instagram: "https://www.instagram.com/patronobarbearia2010/",
    email: "contato@patrono.com.br",
  },
};
