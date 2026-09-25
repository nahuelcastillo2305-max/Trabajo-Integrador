// Importamos React
import { StrictMode } from "react";

// Importamos ReactDOM para mostrar la aplicación
import { createRoot } from "react-dom/client";

// Importamos los estilos
import "./index.css";

// Importamos nuestro componente principal
import App from "./App.jsx";

// Mostramos App dentro del elemento root
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);