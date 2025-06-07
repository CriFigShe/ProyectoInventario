import "./AddSupplier.css";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';

export default function AddSupplier() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
    userId: currentUser.userId
  });

  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/suppliers", supplier, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/suppliers");
    } catch (error) {
      console.error("Error añadiendo un proveedor: ", error.message)
    }
  };

  return (
    <div className="addForm">
      <h2>{t('addSupplier')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>{t('supplierName')}</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>{t('supplierContact')}(Email o Telf.)</label>
          <input type="text" name="contact" onChange={handleChange} required />
        </div>
        <button type="submit" className="addSupplierButton">{t('addSupplier')}</button>
      </form>
    </div>
  );
}
