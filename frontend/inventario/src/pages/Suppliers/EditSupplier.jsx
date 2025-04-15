import "./EditSupplier.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export default function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/suppliers/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setSupplier(response.data.data);
      } catch (error) {
        console.error("Error fetching supplier para editar: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/suppliers/${id}`, supplier, {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate("/suppliers");
    } catch (error) {
      console.error("Error editando un proveedor: ", error);
    }
  };

  return (
    <div className="editSupplierForm">
      <h2>Editar proveedor: {supplier.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="formSupplierGroup">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formSupplierGroup">
          <label>Contacto(Email o Telf.)</label>
          <input
            type="text"
            name="contact"
            value={supplier.contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
