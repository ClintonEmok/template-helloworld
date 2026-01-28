import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
      mass: 0.8,
    },
  });

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '60px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])}) translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Blob: React.FC<{
  color: string;
  size: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  delay: number;
}> = ({ color, size, top, left, right, bottom, delay }) => {
  const frame = useCurrentFrame();
  
  const moveX = Math.sin((frame + delay) / 30) * 50;
  const moveY = Math.cos((frame + delay) / 40) * 50;

  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: color,
        filter: 'blur(80px)',
        borderRadius: '50%',
        opacity: 0.6,
        top,
        left,
        right,
        bottom,
        transform: `translate(${moveX}px, ${moveY}px)`,
      }}
    />
  );
};

export const AppleIntroScene: React.FC<{ name: string }> = ({ name }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <Blob color="#4f46e5" size={600} top="-10%" left="-10%" delay={0} />
      <Blob color="#7c3aed" size={500} bottom="10%" right="-5%" delay={100} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <GlassCard>
          <h1 style={{ color: 'white', fontSize: 80, margin: 0, fontWeight: 700 }}>
            {name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 32, marginTop: 16 }}>
            Freelance Developer
          </p>
        </GlassCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AppleTechScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <Blob color="#0ea5e9" size={500} top="20%" right="10%" delay={50} />
      <Blob color="#ef4444" size={500} bottom="-10%" left="5%" delay={150} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <GlassCard style={{ flexDirection: 'row', gap: 40 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#61dafb', fontSize: 72, fontWeight: 800 }}>React</div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 48 }}>&</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#ff2d20', fontSize: 72, fontWeight: 800 }}>Laravel</div>
          </div>
        </GlassCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AppleMastersScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <Blob color="#10b981" size={600} top="10%" left="20%" delay={20} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <GlassCard>
          <div style={{ fontSize: 32, color: '#10b981', fontWeight: 600, marginBottom: 8 }}>
            Master's Degree
          </div>
          <div style={{ fontSize: 96, color: 'white', fontWeight: 900 }}>
            COMPLETED
          </div>
        </GlassCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AppleOutroScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <Blob color="#8b5cf6" size={700} bottom="-20%" left="10%" delay={200} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <GlassCard>
          <div style={{ fontSize: 64, color: 'white', fontWeight: 700, textAlign: 'center' }}>
            Let's build something<br />incredible.
          </div>
        </GlassCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
