import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcDir = "C:/Users/dmitr/Downloads/photo servizi";
const destDir = path.join(__dirname, "..", "public", "images", "services");

fs.mkdirSync(destDir, { recursive: true });

const mapping = [
  { src: "Luce.png", dest: "riparazioni-elettriche.webp" },
  { src: "Un rubinetto perde.png", dest: "piccoli-interventi-idraulici.webp" },
  { src: "Il nuovo mobile.png", dest: "montaggio-mobili.webp" },
  { src: "TV e tende.png", dest: "tv-e-tende.webp" },
  { src: "Porte che chiudono bene.png", dest: "porte-e-serrature.webp" },
  { src: "Quella lista di piccoli lavori.png", dest: "pittura-e-lavori-tuttofare.webp" },
];

for (const { src, dest } of mapping) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);

  await sharp(srcPath).webp({ quality: 85, effort: 4 }).toFile(destPath);

  console.log(`Converted: ${src} → ${dest}`);
}

console.log("All done!");
