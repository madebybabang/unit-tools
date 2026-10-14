/**
 * Tool Registry
 * Sumber data tunggal untuk semua tool di UNIT Tools.
 * Digunakan oleh: homepage, direktori, tool card, router, SEO.
 */

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

/**
 * Semua tool, urut berdasarkan priority.
 */
export function getAllTools() {
  return [...tools].sort((a, b) => a.priority - b.priority);
}

/**
 * Tool yang ditandai featured.
 */
export function getFeaturedTools() {
  return getAllTools().filter((tool) => tool.featured);
}

/**
 * Cari tool berdasarkan id.
 * @param {string} id
 */
export function getToolById(id) {
  return tools.find((tool) => tool.id === id) || null;
}

/**
 * Tool berdasarkan kategori.
 * @param {string} category - "image", "dev", dll. "all" untuk semua.
 */
export function getToolsByCategory(category) {
  if (!category || category === "all") return getAllTools();
  return getAllTools().filter((tool) => tool.category === category);
}

/**
 * Semua kategori yang tersedia.
 */
export function getCategories() {
  return [...categories];
}

/**
 * Cari tool berdasarkan query.
 * @param {string} query
 * @param {(key: string) => string} t - fungsi i18n
 */
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

/**
 * Jumlah tool aktif.
 */
export function getToolCount() {
  return tools.filter((t) => t.status === "active").length;
}
