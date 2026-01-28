import React from 'react';
import { Series } from 'remotion';
import { LandingPage } from './AnalyticsScenes';
import { ThesisTourVideo } from './ThesisTourVideo';
import { ThesisOutro } from './ThesisScenes';

export const CombinedThesisVideo: React.FC = () => {
  return (
    <Series>
      {/* Intro from AnalyticsThesis (3s) */}
      <Series.Sequence durationInFrames={90}>
        <LandingPage />
      </Series.Sequence>
      
      {/* The full Product Tour from ThesisTour (52s) */}
      <Series.Sequence durationInFrames={52 * 30}>
        <ThesisTourVideo />
      </Series.Sequence>

      {/* Professional Outro (3s) */}
      <Series.Sequence durationInFrames={90}>
        <ThesisOutro />
      </Series.Sequence>
    </Series>
  );
};
