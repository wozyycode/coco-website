'use client';

// components/ThreatRadar.tsx — İmza Görsel Öğe: Tehdit Radarı
// ─────────────────────────────────────────────────────────────
// Bu sayfanın "hatırlanacak tek şeyi". Coco'nun logosu bir ay/kalkan
// formunda — "karanlıkta nöbet tutan tek ışık" fikrini somutlaştırır.
// Arka planda rastgele noktalar sunucuları temsil eder; bazıları
// zaman zaman kırmızıya yanıp söner (bir "saldırı" anı) ve hemen
// ardından yeşile döner (Coco'nun anında müdahalesi). Bu, botun asıl
// işini –gerçek zamanlı tehdit algılama– dekoratif olmayan bir
// animasyonla anlatıyor.

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  state: 'idle' | 'threat' | 'protected';
}

const NODE_COUNT = 28;

function generateNodes(): Node[] {
  return Array.from({ length: NODE_COUNT }, (_, i) => ({
    id: i,
    x: 8 + Math.random() * 84,
    y: 8 + Math.random() * 84,
    state: 'idle',
  }));
}

export function ThreatRadar() {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    setNodes(generateNodes());

    const interval = setInterval(() => {
      setNodes(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = { ...next[idx], state: 'threat' };
        return next;
      });

      // Kısa süre sonra "korundu" durumuna geç, sonra normale dön
      setTimeout(() => {
        setNodes(prev => {
          const next = [...prev];
          const idx = next.findIndex(n => n.state === 'threat');
          if (idx !== -1) next[idx] = { ...next[idx], state: 'protected' };
          return next;
        });
      }, 400);

      setTimeout(() => {
        setNodes(prev => prev.map(n => (n.state === 'protected' ? { ...n, state: 'idle' } : n)));
      }, 1800);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute rounded-full"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{
            width: node.state === 'idle' ? 4 : 8,
            height: node.state === 'idle' ? 4 : 8,
            backgroundColor:
              node.state === 'threat' ? '#F04747' : node.state === 'protected' ? '#3ECF8E' : '#5865F2',
            boxShadow:
              node.state === 'threat'
                ? '0 0 16px 4px rgba(240,71,71,0.6)'
                : node.state === 'protected'
                  ? '0 0 16px 4px rgba(62,207,142,0.6)'
                  : '0 0 6px 1px rgba(88,101,242,0.3)',
            opacity: node.state === 'idle' ? 0.4 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      ))}

      {/* Merkezden dışa doğru tarama halkası */}
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full border border-signal-blue/20"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{ width: [0, 600], height: [0, 600], opacity: [0.5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
      />
    </div>
  );
}
