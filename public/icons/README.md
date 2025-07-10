# Iconos PWA

Los iconos SVG han sido generados automáticamente. Para convertirlos a PNG:

## Opción 1: Usar herramientas online
1. Ve a https://convertio.co/svg-png/ o similar
2. Sube cada archivo SVG
3. Descarga como PNG

## Opción 2: Usar ImageMagick (línea de comandos)
```bash
for file in *.svg; do
  convert "$file" "${file%.svg}.png"
done
```

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
