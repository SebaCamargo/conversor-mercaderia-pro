// Registrar Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registrado: ", registration);

        // Manejar actualizaciones del SW
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Hay una nueva versión disponible
              showUpdateNotification();
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log("SW registro falló: ", registrationError);
      });
  });
}

// Variables para el banner de instalación
let deferredPrompt;
const installButton = document.getElementById("installButton");

// Escuchar el evento beforeinstallprompt
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevenir que Chrome muestre el prompt automático
  e.preventDefault();
  // Guardar el evento para usarlo después
  deferredPrompt = e;
  // Mostrar el botón de instalación
  showInstallButton();
});

// Función para mostrar el botón de instalación
function showInstallButton() {
  if (installButton) {
    installButton.style.display = "block";
    installButton.addEventListener("click", installApp);
  }
}

// Función para instalar la app
function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuario aceptó instalar la app");
      } else {
        console.log("Usuario rechazó instalar la app");
      }
      deferredPrompt = null;
      if (installButton) {
        installButton.style.display = "none";
      }
    });
  }
}

// Función para mostrar notificación de actualización
function showUpdateNotification() {
  const notification = document.createElement("div");
  notification.className = "update-notification";
  notification.innerHTML = `
    <div class="update-content">
      <p>🔄 Nueva versión disponible</p>
      <button onclick="updateApp()" class="btn-update">Actualizar</button>
      <button onclick="closeNotification()" class="btn-close">✕</button>
    </div>
  `;

  // Agregar estilos
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    max-width: 300px;
  `;

  document.body.appendChild(notification);

  // Auto-ocultar después de 10 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
}

// Función para actualizar la app
function updateApp() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  }
}

// Función para cerrar notificación
function closeNotification() {
  const notification = document.querySelector(".update-notification");
  if (notification) {
    notification.remove();
  }
}

// Detectar si la app está instalada
window.addEventListener("appinstalled", (evt) => {
  console.log("Aplicación instalada");
  if (installButton) {
    installButton.style.display = "none";
  }
});

// Detectar si la app está en modo standalone (instalada)
if (window.matchMedia("(display-mode: standalone)").matches) {
  console.log("App ejecutándose en modo standalone");
  document.body.classList.add("standalone-mode");
}
