import React from 'react';
import { Series } from 'remotion';
import { SaaSIntro, SaaSMasters, SaaSOutro } from './SaaSBrandScenes';

export const SaaSBrandVideo: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <SaaSIntro name={name} />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={90}>
        <SaaSMasters />
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <SaaSOutro />
      </Series.Sequence>
    </Series>
  );
};
