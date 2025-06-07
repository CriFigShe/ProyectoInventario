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
    userId: currentUser.userId,
  });
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();

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

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = t("errorRequired");
    } else if (value.trim().length < 3) {
      error = t("errorMinLength", { count: 3 });
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!supplier.name.trim()) {
      newErrors.name = t("errorRequired");
    } else if (supplier.name.trim().length < 3) {
      newErrors.name = t("errorMinLength", { count: 3 });
    }
    if (!supplier.contact.trim()) {
      newErrors.contact = t("errorRequired");
    } else if (supplier.contact.trim().length < 3) {
      newErrors.contact = t("errorMinLength", { count: 3 });
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
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
      <h2>{t('editSupplier')} - {supplier.name}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>{t('supplierName')}</label>
          <input
            type="text"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="formGroup">
          <label>{t('supplierContact')}(Email o Telf.)</label>
          <input
            type="text"
            name="contact"
            value={supplier.contact}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </div>
        <button type="submit" className="editSupplierButton">{t('saveChanges')}</button>
      </form>
    </div>
  );
}
