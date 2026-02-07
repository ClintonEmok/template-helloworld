import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, random } from "remotion";
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
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
};

// --- Data Generation ---
// Generate events with bursts
const generateEvents = () => {
  const events: number[] = [];
  // Burst 1: 20-30
  for (let i = 0; i < 15; i++) events.push(20 + random(`b1-${i}`) * 10);
  // Sparse 1: 30-70
  for (let i = 0; i < 3; i++) events.push(30 + random(`s1-${i}`) * 40);
  // Burst 2: 70-80
  for (let i = 0; i < 15; i++) events.push(70 + random(`b2-${i}`) * 10);
  return events.sort((a, b) => a - b);
};

const INTERVALS = [
  { start: 0, end: 20, type: "sparse", label: "Sparse" },
  { start: 20, end: 30, type: "burst", label: "Burst" },
  { start: 30, end: 70, type: "sparse", label: "Sparse" },
  { start: 70, end: 80, type: "burst", label: "Burst" },
  { start: 80, end: 100, type: "sparse", label: "Sparse" },
];

export const ConceptTimeline: React.FC<{
  transformationProgress: number;
  showRegions: boolean;
}> = ({ transformationProgress, showRegions }) => {
  const events = useMemo(() => generateEvents(), []);

  // Calculate widths based on transformation
  // Linear: proportional to duration
  // Adaptive: bursts get more space, sparse get less
  const linearWidths = INTERVALS.map((i) => i.end - i.start);

  // Define adaptive weights (bursts expand, sparse compress)

  const adaptiveWidths = INTERVALS.map((i) => {
    if (i.type === "burst") return (i.end - i.start) * 3.5; // Expand bursts
    return (i.end - i.start) * 0.2; // Compress sparse
  });

  // Normalize adaptive widths to sum to 100
  const adaptiveTotal = adaptiveWidths.reduce((a, b) => a + b, 0);
  const normalizedAdaptiveWidths = adaptiveWidths.map(
    (w) => (w / adaptiveTotal) * 100,
  );

  // Outfitpolate current widths
  const currentWidths = linearWidths.map((lw, i) =>
    interpolate(
      transformationProgress,
      [0, 1],
      [lw, normalizedAdaptiveWidths[i]],
    ),
  );

  // Calculate X positions for intervals
  let currentX = 0;
  const intervalPositions = currentWidths.map((w) => {
    const pos = currentX;
    currentX += w;
    return { x: pos, width: w };
  });

  // Helper to map a time 't' to visual 'x' percent
  const mapTimeToX = (t: number) => {
    // Find containing interval
    const idx = INTERVALS.findIndex((i) => t >= i.start && t <= i.end);
    if (idx === -1) return 0;

    const interval = INTERVALS[idx];
    const pos = intervalPositions[idx];

    // Local progress within interval
    const localProgress =
      (t - interval.start) / (interval.end - interval.start);
    return pos.x + localProgress * pos.width;
  };

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        backgroundColor: COLORS.card,
        borderRadius: 24,
        border: `1px solid ${COLORS.border}`,
        position: "relative",
        padding: "60px 40px",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: COLORS.textSecondary,
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {transformationProgress < 0.5
          ? "LINEAR TIME SCALE"
          : "ADAPTIVE TIME SCALE"}
      </div>

      {/* Axis Line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          right: "5%",
          height: 2,
          background: COLORS.border,
        }}
      />

      {/* Outfitvals Backgrounds */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          bottom: "20%",
          left: "5%",
          right: "5%",
          display: "flex",
        }}
      >
        {INTERVALS.map((interval, i) => {
          const widthPct = currentWidths[i];
          const isBurst = interval.type === "burst";
          const opacity = interpolate(
            showRegions ? 1 : 0,
            [0, 1],
            [0, isBurst ? 0.15 : 0.05],
          );

          return (
            <div
              key={i}
              style={{
                width: `${widthPct}%`,
                height: "100%",
                backgroundColor: isBurst
                  ? COLORS.accentOrange
                  : COLORS.accentBlue,
                opacity,
                borderLeft: `1px dashed ${COLORS.border}`,
                borderRight:
                  i === INTERVALS.length - 1
                    ? `1px dashed ${COLORS.border}`
                    : "none",
                position: "relative",
                transition: "background-color 0.5s",
              }}
            >
              {/* Outfitval Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: -30,
                  width: "100%",
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: isBurst ? COLORS.accentOrange : COLORS.textSecondary,
                  opacity: showRegions ? 1 : 0,
                }}
              >
                {isBurst ? "BURST" : "SPARSE"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Events */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          right: "5%",
          height: 0,
        }}
      >
        {events.map((t, i) => {
          const x = mapTimeToX(t);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: 0,
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "white", // Basic white for all points initially
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                zIndex: 10,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const ConceptExplainer: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        padding: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h1
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: "white",
            marginBottom: 10,
          }}
        >
          The Concept
        </h1>
        <p style={{ fontSize: 24, color: COLORS.textSecondary }}>
          Preserving temporal order while revealing hidden density.
        </p>
      </div>

      <div style={{ width: "100%" }}>
        {/* We will drive the props from the video composition later */}
        <ConceptTimeline transformationProgress={0} showRegions={true} />
      </div>
    </AbsoluteFill>
  );
};
