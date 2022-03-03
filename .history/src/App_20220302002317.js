import { BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <SignIn />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
