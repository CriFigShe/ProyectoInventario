import "./EditProduct.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [product, setProduct] = useState({
    name: "",
    type: "",
    stock: 0,
    cost: 0,
    pvp: 0,
    notes: "",
    supplierId: "",
    userId: null,
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(
          `http://localhost:5000/products/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const suppliersRes = await axios.get(
          "http://localhost:5000/suppliers",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setProduct(productRes.data.data);
        setSuppliers(suppliersRes.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [token, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(product);
      await axios.put(`http://localhost:5000/products/${id}`, product, {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error editando el producto: ", error);
    }
  };

  return (
    <div className="editForm">
      <h2>Editar Producto: {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Tipo de producto</label>
          <input
            type="text"
            name="type"
            value={product.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Coste</label>
          <input
            type="number"
            name="cost"
            value={product.cost}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>P.V.P</label>
          <input
            type="number"
            name="pvp"
            value={product.pvp}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Notas</label>
          <textarea
            name="notes"
            value={product.notes}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Proveedor</label>
          <select
            name="supplierId"
            value={product.supplierId}
            onChange={handleChange}
            required
          >
            <option value="">-- Proveedor --</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
