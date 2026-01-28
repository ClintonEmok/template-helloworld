import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';

export const TitleCard: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background color interpolation
  const easedFrame = interpolate(frame, [0, 100], [0, 100], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const backgroundColor = interpolateColors(
    easedFrame,
    [0, 100],
    ['#6a11cb', '#2575fc']
  );


  // Title scale animation
  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
    },
  });

  // Subtitle entry
  const subtitleOpacity = interpolate(
    frame,
    [30, 50],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const subtitleY = interpolate(
    frame,
    [30, 50],
    [20, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Decorative circles
  const circleScale = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 20,
    },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        color: 'white',
      }}
    >
      {/* Decorative background element */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          left: -100,
          top: -100,
          transform: `scale(${circleScale})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          right: -50,
          bottom: -50,
          transform: `scale(${circleScale * 1.2})`,
        }}
      />

      <div
        style={{
          transform: `scale(${titleScale})`,
          fontSize: 100,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 40,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
