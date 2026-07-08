import { z } from "zod";

/**
 * Modelo de conteúdo do site inteiro, salvo como um único documento JSON.
 * O schema Zod valida o payload recebido na rota PUT /api/content.
 */

const mediaSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.string(),
  caption: z.string().optional().default(""),
});

const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  durationMin: z.number().int().nonnegative(),
  price: z.string(), // texto livre: "R$ 45", "a partir de R$ 30"
});

const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  photo: z.string(),
  instagram: z.string().optional().default(""),
});

const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  text: z.string(),
  rating: z.number().int().min(1).max(5),
});

const galleryItemSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "video"]),
  url: z.string(),
  caption: z.string().optional().default(""),
});

export const siteContentSchema = z.object({
  brand: z.object({
    name: z.string(),
    tagline: z.string(),
    logoUrl: z.string().optional().default(""),
  }),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    ctaLabel: z.string(),
    media: mediaSchema,
  }),
  about: z.object({
    kicker: z.string(),
    title: z.string(),
    text: z.string(),
    image: z.string(),
  }),
  services: z.object({
    kicker: z.string(),
    title: z.string(),
    items: z.array(serviceSchema),
  }),
  gallery: z.object({
    kicker: z.string(),
    title: z.string(),
    items: z.array(galleryItemSchema),
  }),
  team: z.object({
    kicker: z.string(),
    title: z.string(),
    items: z.array(teamMemberSchema),
  }),
  testimonials: z.object({
    kicker: z.string(),
    title: z.string(),
    items: z.array(testimonialSchema),
  }),
  contact: z.object({
    kicker: z.string(),
    title: z.string(),
    address: z.string(),
    mapEmbedUrl: z.string(),
    hours: z.array(z.object({ label: z.string(), value: z.string() })),
    whatsapp: z.string(), // apenas dígitos, ex: "5511999999999"
    whatsappMessage: z.string(),
    instagram: z.string(),
    email: z.string(),
  }),
});

export type Media = z.infer<typeof mediaSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;
