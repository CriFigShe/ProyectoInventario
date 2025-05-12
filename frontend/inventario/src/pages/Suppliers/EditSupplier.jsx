import "./EditSupplier.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../context/AuthContext";

export default function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
    userId: currentUser.userId
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/suppliers/${id}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        setSupplier(response.data.data);
      } catch (error) {
        console.error("Error fetching supplier para editar: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(supplier);
      await axios.put(`http://localhost:5000/suppliers/${id}`, supplier, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/suppliers");
    } catch (error) {
      console.error("Error editando un proveedor: ", error);
    }
  };

  return (
    <div className="editForm">
      <h2>Editar proveedor - {supplier.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Contacto(Email o Telf.)</label>
          <input
            type="text"
            name="contact"
            value={supplier.contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="editSupplierButton">Guardar cambios</button>
      </form>
    </div>
  );
}
