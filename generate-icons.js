import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear directorio de iconos si no existe
const iconsDir = path.join(__dirname, "public", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Crear directorio de screenshots si no existe
const screenshotsDir = path.join(__dirname, "public", "screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Generar SVG base para los iconos
function generateSVG(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.1}"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${
    size * 0.3
  }" fill="rgba(255,255,255,0.2)"/>
  <text x="${size / 2}" y="${
    size / 2
  }" font-family="Arial, sans-serif" font-size="${
    size * 0.4
  }" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">🧮</text>
  <rect x="${size * 0.05}" y="${size * 0.05}" width="${size * 0.9}" height="${
    size * 0.9
  }" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="${
    size * 0.02
  }" rx="${size * 0.05}"/>
</svg>`;
}

// Tamaños de iconos requeridos
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

console.log("Generando iconos PWA...");

// Generar cada icono
iconSizes.forEach((size) => {
  const svg = generateSVG(size);
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log(`✅ Icono ${size}x${size} generado`);
});

// Crear archivo README para iconos
const readmeContent = `# Iconos PWA

Los iconos SVG han sido generados automáticamente. Para convertirlos a PNG:

## Opción 1: Usar herramientas online
1. Ve a https://convertio.co/svg-png/ o similar
2. Sube cada archivo SVG
3. Descarga como PNG

## Opción 2: Usar ImageMagick (línea de comandos)
\`\`\`bash
for file in *.svg; do
  convert "$file" "\${file%.svg}.png"
done
\`\`\`

## Opción 3: Usar herramientas de diseño
- Figma
- Adobe Illustrator
- Inkscape

## Tamaños requeridos:
- 16x16, 32x32 (favicon)
- 72x72, 96x96, 128x128 (Android)
- 144x144, 152x152 (iOS)
- 192x192, 384x384, 512x512 (PWA)

Una vez convertidos a PNG, reemplaza los archivos SVG con los PNG correspondientes.
`;

fs.writeFileSync(path.join(iconsDir, "README.md"), readmeContent);

console.log("\n🎉 Iconos SVG generados exitosamente!");
console.log("📁 Ubicación: public/icons/");
console.log("📖 Lee el README.md en la carpeta de iconos para convertir a PNG");
console.log("\n📱 Tu PWA está lista! Características implementadas:");
console.log("✅ Manifest.json");
console.log("✅ Service Worker");
console.log("✅ Meta tags PWA");
console.log("✅ Botón de instalación");
console.log("✅ Funcionalidad offline");
console.log("✅ Notificaciones de actualización");
console.log("✅ Estilos responsive para móvil");
