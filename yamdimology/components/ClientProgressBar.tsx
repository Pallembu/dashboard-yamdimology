'use client';

import { ProgressBar } from '@tremor/react';

type Color = "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";

export default function ClientProgressBar({ value, color, className }: { value: number, color?: Color, className?: string }) {
  return <ProgressBar value={value} color={color} className={className} />;
}
