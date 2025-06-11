import "./AddProduct.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

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
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUser.token) {
          navigate("/");
        }
        const supplierRes = await axios.get(
          `http://localhost:5000/suppliers/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        setSuppliers(supplierRes.data.data);
      } catch (error) {
        console.error("Error recogiendo los proveedores", error);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "errorRequired";
    } else if (product.name.trim().length < 3) {
      newErrors.name = { key: "errorMinLength", values: { count: 3 } };
    }

    if (!product.type.trim()) {
      newErrors.type = "errorRequired";
    } else if (product.type.trim().length < 3) {
      newErrors.type = { key: "errorMinLength", values: { count: 3 } };
    }

    if (product.stock === "") {
      newErrors.stock = "errorRequired";
    } else if (Number(product.stock) < 0) {
      newErrors.stock = "errorStock";
    }

    if (product.cost === "") {
      newErrors.cost = "errorRequired";
    } else if (Number(product.cost) < 0) {
      newErrors.cost = "errorPositive";
    }

    if (product.pvp === "") {
      newErrors.pvp = "errorRequired";
    } else if (Number(product.pvp) < 0) {
      newErrors.pvp = "errorPositive";
    } else if (Number(product.pvp) <= Number(product.cost)) {
      newErrors.pvp = "errorPvpGreaterThanCost";
    }

    if (!product.supplierId) {
      newErrors.supplierId = "errorRequired";
    }

    return newErrors;
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" || name === "type") {
      if (!value.trim()) {
        error = "errorRequired";
      } else if (value.trim().length < 3) {
        error = { key: "errorMinLength", values: { count: 3 } };
      }
    }

    if (name === "stock") {
      if (value === "") {
        error = "errorRequired";
      } else if (Number(value) < 0) {
        error = "errorStock";
      }
    }

    if (name === "cost") {
      if (value === "") {
        error = "errorRequired";
      } else if (Number(value) < 0) {
        error = "errorPositive";
      }
    }

    if (name === "pvp") {
      if (value === "") {
        error = "errorRequired";
      } else if (Number(value) < 0) {
        error = "errorPositive";
      } else if (Number(value) <= Number(product.cost)) {
        error = "errorPvpGreaterThanCost";
      }
    }

    if (name === "supplierId" && !value) {
      error = "errorRequired";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
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
      await axios.post("http://localhost:5000/products", product, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error añadiendo un producto:", error.message);
    }
  };

  const renderError = (error) => {
    if (!error) return null;
    return typeof error === "string"
      ? t(error)
      : t(error.key, error.values || {});
  };

  return (
    <div className="addForm">
      <h2>{t("addProduct")}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>{t("productName")}</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.name, e.target.value)}
          />
          {errors.name && <span className="error">{renderError(errors.name)}</span>}
        </div>
        <div className="formGroup">
          <label>{t("addProductType")}</label>
          <input
            type="text"
            name="type"
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.name, e.target.value)}
          />
          {errors.type && <span className="error">{renderError(errors.type)}</span>}
        </div>
        <div className="formGroup">
          <label>{t("productStock")}</label>
          <input
            type="number"
            name="stock"
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.name, e.target.value)}
          />
          {errors.stock && <span className="error">{renderError(errors.stock)}</span>}
        </div>
        <div className="formGroup">
          <label>{t("productCost")}</label>
          <input
            type="number"
            name="cost"
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.name, e.target.value)}
          />
          {errors.cost && <span className="error">{renderError(errors.cost)}</span>}
        </div>
        <div className="formGroup">
          <label>{t("productPVP")}</label>
          <input
            type="number"
            name="pvp"
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.name, e.target.value)}
          />
          {errors.pvp && <span className="error">{renderError(errors.pvp)}</span>}
        </div>
        <div className="formGroup">
          <label>{t("productNotes")}</label>
          <textarea name="notes" onChange={handleChange}></textarea>
        </div>
        <div className="formGroup">
          <label>{t("productSupplier")}</label>
          <select name="supplierId" onChange={handleChange}>
            <option value="">-- {t("productSupplier")} --</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplierId && (
            <span className="error">{renderError(errors.supplierId)}</span>
          )}
        </div>
        <button type="submit" className="addProductButton">
          {t("addProduct")}
        </button>
      </form>
    </div>
  );
}
