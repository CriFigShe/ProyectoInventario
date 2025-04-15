import "./AddSupplier.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function AddSupplier() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/suppliers", supplier, {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate("/suppliers");
    } catch (error) {
      console.error("Error añadiendo un proveedor: ", error);
    }
  };

  return (
    <div className="addSupplierForm">
      <h2>Añadir un proveedor</h2>
      <form onSubmit={handleSubmit}>
        <div className="formSupplierGroup">
          <label>Nombre</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="formSupplierGroup">
          <label>Contacto(Email o Telf.)</label>
          <input type="text" name="contact" onChange={handleChange} required />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
