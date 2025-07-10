if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
// Clase principal para manejar el conversor
class ConversorMercaderia {
  constructor() {
    this.mercaderias = [];
    this.historial = [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.agregarMercaderia(); // Agregar primera mercadería por defecto
    // this.cargarDatosGuardados(); // Comentado para iniciar limpio
  }

  setupEventListeners() {
    // Botones principales
    document
      .getElementById("btnCalcular")
      .addEventListener("click", () => this.calcularTodo());
    document
      .getElementById("btnCargar")
      .addEventListener("click", () => this.mostrarMenuCarga());
    document
      .getElementById("btnLimpiar")
      .addEventListener("click", () => this.limpiarDatos());
    document
      .getElementById("btnAgregarMercaderia")
      .addEventListener("click", () => this.agregarMercaderia());

    // Auto-guardado y actualización de preview cuando cambian los valores
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.autoGuardar();
        // Actualizar todos los previews cuando cambien peso argentino o dólar
        if (input.id === "pesoArg" || input.id === "dolar") {
          this.mercaderias.forEach((m) => this.mostrarPreview(m.id));
        }
      });
    });
  }

  agregarMercaderia() {
    const id = this.mercaderias.length + 1;
    const mercaderia = {
      id,
      valor: 0,
      cantidad: 0,
      ventaUYU: 0,
      nombre: `Mercadería ${id}`,
    };

    this.mercaderias.push(mercaderia);
    this.renderizarMercaderias();
  }

  eliminarMercaderia(id) {
    this.mercaderias = this.mercaderias.filter((m) => m.id !== id);
    this.renderizarMercaderias();
  }

  renderizarMercaderias() {
    const container = document.getElementById("mercaderiasList");
    container.innerHTML = "";

    this.mercaderias.forEach((mercaderia) => {
      const bloque = document.createElement("div");
      bloque.className = "bloque";
      bloque.innerHTML = `
        <div class="mercaderia-header">
          <h4>${mercaderia.nombre}</h4>
          <div class="mercaderia-controls">
            <button onclick="conversor.guardarMercaderiaIndividual(${
              mercaderia.id
            })" class="btn-save">💾</button>
            <button onclick="conversor.eliminarMercaderia(${
              mercaderia.id
            })" class="btn-delete">🗑️</button>
          </div>
        </div>
        <label>Nombre del Producto</label>
        <input type="text" id="nombre${mercaderia.id}" value="${
        mercaderia.nombre || ""
      }" placeholder="Nombre del producto" />
        <label>Valor en ARS</label>
        <input type="number" id="valorMercaderia${
          mercaderia.id
        }" step="any" placeholder="4000" value="${mercaderia.valor || ""}" />
        <label>Cantidad</label>
        <input type="number" id="cantidad${
          mercaderia.id
        }" step="any" placeholder="10" value="${mercaderia.cantidad || ""}" />
        <label>Venta unidad en UYU</label>
        <input type="number" id="valorVentaUYU${
          mercaderia.id
        }" step="any" placeholder="150" value="${mercaderia.ventaUYU || ""}" />
        <div class="mercaderia-preview" id="preview${mercaderia.id}"></div>
      `;

      // Agregar event listeners para actualización en tiempo real
      const inputs = bloque.querySelectorAll("input");
      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          this.actualizarMercaderia(mercaderia.id);
          this.mostrarPreview(mercaderia.id);
        });
      });

      container.appendChild(bloque);
      this.mostrarPreview(mercaderia.id);
    });
  }

  actualizarMercaderia(id) {
    const mercaderia = this.mercaderias.find((m) => m.id === id);
    if (!mercaderia) return;

    mercaderia.nombre =
      document.getElementById(`nombre${id}`).value || `Mercadería ${id}`;
    mercaderia.valor =
      parseFloat(document.getElementById(`valorMercaderia${id}`).value) || 0;
    mercaderia.cantidad =
      parseFloat(document.getElementById(`cantidad${id}`).value) || 0;
    mercaderia.ventaUYU =
      parseFloat(document.getElementById(`valorVentaUYU${id}`).value) || 0;
  }

  mostrarPreview(id) {
    const preview = document.getElementById(`preview${id}`);
    const mercaderia = this.mercaderias.find((m) => m.id === id);
    if (!mercaderia) return;

    const pesoArg = parseFloat(document.getElementById("pesoArg").value) || 0;
    const dolar = parseFloat(document.getElementById("dolar").value) || 0;

    if (pesoArg && dolar) {
      const valorPesoUYU = dolar / pesoArg;
      const totalARS = mercaderia.valor * mercaderia.cantidad;
      const totalUYU = totalARS * valorPesoUYU;
      const totalVentaUYU = mercaderia.ventaUYU * mercaderia.cantidad;
      const ganancia = totalVentaUYU - totalUYU;
      const margen = totalUYU > 0 ? (ganancia / totalUYU) * 100 : 0;

      preview.innerHTML = `
        <div class="preview-info">
          <div class="preview-row">
            <span class="preview-label">💰 Costo Total:</span>
            <span class="preview-value">ARS ${this.formatNumber(
              totalARS
            )} | UYU ${this.formatNumber(totalUYU)}</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">📈 Venta Total:</span>
            <span class="preview-value">UYU ${this.formatNumber(
              totalVentaUYU
            )}</span>
          </div>
          <div class="preview-row ${
            ganancia >= 0 ? "ganancia-positiva" : "ganancia-negativa"
          }">
            <span class="preview-label">💵 Ganancia:</span>
            <span class="preview-value">UYU ${this.formatNumber(
              ganancia
            )} (${margen.toFixed(1)}%)</span>
          </div>
        </div>
      `;
    } else {
      preview.innerHTML = `
        <div class="preview-info preview-warning">
          <small>⚠️ Completa los valores de peso argentino y dólar para ver el resumen</small>
        </div>
      `;
    }
  }

  formatNumber(num) {
    return num.toLocaleString("es-ES", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
  }

  calcularTodo() {
    const pesoArg = parseFloat(document.getElementById("pesoArg").value);
    const dolar = parseFloat(document.getElementById("dolar").value);

    // Actualizar todas las mercaderías
    this.mercaderias.forEach((m) => this.actualizarMercaderia(m.id));

    if (!pesoArg || !dolar) {
      this.mostrarError(
        "Por favor, completa los valores de peso argentino y dólar correctamente."
      );
      return;
    }

    const valorPesoUYU = dolar / pesoArg;
    const combustibleUYU =
      parseFloat(document.getElementById("combustibleUYU").value) || 0;
    const transporteUYU =
      parseFloat(document.getElementById("transporteUYU").value) || 0;
    const pasadaARS =
      parseFloat(document.getElementById("pasadaARS").value) || 0;
    const envioARS = parseFloat(document.getElementById("envioARS").value) || 0;

    let totalARS = 0,
      totalUYU = 0,
      totalUSD = 0,
      totalVentaUYU = 0;
    const detallesMercaderias = [];

    this.mercaderias.forEach((mercaderia) => {
      const totalItemARS = mercaderia.valor * mercaderia.cantidad;
      const totalItemUYU = totalItemARS * valorPesoUYU;
      const totalItemVentaUYU = mercaderia.ventaUYU * mercaderia.cantidad;
      const gananciaItem = totalItemVentaUYU - totalItemUYU;
      const margenItem =
        totalItemUYU > 0 ? (gananciaItem / totalItemUYU) * 100 : 0;

      totalARS += totalItemARS;
      totalUYU += totalItemUYU;
      totalVentaUYU += totalItemVentaUYU;

      detallesMercaderias.push({
        nombre: mercaderia.nombre,
        totalARS: totalItemARS,
        totalUYU: totalItemUYU,
        totalVentaUYU: totalItemVentaUYU,
        ganancia: gananciaItem,
        margen: margenItem,
      });
    });

    totalUSD = totalUYU / dolar;
    const pasadaUYU = pasadaARS * valorPesoUYU;
    const envioUYU = envioARS * valorPesoUYU;
    const gastosUYU = combustibleUYU + transporteUYU + pasadaUYU + envioUYU;
    const gananciaBruta = totalVentaUYU - totalUYU;
    const gananciaNeta = gananciaBruta - gastosUYU;

    // Cálculos finales
    const gananciaFinal = gananciaNeta;
    const margenFinal = totalUYU > 0 ? (gananciaFinal / totalUYU) * 100 : 0;

    this.mostrarResultados({
      valorPesoUYU,
      totalARS,
      totalUYU,
      totalUSD,
      totalVentaUYU,
      gananciaBruta,
      gastosUYU,
      gananciaNeta,
      gananciaFinal,
      margenFinal,
      detallesMercaderias,
    });

    this.agregarAlHistorial({
      fecha: new Date().toLocaleString(),
      totalARS,
      totalUYU,
      gananciaFinal,
      margenFinal,
    });
  }

  mostrarResultados(resultados) {
    const content = document.getElementById("resultadosContent");
    content.innerHTML = `
      <div class="resultado-principal">
        <h5>💰 Resumen General</h5>
        <p>Valor del Peso Uruguayo: <strong>${this.formatNumber(
          resultados.valorPesoUYU
        )}</strong></p>
        <p>Total en ARS: <strong>${this.formatNumber(
          resultados.totalARS
        )}</strong></p>
        <p>Total en UYU: <strong>${this.formatNumber(
          resultados.totalUYU
        )}</strong></p>
        <p>Total en USD: <strong>${this.formatNumber(
          resultados.totalUSD
        )}</strong></p>
        <p>Total venta en UYU: <strong>${this.formatNumber(
          resultados.totalVentaUYU
        )}</strong></p>
      </div>

      <div class="resultado-ganancias">
        <h5>📈 Análisis de Ganancias</h5>
        <p>Ganancia bruta: <strong>${this.formatNumber(
          resultados.gananciaBruta
        )}</strong></p>
        <p>Gastos en UYU: <strong>${this.formatNumber(
          resultados.gastosUYU
        )}</strong></p>
        <p>Ganancia neta: <strong>${this.formatNumber(
          resultados.gananciaNeta
        )}</strong></p>

        <p class="ganancia-final">Ganancia final: <strong>${this.formatNumber(
          resultados.gananciaFinal
        )}</strong></p>
        <p>Margen final: <strong>${resultados.margenFinal.toFixed(
          2
        )}%</strong></p>

      </div>

      <div class="detalles-mercaderias">
        <h5>📦 Detalles por Mercadería</h5>
        ${resultados.detallesMercaderias
          .map(
            (item) => `
          <div class="detalle-item">
            <strong>${item.nombre}</strong><br>
            <small>ARS: ${this.formatNumber(
              item.totalARS
            )} | UYU: ${this.formatNumber(
              item.totalUYU
            )} | Venta: ${this.formatNumber(
              item.totalVentaUYU
            )} | Ganancia: ${this.formatNumber(
              item.ganancia
            )} (${item.margen.toFixed(1)}%)</small>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  mostrarError(mensaje) {
    const content = document.getElementById("resultadosContent");
    content.innerHTML = `<p class="error">❌ ${mensaje}</p>`;
  }

  agregarAlHistorial(datos) {
    this.historial.unshift(datos);
    if (this.historial.length > 10) {
      this.historial.pop();
    }
    this.renderizarHistorial();
  }

  renderizarHistorial() {
    const historial = document.getElementById("historial");
    historial.innerHTML = this.historial
      .map(
        (item) => `
      <div class="historial-item">
        <small>${item.fecha}</small><br>
        <strong>ARS: ${this.formatNumber(
          item.totalARS
        )} | UYU: ${this.formatNumber(
          item.totalUYU
        )} | Ganancia: ${this.formatNumber(
          item.gananciaFinal
        )} (${item.margenFinal.toFixed(1)}%)</strong>
      </div>
    `
      )
      .join("");
  }

  guardarMercaderiaIndividual(id) {
    const mercaderia = this.mercaderias.find((m) => m.id === id);
    if (!mercaderia) return;

    // Actualizar la mercadería antes de guardar
    this.actualizarMercaderia(id);

    // Obtener mercaderías guardadas existentes
    const mercaderiasGuardadas = JSON.parse(
      localStorage.getItem("mercaderiasIndividuales") || "[]"
    );

    // Buscar si ya existe una mercadería con el mismo nombre
    const index = mercaderiasGuardadas.findIndex(
      (m) => m.nombre === mercaderia.nombre
    );

    if (index !== -1) {
      // Actualizar la existente
      mercaderiasGuardadas[index] = {
        ...mercaderia,
        fechaGuardado: new Date().toLocaleString(),
      };
    } else {
      // Agregar nueva
      mercaderiasGuardadas.push({
        ...mercaderia,
        fechaGuardado: new Date().toLocaleString(),
      });
    }

    localStorage.setItem(
      "mercaderiasIndividuales",
      JSON.stringify(mercaderiasGuardadas)
    );
    this.mostrarNotificacion(
      `Mercadería "${mercaderia.nombre}" guardada correctamente`
    );
  }

  mostrarMenuCarga() {
    const mercaderiasGuardadas = JSON.parse(
      localStorage.getItem("mercaderiasIndividuales") || "[]"
    );

    if (mercaderiasGuardadas.length === 0) {
      this.mostrarNotificacion("No hay mercaderías guardadas");
      return;
    }

    // Crear modal de selección
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>📂 Mercaderías Guardadas</h3>
          <button onclick="this.closest('.modal-overlay').remove()" class="btn-close">✕</button>
        </div>
        <div class="modal-body">
          ${mercaderiasGuardadas
            .map(
              (mercaderia, index) => `
            <div class="mercaderia-guardada" onclick="conversor.cargarMercaderiaIndividual(${index})">
              <div class="mercaderia-info">
                <strong>${mercaderia.nombre}</strong>
                <small>ARS: ${this.formatNumber(
                  mercaderia.valor
                )} | Cantidad: ${
                mercaderia.cantidad
              } | Venta UYU: ${this.formatNumber(mercaderia.ventaUYU)}</small>
                <small class="fecha-guardado">Guardado: ${
                  mercaderia.fechaGuardado
                }</small>
              </div>
              <button onclick="event.stopPropagation(); conversor.eliminarMercaderiaGuardada(${index})" class="btn-delete-small">🗑️</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  cargarMercaderiaIndividual(index) {
    const mercaderiasGuardadas = JSON.parse(
      localStorage.getItem("mercaderiasIndividuales") || "[]"
    );
    const mercaderiaGuardada = mercaderiasGuardadas[index];

    if (!mercaderiaGuardada) return;

    // Crear nueva mercadería con los datos guardados
    const nuevaMercaderia = {
      id: this.mercaderias.length + 1,
      nombre: mercaderiaGuardada.nombre,
      valor: mercaderiaGuardada.valor,
      cantidad: mercaderiaGuardada.cantidad,
      ventaUYU: mercaderiaGuardada.ventaUYU,
    };

    this.mercaderias.push(nuevaMercaderia);
    this.renderizarMercaderias();

    // Llenar los campos con los valores guardados
    setTimeout(() => {
      document.getElementById(`nombre${nuevaMercaderia.id}`).value =
        mercaderiaGuardada.nombre;
      document.getElementById(`valorMercaderia${nuevaMercaderia.id}`).value =
        mercaderiaGuardada.valor;
      document.getElementById(`cantidad${nuevaMercaderia.id}`).value =
        mercaderiaGuardada.cantidad;
      document.getElementById(`valorVentaUYU${nuevaMercaderia.id}`).value =
        mercaderiaGuardada.ventaUYU;
    }, 100);

    // Cerrar modal
    document.querySelector(".modal-overlay")?.remove();

    this.mostrarNotificacion(
      `Mercadería "${nuevaMercaderia.nombre}" cargada correctamente`
    );

    // Actualizar el preview de la nueva mercadería
    setTimeout(() => {
      this.mostrarPreview(nuevaMercaderia.id);
    }, 100);
  }

  eliminarMercaderiaGuardada(index) {
    if (
      confirm("¿Estás seguro de que quieres eliminar esta mercadería guardada?")
    ) {
      const mercaderiasGuardadas = JSON.parse(
        localStorage.getItem("mercaderiasIndividuales") || "[]"
      );
      mercaderiasGuardadas.splice(index, 1);
      localStorage.setItem(
        "mercaderiasIndividuales",
        JSON.stringify(mercaderiasGuardadas)
      );

      // Recargar el modal
      document.querySelector(".modal-overlay")?.remove();
      this.mostrarMenuCarga();
    }
  }

  guardarDatos() {
    const datos = {
      pesoArg: document.getElementById("pesoArg").value,
      dolar: document.getElementById("dolar").value,
      combustibleUYU: document.getElementById("combustibleUYU").value,
      transporteUYU: document.getElementById("transporteUYU").value,
      pasadaARS: document.getElementById("pasadaARS").value,
      envioARS: document.getElementById("envioARS").value,
      mercaderias: this.mercaderias,
      historial: this.historial,
    };

    localStorage.setItem("conversorMercaderia", JSON.stringify(datos));
    this.mostrarNotificacion("Datos guardados correctamente");
  }

  cargarDatos() {
    const datos = localStorage.getItem("conversorMercaderia");
    if (datos) {
      const parsed = JSON.parse(datos);

      // Cargar valores básicos
      Object.keys(parsed).forEach((key) => {
        if (key !== "mercaderias" && key !== "historial") {
          const element = document.getElementById(key);
          if (element) element.value = parsed[key];
        }
      });

      // Cargar mercaderías
      if (parsed.mercaderias) {
        this.mercaderias = parsed.mercaderias;
        this.renderizarMercaderias();
        // Llenar los campos con los valores guardados
        setTimeout(() => {
          this.mercaderias.forEach((m) => {
            document.getElementById(`nombre${m.id}`).value = m.nombre;
            document.getElementById(`valorMercaderia${m.id}`).value = m.valor;
            document.getElementById(`cantidad${m.id}`).value = m.cantidad;
            document.getElementById(`valorVentaUYU${m.id}`).value = m.ventaUYU;
            this.mostrarPreview(m.id);
          });
        }, 100);
      }

      // Cargar historial
      if (parsed.historial) {
        this.historial = parsed.historial;
        this.renderizarHistorial();
      }

      this.mostrarNotificacion("Datos cargados correctamente");
    }
  }

  limpiarDatos() {
    if (confirm("¿Estás seguro de que quieres limpiar todos los datos?")) {
      // Limpiar inputs
      document.querySelectorAll("input").forEach((input) => (input.value = ""));

      // Limpiar mercaderías y historial
      this.mercaderias = [];
      this.historial = [];

      this.renderizarMercaderias();
      this.renderizarHistorial();

      document.getElementById("resultadosContent").innerHTML = "";
      this.mostrarNotificacion("Datos limpiados correctamente");
    }
  }

  autoGuardar() {
    // Auto-guardar cada 30 segundos
    clearTimeout(this.autoSaveTimeout);
    this.autoSaveTimeout = setTimeout(() => {
      this.guardarDatos();
    }, 30000);
  }

  mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div");
    notificacion.className = "notificacion";
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
      notificacion.remove();
    }, 3000);
  }
}

// Inicializar la aplicación
const conversor = new ConversorMercaderia();

// Hacer conversor disponible globalmente para los botones
window.conversor = conversor;
