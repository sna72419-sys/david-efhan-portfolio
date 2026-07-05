export default function NoiseOverlay() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[60] opacity-[0.025] mix-blend-overlay"
      aria-hidden="true"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}
