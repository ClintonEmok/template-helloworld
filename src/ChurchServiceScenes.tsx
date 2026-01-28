import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from 'remotion';
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import logo from "./dlbc-logo.png";

const montserrat = loadMontserrat("normal", { weights: ["400", "700", "900"] });
const playfair = loadPlayfair("italic", { weights: ["700"] });

const ACCENT_GOLD = '#d4af37';
const DEEP_NAVY = '#0f172a';
const TEXT_SECONDARY = '#64748b';

const SoftBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const moveX = Math.sin(frame / 50) * 100;
  const moveY = Math.cos(frame / 60) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        width: '120%',
        height: '120%',
        top: '-10%',
        left: '-10%',
        background: 'radial-gradient(circle at center, #f1f5f9 0%, #ffffff 100%)',
        transform: `translate(${moveX}px, ${moveY}px)`,
      }} />
      {/* Subtle light leaks */}
      <div style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
        top: '10%',
        right: '-10%',
        transform: `translateY(${Math.sin(frame / 40) * 50}px)`,
      }} />
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => {
  return (
    <Img
      src={logo}
      style={{
        position: 'absolute',
        top: 40,
        right: 40,
        width: 80,
        opacity: 0.5,
      }}
    />
  );
};

export const ChurchWelcome: React.FC<{ churchName: string }> = ({ churchName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 100 } });
  const titleIn = spring({ frame: frame - 15, fps, config: { damping: 100 } });
  const subIn = spring({ frame: frame - 30, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill>
      <SoftBackground />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Img
          src={logo}
          style={{
            width: 200,
            marginBottom: 40,
            opacity: logoIn,
            transform: `scale(${logoIn})`,
          }}
        />
        <div style={{
          fontFamily: playfair.fontFamily,
          fontSize: 48,
          color: ACCENT_GOLD,
          marginBottom: 10,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [20, 0])}px)`,
        }}>
          Welcome Home
        </div>
        <div style={{
          fontFamily: montserrat.fontFamily,
          fontSize: 100,
          fontWeight: 900,
          color: DEEP_NAVY,
          letterSpacing: '-0.02em',
          opacity: subIn,
          transform: `scale(${interpolate(subIn, [0, 1], [0.95, 1])})`,
        }}>
          {churchName.toUpperCase()}
        </div>
        <div style={{
          width: interpolate(subIn, [0, 1], [0, 100]),
          height: 4,
          backgroundColor: ACCENT_GOLD,
          marginTop: 40,
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ScriptureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: DEEP_NAVY }}>
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 120 }}>
        <div style={{
          fontFamily: playfair.fontFamily,
          fontSize: 64,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.4,
          opacity: progress,
          fontStyle: 'italic',
        }}>
          "The Lord is my shepherd; I shall not want."
        </div>
        <div style={{
          fontFamily: montserrat.fontFamily,
          fontSize: 24,
          color: ACCENT_GOLD,
          marginTop: 40,
          fontWeight: 700,
          letterSpacing: '0.2em',
          opacity: progress,
        }}>
          PSALM 23:1
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ServiceTimes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <SoftBackground />
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontFamily: montserrat.fontFamily, width: '100%', maxWidth: 800 }}>
          <div style={{ 
            fontSize: 24, 
            color: DEEP_NAVY, 
            fontWeight: 800, 
            letterSpacing: '0.2em', 
            marginBottom: 50,
            textAlign: 'center'
          }}>
            WEEKLY SERVICE SCHEDULE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { day: "TUESDAY", time: "7:00 PM", label: "Bible Study" },
              { day: "FRIDAY", time: "7:30 PM", label: "Revival Service" },
              { day: "SUNDAY", time: "9:45 AM", label: "Sunday Service" }
            ].map((item, i) => {
              const s = spring({ 
                frame: frame - 10 - i * 12, 
                fps, 
                config: { damping: 20, stiffness: 100 } 
              });
              
              return (
                <div key={i} style={{ 
                  opacity: s, 
                  transform: `translateX(${interpolate(s, [0, 1], [-30, 0])}px)`,
                  backgroundColor: 'white',
                  padding: '25px 40px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                  border: `1px solid ${ACCENT_GOLD}22`
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 14, color: ACCENT_GOLD, fontWeight: 800, letterSpacing: '0.1em' }}>{item.day}</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: DEEP_NAVY }}>{item.label}</div>
                  </div>
                  <div style={{ 
                    fontSize: 42, 
                    fontWeight: 900, 
                    color: ACCENT_GOLD,
                    fontFamily: montserrat.fontFamily 
                  }}>
                    {item.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const LocationScene: React.FC<{ city: string; address: string }> = ({ city, address }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill>
      <SoftBackground />
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          gap: 60, 
          width: '100%', 
          height: '100%',
          alignItems: 'center'
        }}>
          {/* Map Placeholder */}
          <div style={{
            height: '80%',
            backgroundColor: '#f1f5f9',
            borderRadius: '32px',
            border: `1px solid ${ACCENT_GOLD}44`,
            boxShadow: '0 30px 60px rgba(15, 23, 42, 0.1)',
            overflow: 'hidden',
            position: 'relative',
            opacity: entrance,
            transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`,
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 60, marginBottom: 10 }}>📍</div>
              <div style={{ fontFamily: montserrat.fontFamily, color: '#94a3b8', fontSize: 18, fontWeight: 600 }}>MAP VIEW</div>
            </div>
            {/* Simple grid pattern for map look */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              opacity: 0.5
            }} />
          </div>

          {/* Details */}
          <div style={{ opacity: entrance, transform: `translateX(${interpolate(entrance, [0, 1], [40, 0])}px)` }}>
            <div style={{ 
              fontFamily: playfair.fontFamily, 
              fontSize: 48, 
              color: ACCENT_GOLD, 
              marginBottom: 10 
            }}>
              Join us in
            </div>
            <div style={{ 
              fontFamily: montserrat.fontFamily, 
              fontSize: 80, 
              fontWeight: 900, 
              color: DEEP_NAVY,
              lineHeight: 1,
              marginBottom: 30
            }}>
              {city}
            </div>
            <div style={{
              fontFamily: montserrat.fontFamily,
              fontSize: 24,
              color: TEXT_SECONDARY,
              lineHeight: 1.6,
              padding: '30px',
              backgroundColor: 'white',
              borderRadius: '20px',
              borderLeft: `8px solid ${ACCENT_GOLD}`,
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
            }}>
              {address}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AnnouncementSlide: React.FC<{ slideNumber: number; title: string }> = ({ slideNumber, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const slideImg = staticFile(`ChurchServiceScenes/Slide${slideNumber}.png`);
  
  const entrance = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <SoftBackground />
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60 }}>
        <div style={{ 
          fontFamily: montserrat.fontFamily, 
          fontSize: 32, 
          color: DEEP_NAVY, 
          fontWeight: 800, 
          marginBottom: 30,
          letterSpacing: '0.1em'
        }}>
          {title.toUpperCase()}
        </div>
        <div style={{
          width: 1440,
          aspectRatio: '16 / 9',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
          opacity: entrance,
          transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px', // A bit of padding inside the card
        }}>
          <Img 
            src={slideImg} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const DetailedServiceScene: React.FC<{ day: string; time: string; label: string; details: string[] }> = ({ day, time, label, details }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill>
      <SoftBackground />
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 100 }}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'center' }}>
          {/* Left Side: Time & Day Badge */}
          <div style={{ 
            opacity: entrance, 
            transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`,
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '60px 40px',
            borderRadius: '32px',
            boxShadow: '0 30px 60px rgba(15, 23, 42, 0.1)',
            borderBottom: `8px solid ${ACCENT_GOLD}`
          }}>
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 24, color: ACCENT_GOLD, fontWeight: 800, letterSpacing: '0.2em' }}>{day}</div>
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 72, fontWeight: 900, color: DEEP_NAVY, margin: '20px 0' }}>{time}</div>
            <div style={{ fontFamily: playfair.fontFamily, fontSize: 32, color: DEEP_NAVY }}>{label}</div>
          </div>

          {/* Right Side: Additional Info */}
          <div style={{ opacity: entrance, transform: `translateX(${interpolate(entrance, [0, 1], [40, 0])}px)` }}>
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 20, color: ACCENT_GOLD, fontWeight: 800, letterSpacing: '0.1em', marginBottom: 20 }}>SERVICE DETAILS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {details.map((detail, i) => (
                <div key={i} style={{ 
                  fontFamily: montserrat.fontFamily,
                  fontSize: 28,
                  color: DEEP_NAVY,
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  padding: '20px 30px',
                  borderRadius: '16px',
                  borderLeft: `4px solid ${ACCENT_GOLD}`
                }}>
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ChurchOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Img
          src={logo}
          style={{
            width: 150,
            marginBottom: 40,
            opacity: progress,
            transform: `translateY(${interpolate(progress, [0, 1], [10, 0])}px)`,
          }}
        />
        <h2 style={{
          fontFamily: playfair.fontFamily,
          fontSize: 80,
          color: DEEP_NAVY,
          margin: 0,
          opacity: progress,
        }}>
          See you there.
        </h2>
        <p style={{
          fontFamily: montserrat.fontFamily,
          fontSize: 20,
          color: ACCENT_GOLD,
          marginTop: 20,
          fontWeight: 700,
          letterSpacing: '0.1em',
          opacity: progress,
        }}>
          WWW.DCLM-NL.ORG
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
