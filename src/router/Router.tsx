import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Game from "../pages/Game";

const Router = () => {
  return (
    <Routes>
      <Route path="/games" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="*" element={<Navigate to="/games" replace />} />
    </Routes>
  );
};

export default Router;
