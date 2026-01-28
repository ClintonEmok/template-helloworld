import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  random,
} from 'remotion';
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "800", "900"],
});

const ACCENT = '#3b82f6';
const BG_DARK = '#0f172a';
const BORDER = '#334155';

export const LandingPage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK, fontFamily, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ opacity: entrance, transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`, textAlign: 'center' }}>
        <div style={{ fontSize: 20, color: ACCENT, fontWeight: 800, letterSpacing: '0.2em', marginBottom: 20 }}>THESIS PROJECT</div>
        <h1 style={{ fontSize: 80, fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          Adaptive Time Scaling<br/>with <span style={{ color: ACCENT }}>Space-Time Cubes</span>
        </h1>
        <p style={{ fontSize: 24, color: '#94a3b8', marginTop: 30, maxWidth: 800, marginInline: 'auto' }}>
          Visualizing complex spatio-temporal data through dynamic temporal resolution and 3D projection.
        </p>
        <div style={{ marginTop: 50, padding: '16px 32px', border: `2px solid ${ACCENT}`, borderRadius: 8, color: 'white', display: 'inline-block', fontWeight: 600 }}>
          View Methodology
        </div>
      </div>
    </AbsoluteFill>
  );
};

const LineChart: React.FC<{ color: string; delay: number }> = ({ color, delay }) => {
  const frame = useCurrentFrame();
  const points = 20;
  const path = Array.from({ length: points }).map((_, i) => {
    const x = (i / (points - 1)) * 100;
    const seed = `chart-${delay}-${i}`;
    const noise = (random(seed) - 0.5) * 10;
    const y = 50 + Math.sin((frame + delay + i * 2) / 10) * 30 + noise;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={path}
        style={{ opacity: 0.6 }}
      />
    </svg>
  );
};

export const ToolLayout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const layoutEntrance = spring({ frame, fps, config: { damping: 20 } });
  const mapEntrance = spring({ frame: frame - 15, fps, config: { damping: 20 } });
  const cubeEntrance = spring({ frame: frame - 25, fps, config: { damping: 20 } });
  const timelineEntrance = spring({ frame: frame - 35, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ backgroundColor: '#020617', fontFamily, padding: 40 }}>
      {/* Header */}
      <div style={{ height: 60, borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', padding: '0 20px', color: 'white', opacity: layoutEntrance }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: ACCENT }}>STC</div>
        <div style={{ marginLeft: 20, fontSize: 14, color: '#64748b' }}>Adaptive_Scaling_Analysis_v1.0</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: ACCENT, border: `1px solid ${ACCENT}`, padding: '4px 12px', borderRadius: 20 }}>SCALING: ACTIVE</div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', gap: 20, marginTop: 20 }}>
        {/* Left Side: Map */}
        <div style={{ 
          flex: 1.5, 
          backgroundColor: '#1e293b', 
          borderRadius: 16, 
          border: `1px solid ${BORDER}`,
          position: 'relative',
          overflow: 'hidden',
          opacity: mapEntrance,
          transform: `scale(${mapEntrance})`
        }}>
          <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: '#94a3b8', fontSize: 12, fontWeight: 700 }}>SPATIAL VIEW (MAP)</div>
          
          {/* Detailed Map Visuals */}
          <div style={{ width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          {/* Animated Data Clusters */}
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              position: 'absolute',
              top: `${20 + i * 15}%`,
              left: `${30 + Math.sin(frame / 20 + i) * 10}%`,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`,
              border: `1px dashed ${ACCENT}66`,
              transform: `scale(${1 + Math.sin(frame / 10) * 0.1})`
            }} />
          ))}

          {/* Connection Lines (Paths) */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
            <path 
              d="M 200 300 Q 400 100 600 400" 
              fill="none" 
              stroke={ACCENT} 
              strokeWidth="2" 
              strokeDasharray="5,5"
              style={{ opacity: 0.4 }}
            />
          </svg>
        </div>

        {/* Right Side: Cube */}
        <div style={{ 
          flex: 1, 
          backgroundColor: '#1e293b', 
          borderRadius: 16, 
          border: `1px solid ${BORDER}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          opacity: cubeEntrance,
          transform: `scale(${cubeEntrance})`
        }}>
          <div style={{ position: 'absolute', top: 20, left: 20, color: '#94a3b8', fontSize: 12, fontWeight: 700 }}>TEMPORAL CUBE (STC)</div>
          
          {/* STC Visualization */}
          <div style={{ 
            width: 200, 
            height: 200, 
            position: 'relative',
            perspective: '1000px',
            transform: `rotateX(60deg) rotateZ(${frame * 0.5}deg)`,
            transformStyle: 'preserve-3d'
          }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: `1px solid ${ACCENT}44`, transform: 'translateZ(0px)' }} />
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: `1px solid ${ACCENT}44`, transform: 'translateZ(100px)' }} />
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: `1px solid ${ACCENT}44`, transform: 'rotateY(90deg) translateX(-50px)', transformOrigin: 'left' }} />
            
            {/* Mock Data Points in Cube */}
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                position: 'absolute',
                width: 8,
                height: 8,
                background: ACCENT,
                borderRadius: '50%',
                transform: `translate3d(${20 + i * 20}px, ${30 + Math.sin(frame/10 + i) * 40}px, ${i * 20}px)`,
                boxShadow: `0 0 10px ${ACCENT}`
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Double Timeline */}
      <div style={{ 
        height: 220, 
        marginTop: 20, 
        backgroundColor: '#1e293b', 
        borderRadius: 16, 
        border: `1px solid ${BORDER}`,
        padding: 24,
        opacity: timelineEntrance,
        transform: `translateY(${interpolate(timelineEntrance, [0, 1], [20, 0])}px)`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
          <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700 }}>TEMPORAL DRILL-DOWN</div>
          <div style={{ color: ACCENT, fontSize: 10, fontWeight: 700 }}>SYNCED TO SPATIAL VIEW</div>
        </div>

        {/* Timeline 1 with Chart */}
        <div style={{ height: 60, width: '100%', backgroundColor: '#0f172a', borderRadius: 8, marginBottom: 15, position: 'relative', overflow: 'hidden', border: `1px solid ${BORDER}` }}>
          <LineChart color={ACCENT} delay={0} />
          <div style={{ position: 'absolute', top: 0, height: '100%', width: 4, background: ACCENT, left: `${interpolate(frame % 300, [0, 300], [0, 100])}%`, boxShadow: `0 0 15px ${ACCENT}` }} />
        </div>

        {/* Timeline 2 with Chart */}
        <div style={{ height: 60, width: '100%', backgroundColor: '#0f172a', borderRadius: 8, position: 'relative', overflow: 'hidden', border: `1px solid ${BORDER}` }}>
          <LineChart color="#10b981" delay={50} />
          <div style={{ position: 'absolute', top: 0, height: '100%', width: 4, background: '#10b981', left: `${interpolate((frame + 100) % 300, [0, 300], [0, 100])}%`, boxShadow: `0 0 15px #10b981` }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
