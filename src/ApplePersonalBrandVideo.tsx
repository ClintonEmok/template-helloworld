import React from 'react';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { AppleIntroScene, AppleTechScene, AppleMastersScene, AppleOutroScene } from './ApplePersonalBrandScenes';

export const ApplePersonalBrandVideo: React.FC<{
  name: string;
}> = ({ name }) => {
  // Fluid spring timing for transitions
  const fluidTiming = springTiming({
    config: {
      damping: 200,
    },
    durationInFrames: 30,
  });

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <AppleIntroScene name={name} />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={fluidTiming}
      />
      
      <TransitionSeries.Sequence durationInFrames={90}>
        <AppleTechScene />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-top' })}
        timing={fluidTiming}
      />
      
      <TransitionSeries.Sequence durationInFrames={90}>
        <AppleMastersScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-bottom' })}
        timing={fluidTiming}
      />

      <TransitionSeries.Sequence durationInFrames={90}>
        <AppleOutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
