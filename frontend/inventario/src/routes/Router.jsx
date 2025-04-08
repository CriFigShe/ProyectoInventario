import { Routes, Route } from "react-router-dom";
import Login from "./Login/LoginPage";
import Register from "./Register/RegisterPage";
import HomePage from "./Home/HomePage";
import Suppliers from "./Suppliers/Suppliers";
import EditProduct from "./Home/EditProduct";
import AddProduct from "./Home/AddProduct";
import Events from "./Events/Events";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />}/>
      <Route path="/suppliers" element={<Suppliers />}/>
      <Route path="/editProduct/:id" element={<EditProduct />}/>
      <Route path="/addProduct" element={<AddProduct />}/>
      <Route path="/events" element={<Events />}/>
    </Routes>
  );
};

export default Router;
