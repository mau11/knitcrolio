interface Field {
  name: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}

const brands: string[] = [
  "Bernat",
  "Craftsmart",
  "Lion Brand",
  "Loops & Threads",
  "Red Heart",
  "Not Sure",
];

const colorFamilies: string[] = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Black",
  "Grey",
  "White",
  "Multi-color",
];

const weights: string[] = [
  "0-Lace",
  "1-Super Fine",
  "2-Fine",
  "3-Light",
  "4-Medium",
  "5-Bulky",
  "6-Super Bulky",
  "7-Jumbo",
  "Not Sure",
];

const yarnOptions: { [key: string]: string[] } = {
  Bernat: ["Baby Blanket", "Blanket", "Mega Bulky"],
  Craftsmart: ["Value"],
  "Lion Brand": ["Wool-Ease Thick & Quick"],
  "Loops & Threads": ["Charisma"],
  "Red Heart": ["Soft Baby Steps", "Super Saver"],
  "Not Sure": ["Not Sure"],
};

const fields: Field[] = [
  { name: "brand", placeholder: "Brand*", required: true, options: brands },
  {
    name: "yarnType",
    placeholder: "Yarn Type*",
    required: true,
  },
  { name: "color", placeholder: "Color*", required: true },
  {
    name: "colorFamily",
    placeholder: "Color Family*",
    required: true,
    options: colorFamilies,
  },
  {
    name: "weight",
    placeholder: "Yarn Weight*",
    required: true,
    options: weights,
  },
  { name: "material", placeholder: "Material", required: true },
  {
    name: "care",
    placeholder: "Care Instructions (optional)",
    required: false,
  },
  {
    name: "skeinWeight",
    placeholder: "Skein weight (optional)",
    required: false,
  },
  { name: "notes", placeholder: "Notes (optional)", required: false },
  { name: "imageUrl", placeholder: "Image link (optional)", required: false },
];

export { yarnOptions, fields };
