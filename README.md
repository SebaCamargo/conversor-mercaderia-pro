# Conversor de Mercadería Pro

Una aplicación web moderna para calcular costos, ganancias y márgenes de mercaderías entre diferentes monedas (ARS, USD, UYU).

## 🚀 Características

- **Cálculos Automáticos**: Conversión automática entre ARS, USD y UYU
- **Mercaderías Dinámicas**: Agregar/eliminar mercaderías según necesites
- **Análisis Detallado**: Cálculo de ganancias brutas, netas y finales
- **Gestión de Costos**: Incluye combustible, transporte, impuestos y comisiones
- **Historial**: Guarda los últimos 10 cálculos realizados
- **Auto-guardado**: Guarda automáticamente los datos cada 30 segundos
- **Diseño Responsivo**: Funciona perfectamente en desktop y móvil
- **Interfaz Moderna**: Diseño limpio y profesional

## 🛠️ Tecnologías

- **Vite**: Build tool y servidor de desarrollo
- **JavaScript ES6+**: Lógica de la aplicación
- **CSS3**: Estilos modernos con gradientes y animaciones
- **HTML5**: Estructura semántica

## 📦 Instalación

1. **Clona o descarga el proyecto**
2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

4. **Abre tu navegador** en `http://localhost:3000`

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 📱 Uso

### Configuración Inicial

1. Ingresa el **valor del peso argentino** (ARS)
2. Ingresa el **valor del dólar** (USD)

### Agregar Mercaderías

1. Haz clic en **"➕ Agregar Mercadería"**
2. Completa los campos:
   - Nombre del producto
   - Valor en ARS
   - Cantidad
   - Precio de venta en UYU

### Costos Adicionales

- **Combustible**: Costo en UYU
- **Transporte**: Costo en UYU
- **Pasada**: Costo en ARS
- **Envío**: Costo en ARS

### Funciones Avanzadas

- **📂 Cargar**: Muestra menú con mercaderías guardadas individualmente
- **💾 (en cada mercadería)**: Guarda mercadería individual
- **🗑️ Limpiar**: Borra todos los datos (con confirmación)
- **🧮 Calcular**: Ejecuta todos los cálculos

## 📊 Resultados

La aplicación muestra:

### Resumen General

- Valor del peso uruguayo
- Totales en ARS, UYU y USD
- Total de ventas en UYU

### Análisis de Ganancias

- Ganancia bruta
- Gastos totales
- Ganancia neta

- **Ganancia final**
- Margen de ganancia

### Detalles por Mercadería

- Análisis individual de cada producto
- Ganancia y margen por item

## 💾 Almacenamiento

Los datos se guardan automáticamente en el **localStorage** del navegador:

- Configuración de monedas
- Mercaderías agregadas
- Costos configurados
- Historial de cálculos

## 🎨 Personalización

### Colores y Estilos

Los estilos están en `style.css` y puedes personalizar:

- Colores principales
- Gradientes de fondo
- Tamaños de fuente
- Espaciados

### Funcionalidades

El código está modularizado en `main.js`:

- Clase `ConversorMercaderia` principal
- Métodos para cada funcionalidad
- Fácil de extender y modificar

## 🔧 Desarrollo

### Estructura del Proyecto

```
app-trabajo/
├── index.html          # Página principal
├── main.js             # Lógica de la aplicación
├── style.css           # Estilos
├── package.json        # Configuración de Vite
├── vite.config.js      # Configuración de Vite
└── README.md           # Documentación
```

### Agregar Nuevas Funcionalidades

1. Modifica `main.js` para agregar nuevos métodos
2. Actualiza `index.html` para nuevos elementos UI
3. Ajusta `style.css` para nuevos estilos

## 🌐 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Desktop, tablet, móvil
- **Sistemas**: Windows, macOS, Linux

## 📝 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**¡Disfruta calculando tus ganancias de manera profesional! 💰**
