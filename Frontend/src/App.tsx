import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import FrontFunc from "./pages/FrontPage";
import { SettingsFunc } from "./pages/SettingsPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontFunc />} />
        <Route path={"/settings"} element={<SettingsFunc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
