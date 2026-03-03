export interface Template {
  id: string;
  title: string;
  category: "Abstract" | "Portrait" | "Nature" | "Minimal" | "Retro";
  imageUrl: string;
  prompt: string;
}

export const templates: Template[] = [
  {
    id: "abstract-01",
    title: "Chromatic Flow",
    category: "Abstract",
    imageUrl: "/samples/abstract-01.svg",
    prompt: "abstract colorful flowing shapes, vibrant gradients",
  },
  {
    id: "abstract-02",
    title: "Geometric Dreams",
    category: "Abstract",
    imageUrl: "/samples/abstract-02.svg",
    prompt: "geometric abstract patterns, bold colors, modern art",
  },
  {
    id: "abstract-03",
    title: "Ink Splash",
    category: "Abstract",
    imageUrl: "/samples/abstract-03.svg",
    prompt: "abstract ink splash art, black and gold, expressive",
  },
  {
    id: "portrait-01",
    title: "Renaissance Glow",
    category: "Portrait",
    imageUrl: "/samples/portrait-01.svg",
    prompt: "renaissance style portrait, dramatic lighting, classical",
  },
  {
    id: "portrait-02",
    title: "Neon Identity",
    category: "Portrait",
    imageUrl: "/samples/portrait-02.svg",
    prompt: "neon lit portrait, cyberpunk style, vibrant colors",
  },
  {
    id: "portrait-03",
    title: "Pencil Soul",
    category: "Portrait",
    imageUrl: "/samples/portrait-03.svg",
    prompt: "detailed pencil sketch portrait, hyperrealistic",
  },
  {
    id: "nature-01",
    title: "Misty Mountains",
    category: "Nature",
    imageUrl: "/samples/nature-01.svg",
    prompt: "misty mountain landscape, soft morning light, serene",
  },
  {
    id: "nature-02",
    title: "Ocean Whisper",
    category: "Nature",
    imageUrl: "/samples/nature-02.svg",
    prompt: "ocean waves at sunset, golden hour, peaceful seascape",
  },
  {
    id: "nature-03",
    title: "Forest Path",
    category: "Nature",
    imageUrl: "/samples/nature-03.svg",
    prompt: "enchanted forest path, dappled sunlight, magical",
  },
  {
    id: "minimal-01",
    title: "Single Line",
    category: "Minimal",
    imageUrl: "/samples/minimal-01.svg",
    prompt: "minimalist single line art, elegant simplicity",
  },
  {
    id: "minimal-02",
    title: "Quiet Space",
    category: "Minimal",
    imageUrl: "/samples/minimal-02.svg",
    prompt: "minimalist interior space, clean lines, muted tones",
  },
  {
    id: "minimal-03",
    title: "Shape Study",
    category: "Minimal",
    imageUrl: "/samples/minimal-03.svg",
    prompt: "minimalist geometric shapes, bauhaus inspired",
  },
  {
    id: "retro-01",
    title: "Vintage Poster",
    category: "Retro",
    imageUrl: "/samples/retro-01.svg",
    prompt: "vintage travel poster style, retro colors, nostalgic",
  },
  {
    id: "retro-02",
    title: "70s Groove",
    category: "Retro",
    imageUrl: "/samples/retro-02.svg",
    prompt: "1970s psychedelic art, groovy patterns, warm tones",
  },
  {
    id: "retro-03",
    title: "Pixel Nostalgia",
    category: "Retro",
    imageUrl: "/samples/retro-03.svg",
    prompt: "pixel art landscape, 8-bit style, retro gaming",
  },
  {
    id: "abstract-04",
    title: "Marble Veins",
    category: "Abstract",
    imageUrl: "/samples/abstract-04.svg",
    prompt: "marble texture art, gold veins, luxury abstract",
  },
];

export const styleOptions = [
  "Watercolor",
  "Oil Painting",
  "Neon",
  "Sketch",
  "Vintage Photo",
  "Digital Art",
  "Pop Art",
  "Impressionist",
];

export const colorPalettes = [
  { name: "Monochrome", colors: ["#111111", "#333333", "#666666", "#999999", "#CCCCCC"] },
  { name: "Warm Sunset", colors: ["#FF6B35", "#F7C59F", "#EFEFD0", "#004E89", "#1A659E"] },
  { name: "Forest", colors: ["#1A4A3A", "#2D6A4F", "#40916C", "#52B788", "#95D5B2"] },
  { name: "Ocean", colors: ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"] },
  { name: "Berry", colors: ["#590D22", "#800F2F", "#A4133C", "#C9184A", "#FF4D6D"] },
];

export const frameSizes = [
  { label: '8×10"', value: "8x10", price: 49 },
  { label: '12×16"', value: "12x16", price: 79 },
  { label: '18×24"', value: "18x24", price: 129 },
];

export const frameStyles = [
  { label: "Black", value: "black", priceAdd: 0 },
  { label: "White", value: "white", priceAdd: 10 },
  { label: "Natural Wood", value: "natural-wood", priceAdd: 20 },
];
