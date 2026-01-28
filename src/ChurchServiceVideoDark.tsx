import React from 'react';
import { Series } from 'remotion';
import { ChurchWelcome, ScriptureScene, LocationScene, ChurchOutro, AnnouncementSlide, DetailedServiceScene } from './ChurchServiceScenesDark';

export const ChurchServiceVideoDark: React.FC<{
  churchName: string;
}> = ({ churchName }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={90}>
        <ChurchWelcome churchName={churchName} />
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={120}>
        <ScriptureScene />
      </Series.Sequence>

      {/* Lesson for next week */}
      <Series.Sequence durationInFrames={150}>
        <AnnouncementSlide slideNumber={28} title="Lesson for Next Week" />
      </Series.Sequence>

      {/* Upcoming Events */}
      <Series.Sequence durationInFrames={150}>
        <AnnouncementSlide slideNumber={29} title="Upcoming Events" />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <AnnouncementSlide slideNumber={30} title="Upcoming Events" />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <AnnouncementSlide slideNumber={31} title="Upcoming Events" />
      </Series.Sequence>
      
      {/* Detailed Locations */}
      <Series.Sequence durationInFrames={120}>
        <LocationScene 
          city="Amsterdam" 
          address="Reewijkplein 12, 1106 AT Amsterdam" 
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <LocationScene 
          city="Eindhoven" 
          address="Generaal de Famarslaan 1, 5623 LG Eindhoven" 
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <LocationScene 
          city="The Hague" 
          address="Oudemansstraat 277, 2522 SH Den Haag" 
        />
      </Series.Sequence>
      
      {/* Detailed Weekly Services */}
      <Series.Sequence durationInFrames={150}>
        <DetailedServiceScene 
          day="TUESDAY"
          time="7:00 PM"
          label="Bible Study"
          details={["Deep insight into the Word", "Interactive Q&A Session", "Online & In-person"]}
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <DetailedServiceScene 
          day="FRIDAY"
          time="7:30 PM"
          label="Revival Service"
          details={["Prayer & Intercession", "Spiritual Renewal", "Worship & Testimony"]}
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <DetailedServiceScene 
          day="SUNDAY"
          time="9:45 AM"
          label="Sunday Service"
          details={["Celebration & Praise", "The Word of Life", "Youth & Children Ministry"]}
        />
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <ChurchOutro />
      </Series.Sequence>
    </Series>
  );
};
