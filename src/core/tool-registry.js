import { renderWordCounter, initWordCounter } from "../tools/word-counter/index.js";
import { renderJsonFormatter, initJsonFormatter } from "../tools/json-formatter/index.js";
import { renderBase64, initBase64 } from "../tools/base64/index.js"; 


const tools = [
  {
    id: "image-compressor",
    category: "image",
    featured: true,
    status: "active",
    priority: 1,
    route: "/tools/image-compressor/",
    nameKey: "toolNames.imageCompressor",
    descriptionKey: "toolDescriptions.imageCompressor",
    tags: ["image", "compress", "jpg", "png", "webp", "optimize"],
  },
  {
    id: "image-converter",
    category: "image",
    featured: true,
    status: "active",
    priority: 2,
    route: "/tools/image-converter/",
    nameKey: "toolNames.imageConverter",
    descriptionKey: "toolDescriptions.imageConverter",
    tags: ["image", "convert", "jpg", "png", "webp", "format"],
  },
  {
    id: "qr-generator",
    category: "utility",
    featured: false,
    status: "active",
    priority: 3,
    route: "/tools/qr-generator/",
    nameKey: "toolNames.qrGenerator",
    descriptionKey: "toolDescriptions.qrGenerator",
    tags: ["qr", "barcode", "url", "generator"],
  },
  {
    id: "json-formatter",
    category: "dev",
    featured: true,
    status: "active",
    priority: 4,
    route: "/tools/json-formatter/",
    nameKey: "toolNames.jsonFormatter",
    descriptionKey: "toolDescriptions.jsonFormatter",
    tags: ["json", "format", "validate", "beautify", "minify", "developer"],
    render: renderJsonFormatter,
    init: initJsonFormatter,
  },
  {
    id: "base64",
    category: "dev",
    featured: false,
    status: "active",
    priority: 5,
    route: "/tools/base64/",
    nameKey: "toolNames.base64",
    descriptionKey: "toolDescriptions.base64",
    tags: ["base64", "encode", "decode", "developer"],
    render: renderBase64, 
    init: initBase64,   
  },
  {
    id: "word-counter",
    category: "text",
    featured: false,
    status: "active",
    priority: 6,
    route: "/tools/word-counter/",
    nameKey: "toolNames.wordCounter",
    descriptionKey: "toolDescriptions.wordCounter",
    tags: ["word", "character", "counter", "text", "reading time"],
    render: renderWordCounter,
    init: initWordCounter,
  },
];

const categories = [
  { id: "all", labelKey: "tools.filterAll" },
  { id: "image", labelKey: "tools.filterImage" },
  { id: "text", labelKey: "tools.filterText" },
  { id: "dev", labelKey: "tools.filterDev" },
  { id: "utility", labelKey: "tools.filterUtility" },
  { id: "commerce", labelKey: "tools.filterCommerce" },
  { id: "convert", labelKey: "tools.filterConvert" },
];

export function getAllTools() {
  return [...tools].sort((a, b) => a.priority - b.priority);
}

export function getFeaturedTools() {
  return getAllTools().filter((tool) => tool.featured);
}

export function getToolById(id) {
  return tools.find((tool) => tool.id === id) || null;
}

export function getToolsByCategory(category) {
  if (!category || category === "all") return getAllTools();
  return getAllTools().filter((tool) => tool.category === category);
}

export function getCategories() {
  return [...categories];
}

export function searchTools(query, t) {
  if (!query || query.trim() === "") return getAllTools();

  const q = query.toLowerCase().trim();

  return getAllTools().filter((tool) => {
    const name = t(tool.nameKey).toLowerCase();
    const description = t(tool.descriptionKey).toLowerCase();
    const tags = tool.tags.join(" ").toLowerCase();

    return (
      name.includes(q) ||
      description.includes(q) ||
      tags.includes(q) ||
      tool.id.includes(q)
    );
  });
}

export function getToolCount() {
  return tools.filter((t) => t.status === "active").length;
}