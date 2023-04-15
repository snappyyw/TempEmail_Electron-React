import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./path";
import { Main, Email } from "../pages";

export default function MainRout() {
  return (
    <Routes>
      <Route path={ROUTES.main} element={<Main />} />
      <Route path={ROUTES.email} element={<Email />} />
    </Routes>
  );
}
