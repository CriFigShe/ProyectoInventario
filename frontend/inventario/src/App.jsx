import Router from "./pages/Router";
import BurgerMenu from "./pages/BurgerMenu"
import { useLocation } from "react-router";

function App() {

  const location = useLocation();
  const excludedRoutes = ["/", "/register"];
  const isHidden = excludedRoutes.includes(location.pathname);

  return (
    <main className="mainApp">
      {!isHidden && <BurgerMenu />}
      <Router />
    </main>
  );
}

export default App;
