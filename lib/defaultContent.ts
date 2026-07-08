import type { SiteContent } from "./content.types";
import { placeholderImage } from "./placeholder";

/**
 * Conteúdo inicial da barbearia (pt-BR).
 * Usado como seed do banco e como fallback quando ainda não há dados salvos.
 *
 * As imagens são placeholders embutidos (SVG data-URI) — sempre renderizam e
 * devem ser substituídas pelas fotos reais da barbearia no modo de edição.
 */
export const defaultContent: SiteContent = {
  brand: {
    name: "Navalha & Cia",
    tagline: "Barbearia",
  },
  hero: {
    title: "Corte, estilo e tradição",
    subtitle:
      "Uma barbearia onde cada detalhe importa. Corte na régua, barba desenhada e aquele café por conta da casa.",
    ctaLabel: "Agendar pelo WhatsApp",
    media: {
      type: "image",
      url: placeholderImage("Foto de destaque (hero)", { w: 1600, h: 1000, icon: "✂" }),
      caption: "Ambiente da barbearia",
    },
  },
  about: {
    kicker: "Sobre nós",
    title: "Tradição encontra o moderno",
    text: "Há mais de 10 anos cuidando do visual masculino com técnica, capricho e atendimento de verdade. Nossos barbeiros são especialistas em cortes clássicos e nas tendências mais atuais. Aqui você relaxa, toma um café e sai renovado.",
    image: placeholderImage("Foto da barbearia", { w: 1000, h: 1250, icon: "💈" }),
  },
  services: {
    kicker: "Serviços",
    title: "Nossos serviços e preços",
    items: [
      {
        id: "svc-corte",
        name: "Corte de cabelo",
        description: "Corte personalizado, lavagem e finalização.",
        durationMin: 40,
        price: "R$ 45",
      },
      {
        id: "svc-barba",
        name: "Barba",
        description: "Toalha quente, navalha e hidratação.",
        durationMin: 30,
        price: "R$ 35",
      },
      {
        id: "svc-combo",
        name: "Combo Corte + Barba",
        description: "O pacote completo para renovar o visual.",
        durationMin: 70,
        price: "R$ 70",
      },
      {
        id: "svc-pezinho",
        name: "Acabamento (pezinho)",
        description: "Retoque rápido para manter o corte na régua.",
        durationMin: 15,
        price: "R$ 20",
      },
    ],
  },
  gallery: {
    kicker: "Galeria",
    title: "Nossos trabalhos",
    items: [
      { id: "g1", type: "image", url: placeholderImage("Trabalho 1", { w: 900, h: 900, icon: "✂" }), caption: "Corte degradê" },
      { id: "g2", type: "image", url: placeholderImage("Trabalho 2", { w: 900, h: 900, icon: "💈" }), caption: "Barba desenhada" },
      { id: "g3", type: "image", url: placeholderImage("Trabalho 3", { w: 900, h: 900, icon: "✂" }), caption: "Ambiente" },
      { id: "g4", type: "image", url: placeholderImage("Trabalho 4", { w: 900, h: 900, icon: "💈" }), caption: "Cadeira clássica" },
      { id: "g5", type: "image", url: placeholderImage("Trabalho 5", { w: 900, h: 900, icon: "✂" }), caption: "Detalhes" },
      { id: "g6", type: "image", url: placeholderImage("Trabalho 6", { w: 900, h: 900, icon: "💈" }), caption: "Corte finalizado" },
    ],
  },
  team: {
    kicker: "Equipe",
    title: "Nossos barbeiros",
    items: [
      { id: "t1", name: "Rafael Souza", role: "Barbeiro master", photo: placeholderImage("Foto do barbeiro", { w: 600, h: 800, icon: "👤" }), instagram: "" },
      { id: "t2", name: "Lucas Almeida", role: "Especialista em barba", photo: placeholderImage("Foto do barbeiro", { w: 600, h: 800, icon: "👤" }), instagram: "" },
      { id: "t3", name: "Diego Martins", role: "Barbeiro", photo: placeholderImage("Foto do barbeiro", { w: 600, h: 800, icon: "👤" }), instagram: "" },
    ],
  },
  testimonials: {
    kicker: "Depoimentos",
    title: "O que dizem nossos clientes",
    items: [
      { id: "d1", name: "André P.", text: "Melhor barbearia da região. Atendimento impecável e o corte sempre perfeito.", rating: 5 },
      { id: "d2", name: "Marcelo R.", text: "Ambiente top, profissionais que entendem do assunto. Virei cliente fiel.", rating: 5 },
      { id: "d3", name: "Bruno S.", text: "Chego, tomo um café e saio novo. Recomendo demais!", rating: 5 },
    ],
  },
  contact: {
    kicker: "Contato",
    title: "Agende seu horário",
    address: "Rua Exemplo, 123 — Centro, Sua Cidade - UF",
    mapEmbedUrl: "https://www.google.com/maps?q=barbearia&output=embed",
    hours: [
      { label: "Segunda a Sexta", value: "09h — 20h" },
      { label: "Sábado", value: "09h — 18h" },
      { label: "Domingo", value: "Fechado" },
    ],
    whatsapp: "5511999999999",
    whatsappMessage: "Olá! Gostaria de agendar um horário.",
    instagram: "https://instagram.com",
    email: "contato@suabarbearia.com.br",
  },
};
