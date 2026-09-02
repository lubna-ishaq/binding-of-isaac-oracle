import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import ComparePage from "./pages/ComparePage";
import CoachPage from "./pages/CoachPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/item/:itemId"
        element={<ItemPage />}
      />

      <Route
        path="/compare"
        element={<ComparePage />}
      />

      <Route
        path="/coach"
        element={<CoachPage />}
      />
    </Routes>
  );
}

export default App;