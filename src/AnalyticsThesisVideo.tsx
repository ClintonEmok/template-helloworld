import React from 'react';
import { Series, useCurrentFrame } from 'remotion';
import { LandingPage, ToolLayout } from './AnalyticsScenes';
import { ThesisOutro } from './ThesisScenes';
import { SpaceTimeCube } from './ThesisTourScenes';

const TransformationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const warped = frame > 60;
  return (
    <div style={{ backgroundColor: '#020617', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'white', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>
        {warped ? "Warped Time Axis" : "Linear Time Axis"}
      </div>
      <div style={{ width: 800, height: 600 }}>
        <SpaceTimeCube warpProgress={warped ? 1 : 0} />
      </div>
      <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 20, maxWidth: 600, textAlign: 'center' }}>
        {warped ? "Quiet periods stretch and burst periods compress to reveal hidden patterns." : "Traditional linear time often hides high-density bursts."}
      </div>
    </div>
  );
};

export const AnalyticsThesisVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <LandingPage />
      </Series.Sequence>
      
      {/* Transformation Scene: Linear to Warped (120 frames / 4s) */}
      <Series.Sequence durationInFrames={120}>
        <TransformationScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={300}>
        <ToolLayout />
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <ThesisOutro />
      </Series.Sequence>
    </Series>
  );
};
