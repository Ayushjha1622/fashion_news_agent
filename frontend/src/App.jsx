import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import Topics from "./pages/Topics";
import Competitors from "./pages/Competitors";
import DailyBrief from "./pages/DailyBrief";
import Analytics from "./pages/Analytics";
import Sources from "./pages/Sources";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/feed"
          element={<Feed />}
        />

        <Route
          path="/topics"
          element={<Topics />}
        />

        <Route
          path="/competitors"
          element={<Competitors />}
        />

        <Route
          path="/brief"
          element={<DailyBrief />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/sources"
          element={<Sources />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
