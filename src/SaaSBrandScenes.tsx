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
  weights: ["400", "500", "600", "800"],
});

const BORDER_COLOR = '#e2e8f0';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#64748b';
const BG_COLOR = '#ffffff';

const Container: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <div
      style={{
        width: '85%',
        height: '75%',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: `1px solid ${BORDER_COLOR}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        fontFamily,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Header: React.FC<{title: string}> = ({title}) => {
  return (
    <div style={{
      height: 56,
      borderBottom: `1px solid ${BORDER_COLOR}`,
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#cbd5e1' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#cbd5e1' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#cbd5e1' }} />
      </div>
      <div style={{ color: TEXT_SECONDARY, fontSize: 14, fontWeight: 500 }}>
        {title}
      </div>
      <div style={{ width: 40 }} />
    </div>
  );
};

export const SaaSIntro: React.FC<{ name: string }> = ({ name }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
      <Container style={{ transform: `scale(${interpolate(entrance, [0, 1], [0.98, 1])})`, opacity: entrance }}>
        <Header title="profile.tsx" />
        <div style={{ flex: 1, padding: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ 
            fontSize: 16, 
            color: '#6366f1', 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            marginBottom: 12 
          }}>
            Available for hire
          </div>
          <h1 style={{ color: TEXT_PRIMARY, fontSize: 72, margin: 0, fontWeight: 800, letterSpacing: '-0.02em' }}>
            {name}
          </h1>
          <p style={{ color: TEXT_SECONDARY, fontSize: 24, marginTop: 16, maxWidth: 500, lineHeight: 1.5 }}>
            Building high-performance web applications with modern technologies.
          </p>
        </div>
      </Container>
    </AbsoluteFill>
  );
};

export const SaaSMasters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
      <Container>
        <Header title="credentials.v2" />
        <div style={{ flex: 1, padding: 60, display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ 
            width: 120, 
            height: 120, 
            borderRadius: '24px', 
            background: '#f1f5f9', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: 48,
            border: `1px solid ${BORDER_COLOR}`,
            opacity: progress,
            transform: `scale(${progress})`
          }}>
            🎓
          </div>
          <div style={{ opacity: progress }}>
            <div style={{ color: TEXT_SECONDARY, fontSize: 18, marginBottom: 4 }}>Academic Status</div>
            <div style={{ color: TEXT_PRIMARY, fontSize: 48, fontWeight: 700 }}>Master's Degree</div>
            <div style={{ color: '#10b981', fontWeight: 600, fontSize: 20, marginTop: 8 }}>Completed & Verified</div>
          </div>
        </div>
      </Container>
    </AbsoluteFill>
  );
};

export const SaaSOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center', fontFamily }}>
      <div style={{ textAlign: 'center', opacity: progress, transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)` }}>
        <h2 style={{ color: TEXT_PRIMARY, fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
          Ready for the next sprint.
        </h2>
        <p style={{ color: TEXT_SECONDARY, fontSize: 20, marginTop: 16 }}>
          Hire a specialist for your web development projects.
        </p>
        <div style={{ 
          marginTop: 40, 
          display: 'inline-block', 
          padding: '16px 32px', 
          background: TEXT_PRIMARY, 
          color: 'white', 
          borderRadius: '8px', 
          fontWeight: 600,
          fontSize: 18
        }}>
          Get in touch
        </div>
      </div>
    </AbsoluteFill>
  );
};
