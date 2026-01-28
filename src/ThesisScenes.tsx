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
  weights: ["400", "600", "800"],
});

const BG_COLOR = '#f8fafc';
const ACCENT = '#3b82f6';

export const ThesisIntro: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', fontFamily, justifyContent: 'center', padding: 100 }}>
      <div style={{ opacity: entrance, transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)` }}>
        <div style={{ fontSize: 24, color: ACCENT, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 20 }}>THESIS SHOWCASE</div>
        <h1 style={{ fontSize: 80, fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>{title}</h1>
        <p style={{ fontSize: 32, color: '#64748b', marginTop: 30, maxWidth: 800 }}>{subtitle}</p>
      </div>
    </AbsoluteFill>
  );
};

export const UIComponentShowcase: React.FC<{ name: string; description: string; children: React.ReactNode }> = ({ name, description, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG_COLOR, fontFamily, padding: 80 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, height: '100%', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 18, color: ACCENT, fontWeight: 700, marginBottom: 10 }}>FEATURE</div>
          <h2 style={{ fontSize: 56, fontWeight: 800, color: '#0f172a', margin: 0 }}>{name}</h2>
          <p style={{ fontSize: 24, color: '#64748b', marginTop: 20, lineHeight: 1.5 }}>{description}</p>
        </div>
        <div style={{ 
          height: '80%', 
          backgroundColor: 'white', 
          borderRadius: 32, 
          boxShadow: '0 40px 80px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: entrance,
          transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])}) rotate(${interpolate(entrance, [0, 1], [-2, 0])}deg)`
        }}>
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DynamicFormUI: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[0, 1, 2].map(i => {
        const op = interpolate(frame - i * 10, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <div key={i} style={{ height: 60, backgroundColor: '#f1f5f9', borderRadius: 12, width: '100%', opacity: op, border: '1px solid #e2e8f0' }} />
        );
      })}
      <div style={{ height: 60, backgroundColor: ACCENT, borderRadius: 12, width: '40%', marginTop: 20, opacity: interpolate(frame - 40, [0, 20], [0, 1], { extrapolateLeft: 'clamp' }) }} />
    </div>
  );
};

export const ThesisOutro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily, justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 64, fontWeight: 800 }}>Adaptive Time Scaling</h2>
        <p style={{ fontSize: 32, color: '#94a3b8', marginTop: 20 }}>MSc Thesis by Tim</p>
      </div>
    </AbsoluteFill>
  );
};
