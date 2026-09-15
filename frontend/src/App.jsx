import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import ComparePage from "./pages/ComparePage";
import CoachPage from "./pages/CoachPage";

function NotFoundPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1 className="page-title">Page not found</h1>
      <p style={{ margin: "20px 0" }}>This room is empty.</p>
      <Link to="/">← Back to all items</Link>
    </main>
  );
}

function App() {
  return (
    <>
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

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>

    <footer className="site-footer">
      Unofficial fan project. Not affiliated with the creators or publishers of
      The Binding of Isaac. Item text from the{" "}
      <a href="https://bindingofisaacrebirth.wiki.gg/wiki/Items">
        Binding of Isaac: Rebirth Wiki
      </a>{" "}
      (CC BY-SA 4.0). Game artwork belongs to its respective owners.
    </footer>
    </>
  );
}

export default App;