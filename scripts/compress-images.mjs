import fs from "fs";
import path from "path";
import sharp from "sharp";

const imagesDir = path.join(process.cwd(), "public", "images");

async function compressAllImages() {
  const files = fs.readdirSync(imagesDir);
  console.log(`Found ${files.length} files in public/images`);

  for (const file of files) {
    if (file.endsWith(".png") && !file.endsWith(".webp")) {
      const filePath = path.join(imagesDir, file);
      const fileNameWithoutExt = path.basename(file, ".png");
      const outputPath = path.join(imagesDir, `${fileNameWithoutExt}.webp`);

      const stats = fs.statSync(filePath);
      const originalMB = (stats.size / (1024 * 1024)).toFixed(2);

      try {
        await sharp(filePath)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newKB = (newStats.size / 1024).toFixed(2);
        console.log(`✓ Compressed ${file} (${originalMB} MB) -> ${fileNameWithoutExt}.webp (${newKB} KB)`);
      } catch (err) {
        console.error(`Error compressing ${file}:`, err);
      }
    }
  }
}

compressAllImages();
