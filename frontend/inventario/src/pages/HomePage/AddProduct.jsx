import "./AddProduct.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    type: "",
    stock: "",
    cost: "",
    pvp: "",
    notes: "",
    userId: currentUser.userId,
    supplierId: "",
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!currentUser.token){
          navigate("/");
        }
        const supplierRes = await axios.get(`http://localhost:5000/suppliers/users/${currentUser.userId}`, {
          headers: {
            Authorization: `${currentUser.token}`,
          },
        });
        setSuppliers(supplierRes.data.data);
      } catch (error) {
        console.error("Error recogiendo los proveedores", error);
      } 
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", product, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/home");
    } catch (error) {
        console.error("Error añadiendo un producto:", error.message)
    }
  };


  return (
    <div className="addForm">
      <h2>Añadir un producto</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>Nombre</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>Tipo de producto</label>
          <input type="text" name="type" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>Stock</label>
          <input type="number" name="stock" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>Coste</label>
          <input type="number" name="cost" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>P.V.P</label>
          <input type="number" name="pvp" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>Notas</label>
          <textarea name="notes" onChange={handleChange} required></textarea>
        </div>
        <div className="formGroup">
          <label>Proveedor</label>
          <select name="supplierId" onChange={handleChange} required>
            <option value="">-- Proveedor --</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="addProductButton">Añadir producto</button>
      </form>
    </div>
  );
}
