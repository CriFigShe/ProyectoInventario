import "./EditSupplier.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';

export default function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
    userId: currentUser.userId
  });

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://proyectoinventario.onrender.com/suppliers/${id}`,
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
      await axios.put(`https://proyectoinventario.onrender.com/suppliers/${id}`, supplier, {
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
      <h2>{t('editSupplier')} - {supplier.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>{t('supplierName')}</label>
          <input
            type="text"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>{t('supplierContact')}(Email o Telf.)</label>
          <input
            type="text"
            name="contact"
            value={supplier.contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="editSupplierButton">{t('saveChanges')}</button>
      </form>
    </div>
  );
}
