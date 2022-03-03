import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
