import React from 'react';
import {
  interpolate,
  useCurrentFrame,
  random,
} from 'remotion';

const COLORS = {
  bg: '#020617',
  border: '#1e293b',
  accentBlue: '#3b82f6',
  accentOrange: '#f97316',
};

const pointsData = Array.from({ length: 200 }).map((_, i) => ({
  x: (random(`x-${i}`) - 0.5) * 1.5,
  y: (random(`y-${i}`) - 0.5) * 1.5,
  z: (i / 100) - 1,
  isBurst: i > 120 && i < 160,
  isFiltered: i % 3 === 0,
}));

export const WarpedCube: React.FC<{ 
  warpProgress: number; 
  filter?: boolean; 
  sliceRange?: [number, number] 
}> = ({ warpProgress, filter, sliceRange }) => {
  const frame = useCurrentFrame();
  const width = 600;
  const height = 600;
  
  const angle = (frame * 0.015);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const cosB = Math.cos(0.4);
  const sinB = Math.sin(0.4);

  const cubeEdges = [
    [[-1, -1, -1], [1, -1, -1]], [[1, -1, -1], [1, 1, -1]], [[1, 1, -1], [-1, 1, -1]], [[-1, 1, -1], [-1, -1, -1]],
    [[-1, -1, 1], [1, -1, 1]], [[1, -1, 1], [1, 1, 1]], [[1, 1, 1], [-1, 1, 1]], [[-1, 1, 1], [-1, -1, 1]],
    [[-1, -1, -1], [-1, -1, 1]], [[1, -1, -1], [1, -1, 1]], [[1, 1, -1], [1, 1, 1]], [[-1, 1, -1], [-1, 1, 1]]
  ];

  const project = (x: number, y: number, z: number) => {
    // Smooth warping of the time axis (Z)
    const linearZ = z;
    const warpedZ = interpolate(z, [-1, 0.2, 0.6, 1], [-1, -0.1, 0.7, 1]);
    const currentZ = interpolate(warpProgress, [0, 1], [linearZ, warpedZ]);
    
    const x1 = x * cosA - currentZ * sinA;
    const z1 = x * sinA + currentZ * cosA;
    const y2 = y * cosB - z1 * sinB;
    const z2 = y2 * sinB + z1 * cosB;
    const factor = 500 / (500 + z2 * 150);
    return {
      x: x1 * factor * 180 + width / 2,
      y: y2 * factor * 180 + height / 2,
      z2
    };
  };

  const projectedPoints = pointsData.map((p) => {
    if (filter && !p.isFiltered) return null;

    const z = p.z;
    
    // Slice logic
    if (sliceRange) {
      const zMin = (sliceRange[0] / 50) - 1;
      const zMax = (sliceRange[1] / 50) - 1;
      if (z < zMin || z > zMax) return null;
    }

    const linearZ = z;
    const warpedZ = p.isBurst ? 
        interpolate(z, [0.2, 0.6], [0.2, 0.3]) : 
        interpolate(z, [-1, 0.2, 0.6, 1], [-1, -0.1, 0.7, 1]);
    
    const currentZ = interpolate(warpProgress, [0, 1], [linearZ, warpedZ]);

    const x1 = p.x * cosA - currentZ * sinA;
    const z1 = p.x * sinA + currentZ * cosA;
    const y2 = p.y * cosB - z1 * sinB;
    const z2 = y2 * sinB + z1 * cosB;

    const factor = 500 / (500 + z2 * 150);
    return {
      x: x1 * factor * 180 + width / 2,
      y: y2 * factor * 180 + height / 2,
      isBurst: p.isBurst,
      z2
    };
  }).filter(p => p !== null).sort((a, b) => (b?.z2 || 0) - (a?.z2 || 0));


  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* 3D Cube Wireframe */}
      {cubeEdges.map((edge, i) => {
        const p1 = project(edge[0][0], edge[0][1], edge[0][2]);
        const p2 = project(edge[1][0], edge[1][1], edge[1][2]);
        return (
          <line 
            key={i}
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={COLORS.border}
            strokeWidth="1"
            opacity="0.4"
          />
        );
      })}

      {/* Slice highlight */}
      {sliceRange && (
        <rect 
          x={width/2 - 100}
          y={height/2 - 200}
          width={200}
          height={400}
          fill={COLORS.accentBlue}
          opacity={0.1}
          style={{ pointerEvents: 'none' }}
        />
      )}
      
      {/* Projected Data Points */}
      {projectedPoints.map((p, i) => (
        <circle
          key={i}
          cx={p!.x}
          cy={p!.y}
          r={interpolate(p!.z2, [-2, 2], [5, 2])}
          fill={p!.isBurst ? COLORS.accentOrange : COLORS.accentBlue}
          style={{ 
            filter: `blur(${p!.isBurst ? '2px' : '0px'})`,
            opacity: interpolate(p!.z2, [-1.5, 1.5], [1, 0.3])
          }}
        />
      ))}
    </svg>
  );
};
