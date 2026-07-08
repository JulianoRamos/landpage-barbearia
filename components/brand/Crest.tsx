/**
 * Brasão PATRONO (símbolo): chevron + escudo + cabeça de lobo estilizada.
 * Aproximação geométrica do logo da marca — o dono pode substituir pelo arquivo
 * oficial subindo uma imagem de logo no modo de edição (campo brand.logoUrl).
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
      viewBox="0 0 120 150"
      className={className}
      role="img"
      aria-label="Brasão PATRONO"
      fill="none"
    >
      {/* Chevron / coroa */}
      <path
        d="M46 20 L54 7 L60 15 L66 7 L74 20 L66 20 L60 15 L54 20 Z"
        fill={color}
      />
      {/* Escudo (contorno) com pequeno entalhe no topo */}
      <path
        d="M28 26 L54 26 L60 32 L66 26 L92 26 L92 92 Q92 128 60 142 Q28 128 28 92 Z"
        stroke={color}
        strokeWidth="3"
      />
      {/* Cabeça de lobo (perfil, voltada à esquerda) com olho vazado */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 86 L48 75 L52 79 L55 60 L51 45 L63 58 L67 53 L75 42 L79 61 L82 80 L80 106 L66 112 L58 97 L48 97 L42 91 Z
           M60 68 a3 3 0 1 0 0.01 0 Z"
        fill={color}
      />
    </svg>
  );
}
