import { Routes, Route } from "react-router-dom";
import Login from "./Login/LoginPage";
import Register from "./Register/RegisterPage";
import HomePage from "./Home/HomePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />}/>
    </Routes>
  );
};

export default Router;
