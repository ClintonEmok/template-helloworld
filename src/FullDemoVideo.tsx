import React from "react";
import { Series, AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Outfit";
import { LandingPage } from "./AnalyticsScenes";
import { ThesisTourVideo } from "./ThesisTourVideo";
import { ThesisOutro } from "./ThesisScenes";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "800", "900"],
});

const TransitionSlide: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 50, 60], [0, 1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <div style={{ textAlign: "center", opacity }}>
        <h2
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: "white",
            marginBottom: 16,
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: 24, color: "#3b82f6", fontWeight: 600 }}>
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const FullDemoVideo: React.FC = () => {
  return (
    <Series>
      {/* 1. Introduction (3s) */}
      <Series.Sequence durationInFrames={90}>
        <LandingPage />
      </Series.Sequence>

      {/* 4. Transition: The Solution (2s) */}
      <Series.Sequence durationInFrames={60}>
        <TransitionSlide
          title="The Solution"
          subtitle="Conceptual Adaptive Dashboard"
        />
      </Series.Sequence>

      {/* 5. The Product Tour (52s) - Map, Timeline, Controls */}
      <Series.Sequence durationInFrames={52 * 30}>
        <ThesisTourVideo />
      </Series.Sequence>

      {/* 6. Conclusion (3s) */}
      <Series.Sequence durationInFrames={90}>
        <ThesisOutro />
      </Series.Sequence>
    </Series>
  );
};
