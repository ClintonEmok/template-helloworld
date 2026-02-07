import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import { loadFont } from "@remotion/google-fonts/Outfit";
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { WarpedCube } from './WarpedCube';

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "800", "900"],
});

// --- Constants ---

const COLORS = {
  bg: '#020617',
  card: '#0f172a',
  border: '#1e293b',
  accentBlue: '#3b82f6',
  accentOrange: '#f97316',
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
};

// --- Components ---

const PanelHeader: React.FC<{ title: string }> = ({ title }) => (
  <div style={{
    padding: '10px 20px',
    borderBottom: `1px solid ${COLORS.border}`,
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  }}>
    {title}
  </div>
);

export const MapPanel: React.FC<{ 
  selectionProgress: number; 
  isZoomed: boolean;
}> = ({ selectionProgress, isZoomed }) => {
  const frame = useCurrentFrame();
  const zoom = isZoomed ? interpolate(frame % 300, [0, 60], [1, 1.1], { extrapolateRight: 'clamp' }) : 1;

  const center: [number, number] = useMemo(() => [52.3676, 4.9041], []);
  const points = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      lat: center[0] + (Math.sin(i * 123) * 0.02),
      lng: center[1] + (Math.cos(i * 456) * 0.02),
      id: i,
    }));
  }, [center]);

  const lassoPath: [number, number][] = [
    [52.38, 4.88],
    [52.38, 4.93],
    [52.35, 4.93],
    [52.35, 4.88],
    [52.38, 4.88],
  ];

  return (
    <div style={{ 
      flex: 1.5, 
      backgroundColor: COLORS.card, 
      borderRadius: 16, 
      border: `1px solid ${COLORS.border}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <PanelHeader title="Map (Space) - Amsterdam" />
      <div style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        transform: `scale(${zoom})`,
        transformOrigin: 'center center',
      }}>
        <style>
          {`
            .leaflet-tooltip {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
            }
            .leaflet-tooltip-top:before {
              border-top-color: transparent !important;
            }
          `}
        </style>
        <MapContainer 
          center={center} 
          zoom={13} 
          style={{ height: '100%', width: '100%', background: COLORS.bg }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {points.map((p, i) => {
            const isInside = p.lat < 52.38 && p.lat > 52.35 && p.lng < 4.93 && p.lng > 4.88;
            const highlighted = isInside && selectionProgress > 0.8;
            const pointOpacity = highlighted ? 1 : 0.3;
            const isHovered = i === 15 && selectionProgress > 0.1 && selectionProgress < 0.9;

            return (
              <CircleMarker
                key={p.id}
                center={[p.lat, p.lng]}
                radius={isHovered ? 6 : 3}
                pathOptions={{
                  fillColor: isHovered ? COLORS.accentOrange : (highlighted ? COLORS.accentBlue : COLORS.textSecondary),
                  color: isHovered ? COLORS.accentOrange : (highlighted ? COLORS.accentBlue : 'transparent'),
                  fillOpacity: pointOpacity,
                }}
              >
                {isHovered && (
                  <Tooltip permanent direction="top" offset={[0, -10]}>
                    <div style={{ 
                      padding: '8px 12px', 
                      background: COLORS.card, 
                      color: 'white', 
                      borderRadius: '8px', 
                      border: `1px solid ${COLORS.accentOrange}`,
                      fontSize: '12px',
                      fontFamily: 'sans-serif',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                    }}>
                      <div style={{ fontWeight: 800, color: COLORS.accentOrange, marginBottom: 4 }}>CRIME DATA #1242</div>
                      <div>Type: Burglary</div>
                      <div>Time: 22:15:04</div>
                    </div>
                  </Tooltip>
                )}
              </CircleMarker>
            );
          })}
          {selectionProgress > 0 && (
            <Polyline 
              positions={lassoPath} 
              pathOptions={{
                color: COLORS.accentBlue,
                weight: 2,
                dashArray: '5, 10',
                opacity: selectionProgress
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export const SpaceTimeCube: React.FC<{ 
  warpProgress?: number; 
  split?: boolean; 
  sliceRange?: [number, number];
  isFilterActive?: boolean;
}> = ({ warpProgress = 0, split = false, sliceRange, isFilterActive = true }) => {
  return (
    <div style={{ flex: 1, display: 'flex', gap: 10 }}>
      <div style={{ 
        flex: 1, 
        backgroundColor: COLORS.card, 
        borderRadius: 16, 
        border: `1px solid ${COLORS.border}`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <PanelHeader title={split ? "All Crimes" : "Space-Time Cube"} />
        </div>
        <WarpedCube warpProgress={warpProgress} sliceRange={sliceRange} />
        
        {!split && (
          <div style={{
            position: 'absolute',
            top: 45,
            right: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: COLORS.bg,
            padding: '6px 12px',
            borderRadius: 20,
            border: `1px solid ${COLORS.border}`,
            opacity: 0.8
          }}>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, fontWeight: 700 }}>WARP AXIS</div>
            <div style={{
              width: 30,
              height: 16,
              background: warpProgress > 0.5 ? COLORS.accentBlue : COLORS.border,
              borderRadius: 10,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                width: 12,
                height: 12,
                background: 'white',
                borderRadius: '50%',
                top: 2,
                left: interpolate(warpProgress, [0, 1], [2, 16]),
              }} />
            </div>
          </div>
        )}
      </div>
      {split && (
        <div style={{ 
          flex: 1, 
          backgroundColor: COLORS.card, 
          borderRadius: 16, 
          border: `1px solid ${COLORS.border}`,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <PanelHeader title="Filtered Subset" />
            <div style={{ 
              marginRight: 15,
              marginTop: 10,
              padding: '4px 10px',
              borderRadius: 6,
              background: isFilterActive ? `${COLORS.accentBlue}33` : COLORS.border,
              border: `1px solid ${isFilterActive ? COLORS.accentBlue : COLORS.textSecondary}`,
              color: isFilterActive ? COLORS.accentBlue : COLORS.textSecondary,
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: '0.05em'
            }}>
              BURGLARY @ NIGHT
            </div>
          </div>
          <WarpedCube warpProgress={warpProgress} filter={isFilterActive} sliceRange={sliceRange} />
        </div>
      )}
    </div>
  );
};

export const TimelinePanel: React.FC<{ 
  brushRange: [number, number]; 
  isHighlighted: boolean;
  caption?: string;
}> = ({ brushRange, isHighlighted, caption }) => {
  const months = useMemo(() => ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], []);
  const adaptiveMonths = useMemo(() => [
    { name: "JAN", width: 40 }, { name: "FEB", width: 25 }, { name: "MAR", width: 60 },
    { name: "APR", width: 30 }, { name: "MAY", width: 15 }, { name: "JUN", width: 45 },
    { name: "JUL", width: 25 }, { name: "AUG", width: 50 }, { name: "SEP", width: 35 },
    { name: "OCT", width: 40 }, { name: "NOV", width: 30 }, { name: "DEC", width: 55 }
  ], []);

  return (
    <div style={{ 
      height: 220, 
      backgroundColor: COLORS.card, 
      borderRadius: 16, 
      border: `1px solid ${COLORS.border}`,
      padding: '0 20px 20px 20px',
      position: 'relative',
    }}>
      <PanelHeader title="Linked Timelines" />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 15, paddingTop: 10 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ fontSize: 10, color: COLORS.accentBlue, fontWeight: 700, marginBottom: 4 }}>ADAPTIVE MONTH VIEW</div>
          <div style={{ display: 'flex', height: '60%', gap: 2 }}>
            {adaptiveMonths.map((month, i) => {
              const highlighted = isHighlighted && i >= 3 && i <= 6;
              return (
                <div key={i} style={{
                  flex: month.width,
                  height: '100%',
                  backgroundColor: highlighted ? COLORS.accentBlue : COLORS.border,
                  borderRadius: '4px',
                  opacity: highlighted ? 1 : 0.3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: highlighted ? 'white' : COLORS.textSecondary,
                  fontWeight: 700,
                }}>
                  {month.width > 30 ? month.name : ''}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ flex: 0.6, position: 'relative' }}>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, fontWeight: 700, marginBottom: 4 }}>UNIFORM YEAR VIEW (REFERENCE)</div>
          <div style={{ display: 'flex', height: '50%', gap: 1 }}>
            {months.map((month, i) => {
              const highlighted = isHighlighted && i >= 3 && i <= 6;
              return (
                <div key={i} style={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: highlighted ? `${COLORS.accentBlue}88` : COLORS.border,
                  opacity: highlighted ? 0.8 : 0.15,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 8,
                  color: 'white',
                }}>{month[0]}</div>
              );
            })}
          </div>
        </div>
      </div>
      {caption && <div style={{ position: 'absolute', top: 10, right: 20, color: COLORS.accentBlue, fontSize: 14, fontWeight: 600, fontStyle: 'italic' }}>{caption}</div>}
      {brushRange[1] > 0 && <div style={{ position: 'absolute', bottom: 20, left: `${brushRange[0]}%`, width: `${brushRange[1] - brushRange[0]}%`, height: '70%', backgroundColor: `${COLORS.accentBlue}11`, borderLeft: `2px solid ${COLORS.accentBlue}`, borderRight: `2px solid ${COLORS.accentBlue}`, pointerEvents: 'none' }} />}
    </div>
  );
};

export const TourLayout: React.FC<{
  selectionProgress?: number;
  isMapZoomed?: boolean;
  brushRange?: [number, number];
  isTimelineHighlighted?: boolean;
  timelineCaption?: string;
  warpProgress?: number;
  isCubeSplit?: boolean;
  isFilterActive?: boolean;
  cubeSliceRange?: [number, number];
  label?: string;
  headline?: string;
  intentLabel?: string;
  showControls?: boolean;
  controlValues?: { resolution: number; warp: number };
}> = ({
  selectionProgress = 0, isMapZoomed = false, brushRange = [0, 0], isTimelineHighlighted = false, timelineCaption = "",
  warpProgress = 0, isCubeSplit = false, isFilterActive = true, cubeSliceRange, label = "", headline = "", intentLabel = "",
  showControls = false, controlValues = { resolution: 50, warp: 0 },
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily, padding: 30 }}>
      <div style={{ height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <h1 style={{ color: 'white', fontSize: 32, fontWeight: 800 }}>{headline}</h1>
        {intentLabel && (
          <div style={{ position: 'absolute', left: 20, display: 'flex', alignItems: 'center', gap: 10, background: COLORS.card, padding: '8px 16px', borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, fontWeight: 800 }}>INTENT:</div>
            <div style={{ fontSize: 14, color: COLORS.accentBlue, fontWeight: 700 }}>{intentLabel}</div>
            <div style={{ color: COLORS.textSecondary }}>▼</div>
          </div>
        )}
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 20 }}>
        {showControls && (
          <div style={{ width: 280, background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.border}`, padding: 20, display: 'flex', flexDirection: 'column', gap: 30 }}>
            <div style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: 800 }}>CONTROL PANEL</div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: 'white', fontWeight: 600 }}>Time Resolution</div>
                <div style={{ fontSize: 11, color: COLORS.accentBlue }}>{Math.round(controlValues.resolution)}%</div>
              </div>
              <div style={{ height: 4, background: COLORS.border, borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${controlValues.resolution}%`, background: COLORS.accentBlue }} />
                <div style={{ position: 'absolute', left: `${controlValues.resolution}%`, top: -6, width: 16, height: 16, background: 'white', borderRadius: '50%', transform: 'translateX(-50%)' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: 'white', fontWeight: 600 }}>Warp Intensity</div>
                <div style={{ fontSize: 11, color: COLORS.accentBlue }}>{Math.round(controlValues.warp)}%</div>
              </div>
              <div style={{ height: 4, background: COLORS.border, borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${controlValues.warp}%`, background: COLORS.accentBlue }} />
                <div style={{ position: 'absolute', left: `${controlValues.warp}%`, top: -6, width: 16, height: 16, background: 'white', borderRadius: '50%', transform: 'translateX(-50%)' }} />
              </div>
            </div>
          </div>
        )}
        <MapPanel selectionProgress={selectionProgress} isZoomed={isMapZoomed} />
        <SpaceTimeCube warpProgress={warpProgress} split={isCubeSplit} sliceRange={cubeSliceRange} isFilterActive={isFilterActive} />
      </div>
      <div style={{ marginTop: 20 }}>
        <TimelinePanel brushRange={brushRange} isHighlighted={isTimelineHighlighted} caption={timelineCaption} />
      </div>
      {label && <div style={{ position: 'absolute', bottom: 250, right: 100, backgroundColor: COLORS.accentBlue, color: 'white', padding: '10px 20px', borderRadius: 8, fontSize: 18, fontWeight: 700, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>{label}</div>}
    </AbsoluteFill>
  );
};
