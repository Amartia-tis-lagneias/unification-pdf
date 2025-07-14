import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MergePage from "./pages/MergePage";
import CompressPage from "./pages/CompressPage";
import SplitPage from "./pages/SplitPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <Link to="/merge" className="nav-btn">Объединить</Link>
          <Link to="/compress" className="nav-btn">Сжать</Link>
          <Link to="/split" className="nav-btn">Разделить</Link>
        </header>

        <main>
          <Routes>
            <Route path="/merge" element={<MergePage />} />
            <Route path="/compress" element={<CompressPage />} />
            <Route path="/split" element={<SplitPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
