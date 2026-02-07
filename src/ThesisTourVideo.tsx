import React from "react";
import { Series, interpolate, useCurrentFrame, Easing } from "remotion";
import { TourLayout } from "./ThesisTourScenes";

const MapInteraction: React.FC = () => {
  const frame = useCurrentFrame();
  // Animate lasso from frame 20 to 80
  const selectionProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isHighlighted = selectionProgress > 0.9;

  return (
    <TourLayout
      isMapZoomed={true}
      selectionProgress={selectionProgress}
      isTimelineHighlighted={isHighlighted}
      timelineCaption={
        isHighlighted ? "Two linked timelines: adaptive vs. uniform time" : ""
      }
      headline="Explore spatial patterns"
    />
  );
};

const TimelineBrushing: React.FC = () => {
  const frame = useCurrentFrame();

  const brushStart = 25;
  const brushEnd = interpolate(frame, [20, 100], [25, 75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isFinished = frame > 110;

  return (
    <TourLayout
      brushRange={[brushStart, brushEnd]}
      cubeSliceRange={isFinished ? [brushStart, brushEnd] : undefined}
      label={isFinished ? "Adaptive time selection" : ""}
      headline="Adaptive Brushing & Non-uniform Bins"
      timelineCaption={
        isFinished ? "Syncing selection to Space-Time Cube..." : ""
      }
      warpProgress={0}
    />
  );
};

const WarpedCubeScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Smoothly animate warp from 0 to 1 between frame 40 and 100
  const warpProgress = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <TourLayout
      warpProgress={warpProgress}
      label={warpProgress > 0.8 ? "Warped time axis emphasizes bursts" : ""}
      headline="Space-Time Cube Warping"
    />
  );
};

const MultipleCubesScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Tweak filter chip around frame 60
  const isFilterActive = frame > 60;

  return (
    <TourLayout
      isCubeSplit={true}
      isFilterActive={isFilterActive}
      brushRange={[20, 60]}
      cubeSliceRange={[20, 60]}
      label="Compare subsets side by side"
      headline="Advanced filtering & comparison"
    />
  );
};

const ControlsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const intents = ["Overview", "Find bursts", "Compare places"];
  const intentIndex = Math.floor(
    interpolate(frame, [0, 240], [0, 2.99], { extrapolateRight: "clamp" }),
  );

  const resolution = interpolate(frame, [120, 200], [50, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <TourLayout
      headline="Intuitive Analytical Intents"
      intentLabel={intents[intentIndex]}
      showControls={true}
      controlValues={{
        resolution,
        warp: 100,
      }}
    />
  );
};

export const ThesisTourVideo: React.FC = () => {
  return (
    <Series>
      {/* Scene 2: Map interaction (10s) */}
      <Series.Sequence durationInFrames={10 * 30}>
        <MapInteraction />
      </Series.Sequence>

      {/* Scene 3: Timeline brushing (12s) */}
      <Series.Sequence durationInFrames={12 * 30}>
        <TimelineBrushing />
      </Series.Sequence>

      {/* Scene 4: Warped cube (12s) */}
      <Series.Sequence durationInFrames={12 * 30}>
        <WarpedCubeScene />
      </Series.Sequence>

      {/* Scene 5: Multiple cubes (10s) */}
      <Series.Sequence durationInFrames={10 * 30}>
        <MultipleCubesScene />
      </Series.Sequence>

      {/* Scene 6: Controls (8s) */}
      {/* <Series.Sequence durationInFrames={8 * 30}>
        <ControlsScene />
      </Series.Sequence> */}
    </Series>
  );
};
