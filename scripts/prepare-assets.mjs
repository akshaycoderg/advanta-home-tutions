import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const downloads = "C:/Users/LAPPY HUB/Downloads";
const publicImages = path.resolve("public/images");
const appDir = path.resolve("app");

await fs.mkdir(publicImages, { recursive: true });
await fs.mkdir(path.resolve("public/icons"), { recursive: true });
await fs.mkdir(appDir, { recursive: true });

const wideLogo = path.join(downloads, "Advanta Home Tutions Logo (2).png");
const squareLogo = path.join(downloads, "Advanta Home Tutoring Logo.png");

// Brand mark (icon only) cropped from the supplied wide logo, with breathing room.
await sharp(wideLogo)
  .extract({ left: 580, top: 16, width: 572, height: 481 })
  .resize({ width: 512, height: 430, fit: "contain", background: "#ffffff" })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicImages, "logo-mark.png"));

// Full stacked lockup, trimmed of excess outer whitespace.
await sharp(wideLogo)
  .extract({ left: 218, top: 40, width: 1292, height: 776 })
  .resize({ width: 1000, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicImages, "logo-full.png"));

// Square lockup (kept for print / social use and about page).
await sharp(squareLogo)
  .extract({ left: 68, top: 156, width: 1124, height: 908 })
  .resize({ width: 900, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicImages, "logo-stacked.png"));

// Favicons: white background, mark centred with padding.
const mark = await sharp(path.join(publicImages, "logo-mark.png"))
  .resize({ width: 420, height: 420, fit: "contain", background: "#ffffff" })
  .png()
  .toBuffer();

const icon512 = await sharp({
  create: { width: 512, height: 512, channels: 4, background: "#ffffff" },
})
  .composite([{ input: mark, gravity: "center" }])
  .png()
  .toBuffer();

await fs.writeFile(path.join(appDir, "icon.png"), icon512);
await fs.writeFile(path.join(publicImages, "logo-mark-512.png"), icon512);

await sharp(icon512)
  .resize(180, 180)
  .png()
  .toFile(path.join(appDir, "apple-icon.png"));

// Build a PNG-compressed .ico (valid ICO container) for /favicon.ico
const icoPng = await sharp(icon512).resize(64, 64).png().toBuffer();
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
const icoEntry = Buffer.alloc(16);
icoEntry.writeUInt8(64, 0);
icoEntry.writeUInt8(64, 1);
icoEntry.writeUInt8(0, 2);
icoEntry.writeUInt8(0, 3);
icoEntry.writeUInt16LE(1, 4);
icoEntry.writeUInt16LE(32, 6);
icoEntry.writeUInt32LE(icoPng.length, 8);
icoEntry.writeUInt32LE(22, 12);
await fs.writeFile(path.join(appDir, "favicon.ico"), Buffer.concat([icoHeader, icoEntry, icoPng]));

console.log("Assets generated.");
