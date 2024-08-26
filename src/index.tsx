import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./styledComponents/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles
      styles={{
        "::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#8e24aa",
          borderRadius: "12px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#ab47bc",
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#8e24aa #f1f1f1",
        msOverflowStyle: "scrollbar",
      }}
    />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
