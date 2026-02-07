import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
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
const TEXT_SECONDARY = "#64748b";

const SoftBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const moveX = Math.sin(frame / 50) * 100;
  const moveY = Math.cos(frame / 60) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          background:
            "radial-gradient(circle at center, #f1f5f9 0%, #ffffff 100%)",
          transform: `translate(${moveX}px, ${moveY}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)",
          top: "10%",
          right: "-10%",
          transform: `translateY(${Math.sin(frame / 40) * 50}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const PrayerMeetingFeb2026: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const contentEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <SoftBackground />

      {/* Main Content Container */}
      <AbsoluteFill
        style={{ padding: 60, display: "flex", flexDirection: "row", gap: 60 }}
      >
        {/* Left Side: Text Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: entrance,
            transform: `translateX(${interpolate(entrance, [0, 1], [-50, 0])}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <Img
              src={logo}
              style={{ width: 60, height: 60, objectFit: "contain" }}
            />
            <div
              style={{
                fontFamily: montserrat.fontFamily,
                fontSize: 20,
                color: TEXT_SECONDARY,
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              THE PRAYER ROOM
            </div>
          </div>

          <div
            style={{
              fontFamily: montserrat.fontFamily,
              fontSize: 60,
              fontWeight: 900,
              color: DEEP_NAVY,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            FEBRUARY 2026
          </div>

          <div
            style={{
              fontFamily: playfair.fontFamily,
              fontSize: 32,
              color: ACCENT_GOLD,
              marginBottom: 40,
              fontStyle: "italic",
            }}
          >
            Theme: The Foundation - Laying Strong Foundations for a Fruitful
            Year
          </div>

          <div
            style={{
              display: "flex",
              gap: 40,
              marginBottom: 40,
              borderTop: `1px solid ${ACCENT_GOLD}40`,
              borderBottom: `1px solid ${ACCENT_GOLD}40`,
              padding: "20px 0",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: montserrat.fontFamily,
                  fontSize: 16,
                  color: TEXT_SECONDARY,
                  fontWeight: 700,
                  marginBottom: 5,
                }}
              >
                DATE
              </div>
              <div
                style={{
                  fontFamily: montserrat.fontFamily,
                  fontSize: 24,
                  color: DEEP_NAVY,
                  fontWeight: 600,
                }}
              >
                February 2, 2026
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: montserrat.fontFamily,
                  fontSize: 16,
                  color: TEXT_SECONDARY,
                  fontWeight: 700,
                  marginBottom: 5,
                }}
              >
                TIME
              </div>
              <div
                style={{
                  fontFamily: montserrat.fontFamily,
                  fontSize: 24,
                  color: DEEP_NAVY,
                  fontWeight: 600,
                }}
              >
                20:00
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: montserrat.fontFamily,
              fontSize: 18,
              color: DEEP_NAVY,
              lineHeight: 1.6,
              marginBottom: 40,
              maxWidth: "90%",
            }}
          >
            As we focus on laying strong foundations this quarter, there is a
            need for clearing - cleaning of hands and purifying of hearts.
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: 20,
              borderRadius: 12,
              borderLeft: `4px solid ${ACCENT_GOLD}`,
            }}
          >
            <div
              style={{
                fontFamily: montserrat.fontFamily,
                fontSize: 16,
                fontWeight: 700,
                color: DEEP_NAVY,
                marginBottom: 5,
              }}
            >
              📌 Join us in the prayer-room channel on our Discord server.
            </div>
            <div
              style={{
                fontFamily: montserrat.fontFamily,
                fontSize: 18,
                color: ACCENT_GOLD,
                fontWeight: 600,
              }}
            >
              🔗 go.deeperlife.nl/discord
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: contentEntrance,
            transform: `scale(${interpolate(contentEntrance, [0, 1], [0.95, 1])})`,
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 40px 80px rgba(15, 23, 42, 0.15)",
              border: `8px solid white`,
            }}
          >
            <Img
              src={staticFile("PrayerMeeting/Q1-02Feb.png")}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: 700,
                display: "block",
              }}
            />
          </div>
        </div>
      </AbsoluteFill>

      {/* Footer / Tagline */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: montserrat.fontFamily,
            fontSize: 14,
            color: TEXT_SECONDARY,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          2026: LIVING STONES | Q1: Laying Strong Foundations
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
