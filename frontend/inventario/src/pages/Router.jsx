import { Routes, Route } from "react-router-dom";
import Login from "./Login/LoginPage";
import Register from "./Register/RegisterPage";

/////////////

import ProductPage from "./HomePage/ProductPage";
import EditProduct from "./HomePage/EditProduct";
import AddProduct from "./HomePage/AddProduct";

/////////////

import Suppliers from "./Suppliers/Suppliers";
import EditSupplier from "./Suppliers/EditSupplier";
import AddSupplier from "./Suppliers/AddSupplier";

/////////////

import Events from "./Events/Events";
import EditEvent from "./Events/EditEvent";
import AddEvent from "./Events/AddEvent";
import Calendario from "./Events/Calendar";

/////////////

import Sales from "./Sales/Sales";
import AddSale from "./Sales/AddSale";
import EditSale from "./Sales/EditSale";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/home" element={<ProductPage />}/>
      <Route path="/editProduct/:id" element={<EditProduct />}/>
      <Route path="/addProduct" element={<AddProduct />}/>
      <Route path="/suppliers" element={<Suppliers />}/>
      <Route path="/editSupplier/:id" element={<EditSupplier />}/>
      <Route path="/addSupplier" element={<AddSupplier />}/>
      <Route path="/events" element={<Events />}/>
      <Route path="/editEvent/:id" element={<EditEvent />}/>
      <Route path="/addEvents" element={<AddEvent />}/>
      <Route path="/calendar" element={<Calendario />}/>
      <Route path="/sales" element={<Sales />}/>
      <Route path="/addSale" element={<AddSale />}/>
      <Route path="/editSale/:id" element={<EditSale />}/>
    </Routes>
  );
};

export default Router;
