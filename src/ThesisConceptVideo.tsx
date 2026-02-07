import React from "react";
import { Series, interpolate, useCurrentFrame, Easing } from "remotion";
import { ConceptTimeline } from "./ThesisConceptScenes";
import { ThesisIntro } from "./ThesisScenes";

const COLORS = {
  bg: "#020617",
  textSecondary: "#94a3b8",
};

const LinearScene: React.FC = () => {
  const frame = useCurrentFrame();
  const showRegions = frame > 60; // Reveal regions after 2s

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
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2 style={{ fontSize: 48, fontWeight: 800, color: "white" }}>
          Step 1: Raw Temporal Data
        </h2>
        <p style={{ fontSize: 24, color: COLORS.textSecondary, marginTop: 10 }}>
          Events plotted on a standard linear scale.
        </p>
      </div>
      <ConceptTimeline transformationProgress={0} showRegions={showRegions} />
    </div>
  );
};

const TransformationScene: React.FC = () => {
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
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2 style={{ fontSize: 48, fontWeight: 800, color: "white" }}>
          Step 2: Adaptive Transformation
        </h2>
        <p style={{ fontSize: 24, color: COLORS.textSecondary, marginTop: 10 }}>
          Expanding bursts, compressing sparse intervals.
        </p>
      </div>
      <ConceptTimeline transformationProgress={progress} showRegions={true} />
    </div>
  );
};

export const ThesisConceptVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <ThesisIntro
          title="Adaptive Time Scaling"
          subtitle="The Conceptual Framework"
        />
      </Series.Sequence>

      <Series.Sequence durationInFrames={150}>
        <LinearScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={150}>
        <TransformationScene />
      </Series.Sequence>
    </Series>
  );
};
