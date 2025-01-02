import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";

// Redux setup
import { store } from "./store.ts";
import { Provider as ReduxProvider } from "react-redux";

// Optional future expansions
// import { ErrorBoundary } from "./components/ErrorBoundary";
// import { ThemeProvider } from "@emotion/react";
// import { myCustomTheme } from "./theme";

const container = document.getElementById("root");
if (!container) {
  // Fallback if 'root' is not found, could throw or handle gracefully
  throw new Error("Root element not found. Check your index.html.");
}

// createRoot usage
const root = createRoot(container);

root.render(
  <StrictMode>
    {/* 
      If you plan to add theming, you could wrap 
      <Provider store={store}> with <ThemeProvider theme={myCustomTheme}>
      or if you have an ErrorBoundary, you could do:

      <ErrorBoundary>
        <ThemeProvider theme={myCustomTheme}>
          <ReduxProvider store={store}>
            <App />
          </ReduxProvider>
        </ThemeProvider>
      </ErrorBoundary>
    */}

    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </StrictMode>
);
