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

export { brands, colorFamilies, weights, yarnOptions };
