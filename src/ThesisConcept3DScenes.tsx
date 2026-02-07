import React from "react";
import { interpolate, useCurrentFrame, random, Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/Outfit";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "800", "900"],
});

const COLORS = {
  bg: "#020617",
  card: "#0f172a",
  border: "#1e293b",
  accentBlue: "#3b82f6",
  accentOrange: "#f97316",
  textSecondary: "#94a3b8",
};

// --- 3D Cube Logic (Adapted from WarpedCube) ---
const pointsData = [
  // Sparse Region 1 [-1, -0.35]
  ...Array.from({ length: 40 }).map((_, i) => ({
    x: (random(`xs1-${i}`) - 0.5) * 1.5,
    y: (random(`ys1-${i}`) - 0.5) * 1.5,
    z: interpolate(random(`zs1-${i}`), [0, 1], [-1, -0.35]),
    isBurst: false,
  })),
  // Burst 1 [-0.35, -0.1] - High Density
  ...Array.from({ length: 120 }).map((_, i) => ({
    x: (random(`xb1-${i}`) - 0.5) * 1.5,
    y: (random(`yb1-${i}`) - 0.5) * 1.5,
    z: interpolate(random(`zb1-${i}`), [0, 1], [-0.35, -0.1]),
    isBurst: true,
  })),
  // Sparse Region 2 [-0.1, 0.45]
  ...Array.from({ length: 40 }).map((_, i) => ({
    x: (random(`xs2-${i}`) - 0.5) * 1.5,
    y: (random(`ys2-${i}`) - 0.5) * 1.5,
    z: interpolate(random(`zs2-${i}`), [0, 1], [-0.1, 0.45]),
    isBurst: false,
  })),
  // Burst 2 [0.45, 0.7] - High Density
  ...Array.from({ length: 120 }).map((_, i) => ({
    x: (random(`xb2-${i}`) - 0.5) * 1.5,
    y: (random(`yb2-${i}`) - 0.5) * 1.5,
    z: interpolate(random(`zb2-${i}`), [0, 1], [0.45, 0.7]),
    isBurst: true,
  })),
  // Sparse Region 3 [0.7, 1]
  ...Array.from({ length: 30 }).map((_, i) => ({
    x: (random(`xs3-${i}`) - 0.5) * 1.5,
    y: (random(`ys3-${i}`) - 0.5) * 1.5,
    z: interpolate(random(`zs3-${i}`), [0, 1], [0.7, 1]),
    isBurst: false,
  })),
];

