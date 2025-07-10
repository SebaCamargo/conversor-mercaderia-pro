# 🚀 Guía de Despliegue - Conversor de Mercadería Pro

## Opción 1: Netlify (Recomendado)

### Método 1: Arrastrar y Soltar

1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratuita
3. Arrastra la carpeta `dist` a la zona de "Drag and drop your site output folder here"
4. ¡Listo! Tu PWA estará online en segundos

### Método 2: Conectando GitHub

1. Sube tu código a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. Pulsa "New site from Git"
4. Conecta tu repositorio
5. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. ¡Despliegue automático!

## Opción 2: Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Crea cuenta gratuita
3. Conecta tu repositorio de GitHub
4. Configura automáticamente
5. ¡Listo!

## Opción 3: GitHub Pages

1. Sube tu código a GitHub
2. Ve a Settings > Pages
3. Source: Deploy from a branch
4. Branch: main, folder: / (root)
5. ¡Listo!

## ✅ Después del Despliegue

- Tu PWA funcionará **sin internet** (offline)
- Se podrá instalar en **cualquier dispositivo**
- Tendrá **HTTPS automático**
- Será accesible desde **cualquier lugar**

## 🔧 URLs de Prueba

Una vez desplegado, prueba:

- **Instalación PWA:** Abre en Chrome móvil
- **Funcionamiento offline:** Desconecta internet y usa la app
- **Iconos:** Verifica que se vean correctamente

## 📱 Instalación en Dispositivos

### Android:

- Abre en Chrome
- Verás banner "Instalar ConversorPro"
- O menú ⋮ > "Instalar aplicación"

### iOS:

- Abre en Safari
- Compartir > "Agregar a pantalla de inicio"
