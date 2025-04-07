import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>
);
