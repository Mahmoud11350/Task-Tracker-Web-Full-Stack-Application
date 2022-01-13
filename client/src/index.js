import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { AppProvider } from "./context/appContext";
import "./index.css";

ReactDom.render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>,
  document.querySelector("#root")
);
