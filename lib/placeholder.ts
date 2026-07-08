/**
 * Gera placeholders de imagem embutidos (data-URI SVG) nas cores da marca PATRONO.
 * Vantagem: sempre renderizam (sem depender de rede/serviço externo) e deixam
 * claro que devem ser substituídos pelas fotos reais no modo de edição.
 */
export function placeholderImage(
  label: string,
  opts: { w?: number; h?: number; icon?: string } = {},
): string {
  const { w = 1200, h = 1200, icon = "🐺" } = opts;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#16210E"/>
  <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="#C08653" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="10 8" rx="10"/>
  <text x="50%" y="45%" font-family="Georgia, serif" font-size="${Math.round(Math.min(w, h) * 0.16)}" text-anchor="middle" dominant-baseline="middle">${icon}</text>
  <text x="50%" y="60%" font-family="system-ui, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.045)}" fill="#C08653" letter-spacing="2" text-anchor="middle" dominant-baseline="middle">${label.toUpperCase()}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
