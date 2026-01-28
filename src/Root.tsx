import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { TitleCard } from "./TitleCard";
import { SalesBrandVideo } from "./SalesBrandVideo";
import { ChurchServiceVideo } from "./ChurchServiceVideo";
import { ChurchServiceVideoDark } from "./ChurchServiceVideoDark";
import { ThesisVideo } from "./ThesisVideo";
import { AnalyticsThesisVideo } from "./AnalyticsThesisVideo";
import { ThesisTourVideo } from "./ThesisTourVideo";
import { CombinedThesisVideo } from "./CombinedThesisVideo";
import { z } from "zod";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FinalThesisVideo"
        component={CombinedThesisVideo}
        durationInFrames={1740}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ThesisTour"
        component={ThesisTourVideo}
        durationInFrames={1560}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AnalyticsThesis"
        component={AnalyticsThesisVideo}
        durationInFrames={90 + 300 + 90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ThesisShowcase"
        component={ThesisVideo}
        durationInFrames={90 + 150 + 90}
        fps={30}
        width={1920}
        height={1080}
        schema={z.object({
          title: z.string(),
          subtitle: z.string(),
        })}
        defaultProps={{
          title: "Revolutionizing Enterprise UI",
          subtitle:
            "Bridging the gap between functionality and aesthetic fluidity.",
        }}
      />
      <Composition
        id="ChurchService"
        component={ChurchServiceVideo}
        durationInFrames={1410}
        fps={30}
        width={1920}
        height={1080}
        schema={z.object({
          churchName: z.string(),
        })}
        defaultProps={{
          churchName: "Deeper Christian Life Ministry Netherlands",
        }}
      />
      <Composition
        id="ChurchServiceDark"
        component={ChurchServiceVideoDark}
        durationInFrames={1410}
        fps={30}
        width={1920}
        height={1080}
        schema={z.object({
          churchName: z.string(),
        })}
        defaultProps={{
          churchName: "Deeper Christian Life Ministry Netherlands",
        }}
      />
      <Composition
        id="SalesPitchVideo"
        component={SalesBrandVideo}
        durationInFrames={75 + 90 + 75 + 90}
        fps={30}
        width={1920}
        height={1080}
        schema={z.object({
          name: z.string(),
        })}
        defaultProps={{ name: "Clinton" }}
      />
      <Composition
        id="TitleCard"
        component={TitleCard}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={z.object({
          title: z.string(),
          subtitle: z.string(),
        })}
        defaultProps={{
          title: "Remotion Video",
          subtitle: "Created with Antigravity",
        }}
      />
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
