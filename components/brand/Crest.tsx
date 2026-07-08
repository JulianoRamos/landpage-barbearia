/**
 * Brasão PATRONO (símbolo): coroa + escudo + cabeça de lobo.
 * Recriação vetorial de uma cor só (currentColor) e fundo transparente — assim
 * funciona sobre qualquer fundo (creme/verde), bastando definir a cor do texto.
 * Para usar o arquivo oficial, defina brand.logoUrl no conteúdo (modo de edição).
 */
export function Crest({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 367 427"
      className={className}
      role="img"
      aria-label="Brasão PATRONO"
      fill={color}
    >
      {/* Coroa — duas lâminas com entalhe central */}
      <path d="M120 26 L182 42 L173 56 L128 56 Z" />
      <path d="M247 26 L185 42 L194 56 L239 56 Z" />

      {/* Escudo (moldura) com aba central no topo */}
      <path
        fill="none"
        stroke={color}
        strokeWidth="19"
        strokeLinejoin="round"
        d="M60 86 L164 86 L164 70 L203 70 L203 86 L307 86 L307 298 Q307 361 183.5 393 Q60 361 60 298 Z"
      />

      {/* Cabeça de lobo (perfil à esquerda), com olho e boca vazados */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M78 214
          L150 176
          L150 132 L168 156
          L176 120 L196 152
          L214 124 L226 158
          L258 150
          C300 176 322 236 316 300
          L316 300 L307 298
          L307 210
          C300 250 286 300 250 330
          C232 344 206 350 186 344
          C196 356 210 360 226 356
          C214 372 190 378 168 370
          C148 362 132 344 128 322
          L150 250 L110 240 Z
          M150 196 a9 7 0 1 0 0.1 0 Z
          M92 232 L128 226 L112 244 Z
        "
      />
    </svg>
  );
}
