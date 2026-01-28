import React from 'react';
import { Series } from 'remotion';
import { WebIntroScene, WebCodeScene, WebTechScene, WebOutroScene } from './WebPersonalBrandScenes';

export const WebPersonalBrandVideo: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={75}>
        <WebIntroScene name={name} />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={90}>
        <WebCodeScene />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={75}>
        <WebTechScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <WebOutroScene />
      </Series.Sequence>
    </Series>
  );
};
