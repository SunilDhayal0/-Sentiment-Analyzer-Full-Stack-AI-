// Shared design tokens used across every component.
// (Not in your original tree, but every component below imports it
// instead of redefining colors/fonts — avoids seven copies of the same object.)

export const C = {
  paper: "#FAFAF6",
  paperDim: "#F1EFE7",
  ink: "#1B1F1D",
  inkSoft: "#5B6158",
  hairline: "#DEDACB",
  signal: "#1F6F63",
  signalSoft: "#DCEBE7",
  positive: "#2E8B57",
  negative: "#B8493B",
  neutral: "#9A9382",
  warn: "#C9862B",
};

export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
`;
