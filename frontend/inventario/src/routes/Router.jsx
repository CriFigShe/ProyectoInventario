import { Routes, Route } from "react-router-dom";
import Login from "./Login/LoginPage";
import Register from "./Register/RegisterPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
