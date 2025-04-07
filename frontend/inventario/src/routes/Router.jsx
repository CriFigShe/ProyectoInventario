import { Routes, Route } from "react-router-dom";
import Login from "./Login/LoginPage";
import Register from "./Register/RegisterPage";
import HomePage from "./Home/HomePage";
import Suppliers from "./Suppliers/Suppliers";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />}/>
      <Route path="/suppliers" element={<Suppliers />}/>
    </Routes>
  );
};

export default Router;
