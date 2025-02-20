"use client";

import React, { useEffect, useState } from "react";

const animations = [
  "bouncy",
  "bouncyArc",
  "cardio",
  "chaoticOrbit",
  "dotPulse",
  "dotSpinner",
  "dotStream",
  "dotWave",
  "grid",
  "hatch",
  "helix",
  "hourglass",
  "infinity",
  "jelly",
  "jellyTriangle",
  "leapfrog",
  "lineSpinner",
  "lineWobble",
  "metronome",
  "mirage",
  "miyagi",
  "momentum",
  "newtonsCradle",
  "orbit",
  "ping",
  "pinwheel",
  "pulsar",
  "quantum",
  "reuleaux",
  "ring",
  "ring2",
  "ripples",
  "spiral",
  "square",
  "squircle",
  "superballs",
  "tailChase",
  "tailspin",
  "treadmill",
  "trefoil",
  "trio",
  "waveform",
  "wobble",
  "zoomies",
] as const;

const tags: Record<LoaderType, string> = {
  bouncy: "bouncy",
  bouncyArc: "bouncy-arc",
  cardio: "cardio",
  chaoticOrbit: "chaotic-orbit",
  dotPulse: "dot-pulse",
  dotSpinner: "dot-spinner",
  dotStream: "dot-stream",
  dotWave: "dot-wave",
  grid: "grid",
  hatch: "hatch",
  helix: "helix",
  hourglass: "hourglass",
  infinity: "infinity",
  jelly: "jelly",
  jellyTriangle: "jelly-triangle",
  leapfrog: "leapfrog",
  lineSpinner: "line-spinner",
  lineWobble: "line-wobble",
  metronome: "metronome",
  mirage: "mirage",
  miyagi: "miyagi",
  momentum: "momentum",
  newtonsCradle: "newtons-cradle",
  orbit: "orbit",
  ping: "ping",
  pinwheel: "pinwheel",
  pulsar: "pulsar",
  quantum: "quantum",
  reuleaux: "reuleaux",
  ring: "ring",
  ring2: "ring-2",
  ripples: "ripples",
  spiral: "spiral",
  square: "square",
  squircle: "squircle",
  superballs: "superballs",
  tailChase: "tail-chase",
  tailspin: "tailspin",
  treadmill: "treadmill",
  trefoil: "trefoil",
  trio: "trio",
  waveform: "waveform",
  wobble: "wobble",
  zoomies: "zoomies",
};

type LoaderType = (typeof animations)[number];

interface LoaderProps {
  loader: LoaderType;
  size?: number;
  speed?: number;
  color?: string;
}

export default function Loaders({ loader, size, speed, color }: LoaderProps) {
  const [selectedLoaderTag, setSelectedLoaderTag] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function getLoader() {
      const ldrs = (await import("ldrs")) as Record<string, any>;

      if (loader in ldrs) {
        ldrs[loader].register();
        setSelectedLoaderTag(`l-${tags[loader]}`);
      } else {
        throw new Error("Loader not found");
      }
    }
    getLoader();
  }, [loader]);

  return selectedLoaderTag
    ? React.createElement(selectedLoaderTag, { size, speed, color })
    : null;
}
