import React from 'react';
import { Series } from 'remotion';
import { ThesisIntro, UIComponentShowcase, DynamicFormUI, ThesisOutro } from './ThesisScenes';

export const ThesisVideo: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <ThesisIntro title={title} subtitle={subtitle} />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={150}>
        <UIComponentShowcase 
          name="Dynamic Layouts" 
          description="A fluid, adaptive system for complex data visualization and user interaction."
        >
          <DynamicFormUI />
        </UIComponentShowcase>
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <ThesisOutro />
      </Series.Sequence>
    </Series>
  );
};
