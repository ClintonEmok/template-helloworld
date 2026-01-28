import React from 'react';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { fade } from '@remotion/transitions/fade';
import { IntroScene, TechScene, MastersScene, OutroScene } from './PersonalBrandScenes';

export const PersonalBrandVideo: React.FC<{
  name: string;
}> = ({ name }) => {
  const transitionDuration = 15;

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <IntroScene name={name} />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: transitionDuration })}
      />
      
      <TransitionSeries.Sequence durationInFrames={60}>
        <TechScene />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: transitionDuration })}
      />
      
      <TransitionSeries.Sequence durationInFrames={60}>
        <MastersScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-bottom' })}
        timing={linearTiming({ durationInFrames: transitionDuration })}
      />

      <TransitionSeries.Sequence durationInFrames={60}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
