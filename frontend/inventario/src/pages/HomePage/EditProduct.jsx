import "./EditProduct.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    type: "",
    stock: "",
    cost: "",
    pvp: "",
    notes: "",
    supplierId: "",
    userId: currentUser.userId,
  });
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(
          `http://localhost:3000/products/${id}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        const suppliersRes = await axios.get(
          `http://localhost:3000/suppliers/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        setProduct({
          ...productRes.data.data,
          stock: productRes.data.data.stock.toString(),
          cost: productRes.data.data.cost.toString(),
          pvp: productRes.data.data.pvp.toString(),
        });
        setSuppliers(suppliersRes.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id, currentUser.token, currentUser.userId]);

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" || name === "type") {
      if (!value.trim()) {
        error = t("errorRequired");
      } else if (value.trim().length < 3) {
        error = t("errorMinLength", { count: 3 });
      }
    }

    if (name === "stock") {
      if (value === "") {
        error = t("errorRequired");
      } else if (Number(value) < 0) {
        error = t("errorStock");
      }
    }

    if (name === "cost") {
      if (value === "") {
        error = t("errorRequired");
      } else if (Number(value) < 0) {
        error = t("errorPositive");
      }
    }

    if (name === "pvp") {
      if (value === "") {
        error = t("errorRequired");
      } else if (Number(value) < 0) {
        error = t("errorPositive");
      } else if (Number(value) <= Number(product.cost)) {
        error = t("errorPvpGreaterThanCost");
      }
    }

    if (name === "supplierId" && !value) {
      error = t("errorRequired");
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = t("errorRequired");
    } else if (product.name.trim().length < 3) {
      newErrors.name = t("errorMinLength", { count: 3 });
    }

    if (!product.type.trim()) {
      newErrors.type = t("errorRequired");
    } else if (product.type.trim().length < 3) {
      newErrors.type = t("errorMinLength", { count: 3 });
    }

    if (product.stock === "") {
      newErrors.stock = t("errorRequired");
    } else if (Number(product.stock) < 0) {
      newErrors.stock = t("errorStock");
    }

    if (product.cost === "") {
      newErrors.cost = t("errorRequired");
    } else if (Number(product.cost) < 0) {
      newErrors.cost = t("errorPositive");
    }

    if (product.pvp === "") {
      newErrors.pvp = t("errorRequired");
    } else if (Number(product.pvp) < 0) {
      newErrors.pvp = t("errorPositive");
    } else if (Number(product.pvp) <= Number(product.cost)) {
      newErrors.pvp = t("errorPvpGreaterThanCost");
    }

    if (!product.supplierId) {
      newErrors.supplierId = t("errorRequired");
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));

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

    const payload = {
      ...product,
      stock: Number(product.stock),
      cost: Number(product.cost),
      pvp: Number(product.pvp),
    };

    try {
      await axios.put(`http://localhost:3000/products/${id}`, payload, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error editando el producto: ", error);
    }
  };

  return (
    <div className="editForm">
      <h2>{t('editProduct')} - {product.name}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>{t('productName')}</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="formGroup">
          <label>{t('addProductType')}</label>
          <input
            type="text"
            name="type"
            value={product.type}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.type && <span className="error">{errors.type}</span>}
        </div>
        <div className="formGroup">
          <label>{t('productStock')}</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.stock && <span className="error">{errors.stock}</span>}
        </div>
        <div className="formGroup">
          <label>{t('productCost')}</label>
          <input
            type="number"
            name="cost"
            value={product.cost}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.cost && <span className="error">{errors.cost}</span>}
        </div>
        <div className="formGroup">
          <label>{t('productPVP')}</label>
          <input
            type="number"
            name="pvp"
            value={product.pvp}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.pvp && <span className="error">{errors.pvp}</span>}
        </div>
        <div className="formGroup">
          <label>{t('productNotes')}</label>
          <textarea
            name="notes"
            value={product.notes}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label>{t('productSupplier')}</label>
          <select
            name="supplierId"
            value={product.supplierId}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="">-- {t('productSupplier')} --</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplierId && <span className="error">{errors.supplierId}</span>}
        </div>
        <button type="submit" className="editProductButton">{t('saveChanges')}</button>
      </form>
    </div>
  );
}
