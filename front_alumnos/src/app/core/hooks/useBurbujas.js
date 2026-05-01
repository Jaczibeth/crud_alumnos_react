import { useMemo } from 'react';
export const useBurbujas = (cantidad = 15) => {
  return useMemo(() => {
    const burbujas = [];
    for (let i = 0; i < cantidad; i++) {
      const tamano = 40 + Math.random() * 110;
      burbujas.push({
        id: `burbuja-${i}`,
        estilo: {
          width: `${tamano}px`,
          height: `${tamano}px`,
          left: `${Math.random() * 100}%`,
          opacity: 0.05 + Math.random() * 0.12,
          animationDuration: `${12 + Math.random() * 18}s`,
          animationDelay: `${Math.random() * 8}s`,
        },
      });
    }
    return burbujas;
  }, [cantidad]);
};
