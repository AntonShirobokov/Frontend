import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Registration from "./components/Registration/Registration";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { PublicRoute } from "./components/routes/PublicRoute";
import { PrivateRoute } from "./components/routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница — доступна всем */}
        <Route path="/" element={<div><Header /> <HomePage /></div>} />

        {/* Публичные страницы (только для неавторизованных) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>

        {/* Приватные страницы (только для авторизованных) */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;