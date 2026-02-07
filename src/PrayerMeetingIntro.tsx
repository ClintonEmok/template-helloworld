import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
  Sequence,
} from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import logo from "./dlbc-logo.png";

const montserrat = loadMontserrat("normal", {
  weights: ["400", "600", "700", "900"],
});
const playfair = loadPlayfair("italic", { weights: ["700"] });

const ACCENT_GOLD = "#d4af37";
const DEEP_NAVY = "#0f172a";
const TEXT_LIGHT = "#f8fafc";

const Scene1_Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacity = spring({ frame, fps, config: { damping: 20 } });
  const slideUp = spring({ frame: frame - 10, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: DEEP_NAVY,
      }}
    >
      <Img
        src={logo}
        style={{
          width: 120,
          height: 120,
          objectFit: "contain",
          marginBottom: 40,
          opacity: opacity,
          transform: `scale(${interpolate(scale, [0, 1], [0.5, 1])})`,
        }}
      />
      <div
        style={{
          fontFamily: montserrat.fontFamily,
          fontSize: 80,
          fontWeight: 900,
          color: TEXT_LIGHT,
          textAlign: "center",
          opacity,
          transform: `scale(${interpolate(scale, [0, 1], [3, 1])})`,
          lineHeight: 1,
          marginBottom: 20,
        }}
      >
        THE PRAYER ROOM
      </div>

      <div
        style={{
          fontFamily: playfair.fontFamily,
          fontSize: 120,
          fontStyle: "italic",
          color: ACCENT_GOLD,
          marginBottom: 20,
          opacity: slideUp,
          transform: `translateY(${interpolate(slideUp, [0, 1], [50, 0])}px)`,
        }}
      >
        is back
      </div>

      <div
        style={{
          fontFamily: montserrat.fontFamily,
          fontSize: 60,
          fontWeight: 600,
          color: TEXT_LIGHT,
          opacity: spring({ frame: frame - 25, fps }),
          letterSpacing: "0.5em",
        }}
      >
        IN 2026
      </div>
    </AbsoluteFill>
  );
};

const Scene2_Theme: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 15 } });
  const themeIn = spring({ frame: frame - 15, fps, config: { damping: 15 } });
  const subIn = spring({ frame: frame - 30, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: DEEP_NAVY,
      }}
    >
      {/* Background Particles/Texture */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
          background: `radial-gradient(circle, ${ACCENT_GOLD} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          transform: `translateY(${frame * 0.5}px)`,
        }}
      />

      <div
        style={{
          fontFamily: playfair.fontFamily,
          fontSize: 80,
          color: ACCENT_GOLD,
          fontStyle: "italic",
          marginBottom: 30,
          opacity: titleIn,
          transform: `scale(${interpolate(titleIn, [0, 1], [0.8, 1])})`,
        }}
      >
        Theme
      </div>

      <div
        style={{
          fontFamily: montserrat.fontFamily,
          fontSize: 120,
          fontWeight: 900,
          color: TEXT_LIGHT,
          textAlign: "center",
          lineHeight: 0.9,
          opacity: themeIn,
          transform: `translateY(${interpolate(themeIn, [0, 1], [100, 0])}px)`,
          textShadow: `0 10px 20px rgba(0,0,0,0.3)`,
        }}
      >
        THE
        <br />
        FOUNDATION
      </div>

      <div
        style={{
          marginTop: 40,
          padding: "10px 40px",
          borderTop: `2px solid ${ACCENT_GOLD}`,
          borderBottom: `2px solid ${ACCENT_GOLD}`,
          fontFamily: montserrat.fontFamily,
          fontSize: 36,
          color: TEXT_LIGHT,
          fontWeight: 600,
          opacity: subIn,
          letterSpacing: "0.1em",
        }}
      >
        Laying Strong Foundations for a Fruitful Year
      </div>
    </AbsoluteFill>
  );
};

const Scene3_Message: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered entrance for lines
  const line1 = spring({ frame, fps, config: { damping: 20 } });
  const line2 = spring({ frame: frame - 20, fps, config: { damping: 20 } });
  const line3 = spring({ frame: frame - 40, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      {/* Abstract subtle background instead of flyer */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `radial-gradient(circle at center, ${DEEP_NAVY} 0%, #000 70%)`,
          transform: `rotate(${frame * 0.1}deg)`,
        }}
      />

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", padding: 100 }}
      >
        <div
          style={{
            fontFamily: montserrat.fontFamily,
            fontSize: 56,
            fontWeight: 700,
            color: TEXT_LIGHT,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              opacity: line1,
              transform: `translateY(${interpolate(line1, [0, 1], [20, 0])}px)`,
            }}
          >
            "As we focus on laying strong foundations...
          </div>
          <div
            style={{
              opacity: line2,
              transform: `translateY(${interpolate(line2, [0, 1], [20, 0])}px)`,
            }}
          >
            there is a need for{" "}
            <span style={{ color: ACCENT_GOLD, fontWeight: 900 }}>
              clearing
            </span>
            ,
          </div>
          <div
            style={{
              opacity: line3,
              transform: `translateY(${interpolate(line3, [0, 1], [20, 0])}px)`,
            }}
          >
            cleaning of{" "}
            <span
              style={{
                color: ACCENT_GOLD,
                fontStyle: "italic",
                fontFamily: playfair.fontFamily,
              }}
            >
              hands
            </span>
            , and purifying of{" "}
            <span
              style={{
                color: ACCENT_GOLD,
                fontStyle: "italic",
                fontFamily: playfair.fontFamily,
              }}
            >
              hearts
            </span>
            ."
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 15 } });
  const opacity = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DEEP_NAVY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: montserrat.fontFamily,
          fontSize: 100,
          fontWeight: 900,
          color: TEXT_LIGHT,
          textAlign: "center",
          opacity,
          transform: `scale(${interpolate(scale, [0, 1], [0.8, 1])})`,
          marginBottom: 40,
        }}
      >
        JOIN THE
        <br />
        <span style={{ color: ACCENT_GOLD }}>MOVEMENT</span>
      </div>
      <div
        style={{
          fontFamily: playfair.fontFamily,
          fontSize: 50,
          color: TEXT_LIGHT,
          opacity: spring({ frame: frame - 20, fps }),
          fontStyle: "italic",
        }}
      >
        Let us pray together
      </div>
    </AbsoluteFill>
  );
};

const Scene4_Details: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Simple zoom out reveal
  const scale = interpolate(frame, [0, 100], [1.1, 1], {
    extrapolateRight: "clamp",
  });
  const opacity = spring({ frame, fps, durationInFrames: 20 });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Img
        src={staticFile("PrayerMeeting/Q1-02Feb.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity,
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

export const PrayerMeetingIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: DEEP_NAVY }}>
      <Sequence durationInFrames={90}>
        <Scene1_Title />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <Scene2_Theme />
      </Sequence>
      <Sequence from={180} durationInFrames={120}>
        <Scene3_Message />
      </Sequence>
      <Sequence from={300} durationInFrames={90}>
        <SceneCTA />
      </Sequence>
      <Sequence from={390} durationInFrames={150}>
        <Scene4_Details />
      </Sequence>
    </AbsoluteFill>
  );
};
