import { lazy, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom";

// every page is its own chunk, so the first load only gets what it needs
const HomePage = lazy(() => import("./pages/HomePage"));
const ItemPage = lazy(() => import("./pages/ItemPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const CoachPage = lazy(() => import("./pages/CoachPage"));

function NotFoundPage() {
  return (
    <main className="page not-found">
      <h1 className="page-title">Page not found</h1>
      <p>This room is empty.</p>
      <Link to="/" className="back-link">← Back to all items</Link>
    </main>
  );
}

function App() {
  return (
    <>
      <Suspense fallback={<main className="page"><p className="loading">Loading...</p></main>}>
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
      </Suspense>

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
