'use client';

// components/AnimatedCounter.tsx — Sayaç Animasyonu
// ────────────────────────────────────────────────────
// Ekrana girdiğinde 0'dan hedef değere doğru sayar. easeOutExpo
// eğrisi kullanılır — hızlı başlayıp yavaşça yerine oturur, bu da
// "canlı veri geliyor" hissini "yapay animasyon" hissinden ayırır.

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  value: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({ value, duration = 1.8, suffix = '', decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = (now - start) / (duration * 1000);
      const t = Math.min(elapsed, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.floor(display).toLocaleString('tr-TR');

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}
