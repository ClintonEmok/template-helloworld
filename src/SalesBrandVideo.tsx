import React from 'react';
import { Series } from 'remotion';
import { SalesHook, AISellingPoint, ValueProp, FinalPitch } from './SalesBrandScenes';

export const SalesBrandVideo: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={75}>
        <SalesHook name={name} />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={90}>
        <AISellingPoint />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={75}>
        <ValueProp />
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <FinalPitch />
      </Series.Sequence>
    </Series>
  );
};
