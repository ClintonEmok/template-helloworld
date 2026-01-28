import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
});

const TEXT_PRIMARY = '#0f172a';
const ACCENT = '#6366f1';

const WordReveal: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {words.map((word, i) => {
        const s = spring({
          frame: frame - delay - i * 3,
          fps,
          config: { damping: 12, stiffness: 100 },
        });

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: '0.25em',
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px) scale(${interpolate(s, [0, 1], [0.8, 1])})`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export const SalesHook: React.FC<{ name: string }> = ({ name }) => {
  const frame = useCurrentFrame();

  const bgZoom = interpolate(frame, [0, 150], [1, 1.1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', fontFamily, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, #f8fafc 0%, #ffffff 100%)',
        transform: `scale(${bgZoom})`,
      }} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 100 }}>
        <div style={{ fontSize: 32, color: ACCENT, fontWeight: 700, marginBottom: 20 }}>
          {name.toUpperCase()} PRESENTS
        </div>
        <div style={{ color: TEXT_PRIMARY, fontSize: 110, fontWeight: 900, lineHeight: 1, textAlign: 'center' }}>
          <WordReveal text="The Full-Stack Powerhouse." delay={10} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AISellingPoint: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  // Floating AI Brain Icon (SVG)
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', fontFamily, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 1000 }}>
        <div style={{
          fontSize: 100,
          marginBottom: 40,
          transform: `translateY(${Math.sin(frame / 10) * 10}px) scale(${progress})`,
          opacity: progress,
        }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/>
            <path d="M12 16a4 4 0 1 0 4-4 4 4 0 0 0-4 4Z"/>
            <path d="M12 8v4"/>
            <path d="M16 12h-4"/>
          </svg>
        </div>
        <div style={{ fontSize: 80, fontWeight: 900, textAlign: 'center', color: TEXT_PRIMARY }}>
          <WordReveal text="AI-Driven Development At Scale." delay={0} />
        </div>
        <p style={{ fontSize: 32, color: '#64748b', textAlign: 'center', marginTop: 30, opacity: progress }}>
          Leveraging Neural Networks to ship 10x faster.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const ValueProp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', fontFamily, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, width: '80%' }}>
        {[
          { title: "Frontend", sub: "React & Next.js", color: "#61dafb" },
          { title: "Backend", sub: "Laravel & Node", color: "#ff2d20" }
        ].map((item, i) => {
          const s = spring({
            frame: frame - i * 15,
            fps,
            config: { damping: 15 },
          });
          return (
            <div key={i} style={{
              background: '#f8fafc',
              padding: 60,
              borderRadius: 40,
              border: `2px solid ${item.color}22`,
              opacity: s,
              transform: `scale(${s}) translateY(${interpolate(s, [0, 1], [50, 0])}px)`
            }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: TEXT_PRIMARY }}>{item.title}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: item.color, marginTop: 10 }}>{item.sub}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const FinalPitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const moveIn = spring({ frame, fps, config: { damping: 20 } });
  
  return (
    <AbsoluteFill style={{ backgroundColor: TEXT_PRIMARY, fontFamily, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ 
          color: '#ffffff', 
          fontSize: 100, 
          fontWeight: 900, 
          margin: 0,
          opacity: moveIn,
          transform: `scale(${interpolate(moveIn, [0, 1], [0.5, 1])})`
        }}>
          Let's Win.
        </h2>
        <div style={{ 
          marginTop: 60, 
          padding: '30px 60px', 
          background: ACCENT, 
          color: 'white', 
          borderRadius: 100, 
          fontWeight: 900,
          fontSize: 32,
          display: 'inline-block',
          boxShadow: `0 0 ${interpolate(moveIn, [0, 1], [0, 50])}px ${ACCENT}44`,
          opacity: moveIn,
          transform: `translateY(${interpolate(moveIn, [0, 1], [100, 0])}px)`
        }}>
          HIRE TIM
        </div>
      </div>
    </AbsoluteFill>
  );
};
