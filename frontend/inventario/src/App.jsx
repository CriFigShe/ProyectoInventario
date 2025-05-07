import Router from "./pages/Router";
import Header from "./pages/Header"
import { useLocation } from "react-router";

function App() {

  const location = useLocation();
  const excludedRoutes = ["/", "/register"];
  const isHidden = excludedRoutes.includes(location.pathname);

  return (
    <main className="mainApp">
      {!isHidden && <Header />}
      <Router />
    </main>
  );
}

export default App;