const ConceptCube: React.FC<{
  transformationProgress: number;
  showLabels: boolean;
}> = ({ transformationProgress, showLabels }) => {
  const frame = useCurrentFrame();
  const width = 800;
  const height = 800;

  // Rotation
  const angle = frame * 0.01 + 0.5;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const cosB = Math.cos(0.2); // Lower pitch for better height view
  const sinB = Math.sin(0.2);

  // Edges
  const cubeEdges = [
    [
      [-1, -1, -1],
      [1, -1, -1],
    ],
    [
      [1, -1, -1],
      [1, 1, -1],
    ],
    [
      [1, 1, -1],
      [-1, 1, -1],
    ],
    [
      [-1, 1, -1],
      [-1, -1, -1],
    ],
    [
      [-1, -1, 1],
      [1, -1, 1],
    ],
    [
      [1, -1, 1],
      [1, 1, 1],
    ],
    [
      [1, 1, 1],
      [-1, 1, 1],
    ],
    [
      [-1, 1, 1],
      [-1, -1, 1],
    ],
    [
      [-1, -1, -1],
      [-1, -1, 1],
    ],
    [
      [1, -1, -1],
      [1, -1, 1],
    ],
    [
      [1, 1, -1],
      [1, 1, 1],
    ],
    [
      [-1, 1, -1],
      [-1, 1, 1],
    ],
  ];

  const project = (x: number, y: number, z: number) => {
    // Data mapping:
    // p.x -> 3D X
    // p.y -> 3D Z (Depth)
    // p.z (Time) -> 3D Y (Height)

    // Warping Logic on Data Z (Time)
    let warpedT = z;
    if (z < -0.35) warpedT = interpolate(z, [-1, -0.35], [-1, -0.8]);
    else if (z < -0.1) warpedT = interpolate(z, [-0.35, -0.1], [-0.8, -0.2]);
    else if (z < 0.45) warpedT = interpolate(z, [-0.1, 0.45], [-0.2, 0.2]);
    else if (z < 0.7) warpedT = interpolate(z, [0.45, 0.7], [0.2, 0.8]);
    else warpedT = interpolate(z, [0.7, 1], [0.8, 1]);

    const currentT = interpolate(transformationProgress, [0, 1], [z, warpedT]);

    // 3D Coordinates
    const worldX = x;
    const worldY = -currentT; // Invert so time goes UP
    const worldZ = y;

    // Rotation Matrix (Rotate around Y-axis)
    const x1 = worldX * cosA - worldZ * sinA;
    const z1 = worldX * sinA + worldZ * cosA;

    // Tilt (Rotate around X-axis)
    const y2 = worldY * cosB - z1 * sinB;
    const z2 = worldY * sinB + z1 * cosB;

    const factor = 600 / (600 + z2 * 150);
    return {
      x: x1 * factor * 250 + width / 2,
      y: y2 * factor * 250 + height / 2,
      z2,
    };
  };

  const projectedPoints = pointsData
    .map((p) => {
      return { ...project(p.x, p.y, p.z), isBurst: p.isBurst };
    })
    .sort((a, b) => (b.z2 || 0) - (a.z2 || 0));

  // Labels track Time (Z in data)
  const labels = [
    { text: "Start", t: -1 },
    { text: "Burst 1", t: -0.22 },
    { text: "Burst 2", t: 0.57 },
    { text: "End", t: 1 },
  ].map((l) => ({ ...l, ...project(1.2, 0, l.t) }));

  return (
    <div style={{ position: "relative", width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Wireframe edges need remapping too */}
        {cubeEdges.map((edge, i) => {
          // Edge coords are [x, y, z] in standard cube.
          // We treat index 2 as Time (Height)
          const p1 = project(edge[0][0], edge[0][1], edge[0][2]);
          const p2 = project(edge[1][0], edge[1][1], edge[1][2]);
          return (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={COLORS.border}
              strokeWidth="2"
              opacity="0.6"
            />
          );
        })}

        {/* Points */}
        {projectedPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={interpolate(p.z2, [-2, 2], [6, 2])}
            fill={p.isBurst ? COLORS.accentOrange : COLORS.accentBlue}
            opacity={interpolate(p.z2, [-1.5, 1.5], [1, 0.4])}
          />
        ))}
      </svg>

      {/* 3D Labels */}
      {showLabels &&
        labels.map((l, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: l.x,
              top: l.y,
              color: l.text.includes("Burst")
                ? COLORS.accentOrange
                : COLORS.textSecondary,
              fontWeight: 700,
              fontSize: 14,
              transform: "translate(10px, -50%)",
              opacity: transformationProgress > 0.5 ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          >
            {l.text}
          </div>
        ))}
    </div>
  );
};

// --- Scenes ---

const LinearCubeScene: React.FC = () => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2
          style={{ fontSize: 48, fontWeight: 800, color: "white", fontFamily }}
        >
          1. Linear Cube
        </h2>
        <p
          style={{
            fontSize: 24,
            color: COLORS.textSecondary,
            marginTop: 10,
            fontFamily,
          }}
        >
          Dense bursts are hidden in narrow slices.
        </p>
      </div>
      <ConceptCube transformationProgress={0} showLabels={false} />
    </div>
  );
};

const WarpedCubeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [20, 100], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2
          style={{ fontSize: 48, fontWeight: 800, color: "white", fontFamily }}
        >
          2. Warped Cube
        </h2>
        <p
          style={{
            fontSize: 24,
            color: COLORS.textSecondary,
            marginTop: 10,
            fontFamily,
          }}
        >
          Time axis expands to reveal structure.
        </p>
      </div>
      <ConceptCube transformationProgress={progress} showLabels={true} />
    </div>
  );
};

export { LinearCubeScene, WarpedCubeScene };
