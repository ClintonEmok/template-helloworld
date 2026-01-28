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
const DARK_BG = '#0f172a';
const CARD_BG = '#1e293b';
const TEXT_LIGHT = '#f1f5f9';
const TEXT_DIM = '#94a3b8';

const SoftBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const moveX = Math.sin(frame / 50) * 100;
  const moveY = Math.cos(frame / 60) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: DARK_BG, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        width: '120%',
        height: '120%',
        top: '-10%',
        left: '-10%',
        background: `radial-gradient(circle at center, ${CARD_BG} 0%, ${DARK_BG} 100%)`,
        transform: `translate(${moveX}px, ${moveY}px)`,
      }} />
      <div style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
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
        opacity: 0.3,
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
          fontSize: 80,
          fontWeight: 900,
          color: TEXT_LIGHT,
          letterSpacing: '-0.02em',
          opacity: subIn,
          transform: `scale(${interpolate(subIn, [0, 1], [0.95, 1])})`,
          maxWidth: '80%',
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
    <AbsoluteFill style={{ backgroundColor: DARK_BG }}>
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 120 }}>
        <div style={{
          fontFamily: playfair.fontFamily,
          fontSize: 64,
          color: TEXT_LIGHT,
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

export const LocationScene: React.FC<{ city: string; address: string }> = ({ city, address }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill>
      <SoftBackground />
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, width: '100%', height: '100%', alignItems: 'center' }}>
          <div style={{
            height: '80%',
            backgroundColor: '#000',
            borderRadius: '32px',
            border: `1px solid rgba(255,255,255,0.1)`,
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            position: 'relative',
            opacity: entrance,
            transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`,
          }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: 60, marginBottom: 10 }}>📍</div>
              <div style={{ fontFamily: montserrat.fontFamily, color: TEXT_DIM, fontSize: 18, fontWeight: 600 }}>MAP VIEW</div>
            </div>
            <div style={{ width: '100%', height: '100%', backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          </div>
          <div style={{ opacity: entrance, transform: `translateX(${interpolate(entrance, [0, 1], [40, 0])}px)` }}>
            <div style={{ fontFamily: playfair.fontFamily, fontSize: 48, color: ACCENT_GOLD, marginBottom: 10 }}>Join us in</div>
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 80, fontWeight: 900, color: TEXT_LIGHT, lineHeight: 1, marginBottom: 30 }}>{city}</div>
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 24, color: TEXT_DIM, lineHeight: 1.6, padding: '30px', backgroundColor: CARD_BG, borderRadius: '20px', borderLeft: `8px solid ${ACCENT_GOLD}`, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>{address}</div>
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
  const entrance = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill>
      <SoftBackground />
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60 }}>
        <div style={{ fontFamily: montserrat.fontFamily, fontSize: 32, color: TEXT_LIGHT, fontWeight: 800, marginBottom: 30, letterSpacing: '0.1em' }}>{title.toUpperCase()}</div>
        <div style={{ width: 1440, aspectRatio: '16 / 9', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', opacity: entrance, transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`, backgroundColor: CARD_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <Img src={slideImg} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const DetailedServiceScene: React.FC<{ day: string; time: string; label: string; details: string[] }> = ({ day, time, label, details }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill>
      <SoftBackground />
      <Watermark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 100 }}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'center' }}>
          <div style={{ opacity: entrance, transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`, textAlign: 'center', backgroundColor: CARD_BG, padding: '60px 40px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', borderBottom: `8px solid ${ACCENT_GOLD}` }}>
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 24, color: ACCENT_GOLD, fontWeight: 800, letterSpacing: '0.2em' }}>{day}</div>
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 72, fontWeight: 900, color: TEXT_LIGHT, margin: '20px 0' }}>{time}</div>
            <div style={{ fontFamily: playfair.fontFamily, fontSize: 32, color: TEXT_LIGHT }}>{label}</div>
          </div>
          <div style={{ opacity: entrance, transform: `translateX(${interpolate(entrance, [0, 1], [40, 0])}px)` }}>
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 20, color: ACCENT_GOLD, fontWeight: 800, letterSpacing: '0.1em', marginBottom: 20 }}>SERVICE DETAILS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {details.map((detail, i) => (
                <div key={i} style={{ fontFamily: montserrat.fontFamily, fontSize: 28, color: TEXT_LIGHT, backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px 30px', borderRadius: '16px', borderLeft: `4px solid ${ACCENT_GOLD}` }}>{detail}</div>
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
    <AbsoluteFill>
      <SoftBackground />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Img src={logo} style={{ width: 150, marginBottom: 40, opacity: progress, transform: `translateY(${interpolate(progress, [0, 1], [10, 0])}px)` }} />
        <h2 style={{ fontFamily: playfair.fontFamily, fontSize: 80, color: TEXT_LIGHT, margin: 0, opacity: progress }}>See you there.</h2>
        <p style={{ fontFamily: montserrat.fontFamily, fontSize: 20, color: ACCENT_GOLD, marginTop: 20, fontWeight: 700, letterSpacing: '0.1em', opacity: progress }}>WWW.DCLM-NL.ORG</p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
