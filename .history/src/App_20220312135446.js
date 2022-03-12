import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Start from "./pages/Start";
import { SnackbarProvider, useSnackbar } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Start />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
