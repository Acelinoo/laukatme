import sharp from "sharp";
import fs from "fs";

async function generateFavicon() {
  const logoBuffer = fs.readFileSync("public/logo.png");
  
  // Resize to 32x32 png
  const favicon32 = await sharp(logoBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();

  fs.writeFileSync("src/app/favicon.ico", favicon32);
  fs.writeFileSync("public/favicon.ico", favicon32);
  fs.writeFileSync("src/app/icon.png", favicon32);
  fs.writeFileSync("public/logo.png", logoBuffer);
  
  console.log("Favicon 32x32 generated successfully!");
}

generateFavicon().catch(console.error);
