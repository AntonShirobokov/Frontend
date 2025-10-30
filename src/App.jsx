import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Registration from "./components/Registration/Registration";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { PublicRoute } from "./components/routes/PublicRoute";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import CreateQrPage from "./components/CreateQrPage/CreateQrPage";
import QrCodePage from "./components/QrCodePage/QrCodePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница — доступна всем */}
        <Route path="/" element={<div><Header /> <HomePage /></div>} />
        <Route path="/create" element={<div><Header /> <CreateQrPage /></div>} />
        <Route path="/qrcodes/:id" element={<QrCodePage />} />


        {/* Публичные страницы (только для неавторизованных) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>

        {/* Приватные страницы (только для авторизованных) */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<div><Header /> <Profile /></div>} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;