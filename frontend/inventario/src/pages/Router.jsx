import { Routes, Route } from "react-router-dom";
import Login from "./Login/LoginPage";
import Register from "./Register/RegisterPage";

/////////////

import HomePage from "./HomePage/HomePage";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";

/////////////

import Suppliers from "./Suppliers/Suppliers";
import EditSupplier from "./Suppliers/EditSupplier";
import AddSupplier from "./Suppliers/AddSupplier";

/////////////

import Events from "./Events/Events";
import EditEvent from "./Events/EditEvent";
import AddEvent from "./Events/AddEvent";

import { Burger, Drawer } from "@mantine/core";
import { useState } from "react";



const Router = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/home" element={<HomePage />}/>
      <Route path="/editProduct/:id" element={<EditProduct />}/>
      <Route path="/addProduct" element={<AddProduct />}/>
      <Route path="/suppliers" element={<Suppliers />}/>
      <Route path="/editSupplier/:id" element={<EditSupplier />}/>
      <Route path="/addSupplier" element={<AddSupplier />}/>
      <Route path="/events" element={<Events />}/>
      <Route path="/editEvent/:id" element={<EditEvent />}/>
      <Route path="/addEvents" element={<AddEvent />}/>
    </Routes>
  );
};

export default Router;
