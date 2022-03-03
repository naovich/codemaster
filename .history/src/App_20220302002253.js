import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
}

export default App;
