import React from "react";
import { Series } from "remotion";
import { ThesisIntro } from "./ThesisScenes";
import { LinearCubeScene, WarpedCubeScene } from "./ThesisConcept3DScenes";

export const ThesisConceptVideo3D: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <ThesisIntro
          title="Space-Time Cube"
          subtitle="Adaptive Temporal Scaling in 3D"
        />
      </Series.Sequence>

      <Series.Sequence durationInFrames={150}>
        <LinearCubeScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={180}>
        <WarpedCubeScene />
      </Series.Sequence>
    </Series>
  );
};
