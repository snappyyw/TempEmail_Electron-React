import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import MainRout from "./route";
import { ROUTES } from "./route/path";
import { setupStore } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = setupStore();

root.render(
  <Provider store={store}>
    <HashRouter basename={ROUTES.main}>
      <MainRout />
    </HashRouter>
  </Provider>
);
