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
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])}) translateY(${interpolate(entrance, [0, 1], [10, 0])}px)`,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const BrowserFrame: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <GlassCard style={{ padding: 0, overflow: 'hidden', width: '80%', height: '70%' }}>
      {/* Browser Header */}
      <div style={{ 
        height: 40, 
        background: 'rgba(255,255,255,0.05)', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 15px',
        gap: 8,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
        <div style={{ flex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14, fontFamily: 'monospace' }}>
          {title}
        </div>
      </div>
      {/* Content Area */}
      <div style={{ flex: 1, padding: 30, overflow: 'hidden' }}>
        {children}
      </div>
    </GlassCard>
  );
};

const CodeMarkup: React.FC = () => {
  const frame = useCurrentFrame();
  const code = [
    '<div className="portfolio">',
    '  <Header name="Freelancer" />',
    '  <Stack>',
    '    <React />',
    '    <Laravel />',
    '  </Stack>',
    '  <Education degree="Masters" />',
    '</div>'
  ];

  return (
    <div style={{ fontFamily: 'Fira Code, monospace', fontSize: 24, lineHeight: 1.6 }}>
      {code.map((line, i) => {
        const lineOpacity = interpolate(frame - i * 3, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <div key={i} style={{ opacity: lineOpacity, transform: `translateX(${interpolate(lineOpacity, [0, 1], [-10, 0])}px)` }}>
            <span style={{ color: '#c678dd' }}>{line.slice(0, line.indexOf('<') + 1)}</span>
            <span style={{ color: '#e06c75' }}>{line.slice(line.indexOf('<') + 1, line.indexOf(' ') > -1 ? line.indexOf(' ') : line.indexOf('>'))}</span>
            <span style={{ color: '#d19a66' }}>{line.includes(' ') ? line.slice(line.indexOf(' '), line.indexOf('>')) : ''}</span>
            <span style={{ color: '#c678dd' }}>{line.includes('>') ? '>' : ''}</span>
            {line.includes('/>') ? <span style={{ color: '#c678dd' }}>/&gt;</span> : ''}
          </div>
        );
      })}
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
        filter: 'blur(100px)',
        borderRadius: '50%',
        opacity: 0.4,
        top,
        left,
        right,
        bottom,
        transform: `translate(${moveX}px, ${moveY}px)`,
      }}
    />
  );
};

export const WebIntroScene: React.FC<{ name: string }> = ({ name }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
      <Blob color="#4f46e5" size={800} top="-10%" left="-10%" delay={0} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <BrowserFrame title="localhost:3000">
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ color: 'white', fontSize: 64, margin: 0, fontWeight: 700 }}>
              {name}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 24, marginTop: 16 }}>
              Specializing in React & Laravel
            </p>
          </div>
        </BrowserFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const WebCodeScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
      <Blob color="#7c3aed" size={700} bottom="-10%" right="-5%" delay={100} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <BrowserFrame title="portfolio.tsx">
          <CodeMarkup />
        </BrowserFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const WebTechScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
      <Blob color="#0ea5e9" size={600} top="20%" right="10%" delay={50} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <GlassCard style={{ padding: '60px 100px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
            <div style={{ color: '#61dafb', fontSize: 80, fontWeight: 800 }}>React</div>
            <div style={{ color: 'rgba(255,255,255,0.1)', fontSize: 48 }}>+</div>
            <div style={{ color: '#ff2d20', fontSize: 80, fontWeight: 800 }}>Laravel</div>
          </div>
        </GlassCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const WebOutroScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
      <Blob color="#8b5cf6" size={800} bottom="-20%" left="10%" delay={200} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <GlassCard>
          <div style={{ fontSize: 48, color: 'white', fontWeight: 700, textAlign: 'center', lineHeight: 1.4 }}>
            Master's Degree Complete.<br />
            <span style={{ color: '#38bdf8' }}>Let's build the future.</span>
          </div>
        </GlassCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
