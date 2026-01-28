import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const IntroScene: React.FC<{
  name: string;
}> = ({ name }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        Hi, I'm {name}
      </div>
      <div
        style={{
          fontSize: 40,
          opacity: subtitleOpacity,
          marginTop: 20,
          color: '#94a3b8',
        }}
      >
        Freelance Developer
      </div>
    </AbsoluteFill>
  );
};

export const TechScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reactOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const laravelOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  const ampersandOpacity = spring({
    frame: frame - 7,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1e293b',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 100,
        fontWeight: 'bold',
      }}
    >
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        <div style={{ opacity: reactOpacity, color: '#61dafb' }}>React</div>
        <div style={{ opacity: ampersandOpacity, fontSize: 60, color: '#64748b' }}>&</div>
        <div style={{ opacity: laravelOpacity, color: '#ff2d20' }}>Laravel</div>
      </div>
    </AbsoluteFill>
  );
};

export const MastersScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#020617',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center',
        padding: 40,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 40,
            color: '#38bdf8',
            marginBottom: 10,
            opacity: progress,
          }}
        >
          Master's Degree
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            opacity: progress,
            transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
          }}
        >
          Completed ✅
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 60,
        fontWeight: 'bold',
      }}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [10, 0])}px)`,
        }}
      >
        Let's build something cool.
      </div>
    </AbsoluteFill>
  );
};
