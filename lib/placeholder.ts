/**
 * Gera placeholders de imagem embutidos (data-URI SVG).
 * Vantagem: sempre renderizam (sem depender de rede/serviço externo) e deixam
 * claro que devem ser substituídos pelas fotos reais no modo de edição.
 */
export function placeholderImage(
  label: string,
  opts: { w?: number; h?: number; icon?: string } = {},
): string {
  const { w = 1200, h = 1200, icon = "✂" } = opts;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a1a1e"/>
      <stop offset="1" stop-color="#0f0f12"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="12" y="12" width="${w - 24}" height="${h - 24}" fill="none" stroke="#d4af37" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="10 8" rx="16"/>
  <text x="50%" y="46%" font-family="Georgia, serif" font-size="${Math.round(Math.min(w, h) * 0.18)}" fill="#d4af37" text-anchor="middle" dominant-baseline="middle">${icon}</text>
  <text x="50%" y="60%" font-family="system-ui, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.05)}" fill="#9a9a9a" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
