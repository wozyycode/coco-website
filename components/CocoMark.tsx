// components/CocoMark.tsx — Coco Logo İşareti (SVG)
// ─────────────────────────────────────────────────────
// Referans görsellerdeki ay/kalkan formunu birebir vektöre döker:
// dışta bir hilal (kalkan/nöbet teması), sağ tarafta merdiven
// biçimli pozitif alan (koruma katmanları / adım adım güvenlik).

export function CocoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M138 46
           C 118 34, 94 34, 76 46
           C 50 62, 38 92, 46 122
           C 54 152, 80 172, 112 170
           C 136 168, 156 152, 164 130
           L 144 130
           L 144 110
           L 124 110
           L 124 90
           L 104 90
           L 104 70
           L 138 46 Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        d="M100 40
           C 65 40, 36 69, 36 104
           C 36 139, 65 168, 100 168
           C 122 168, 141 157, 152 140
           C 143 148, 130 153, 116 153
           C 89 153, 67 131, 67 104
           C 67 77, 89 55, 116 55
           C 122 55, 128 56, 133 58
           L 100 40 Z"
        fill="currentColor"
      />
    </svg>
  );
}
