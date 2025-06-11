import "./EditSale.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { MultiSelect } from "@mantine/core";

export default function EditSale() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation();

  const [sale, setSale] = useState({
    date: "",
    payment: "",
    taxes: "",
    package_price: "",
    shipping_price: "",
    profit: "",
    products: [],
    userId: currentUser.userId,
  });

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!currentUser.token) {
      navigate("/");
      return;
    }

    const fetchProducts = async () => {
      try {
        const productsRes = await axios.get(
          `http://localhost:5000/products/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        setProducts(productsRes.data.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    const fetchSale = async () => {
      try {
        const saleRes = await axios.get(`http://localhost:5000/sales/${id}`, {
          headers: {
            Authorization: `${currentUser.token}`,
          },
        });
        const saleData = saleRes.data.data;

        setSale({
          date: saleData.date.slice(0, 10),
          payment: saleData.payment,
          taxes: saleData.taxes.toString(),
          package_price: saleData.package_price.toString(),
          shipping_price: saleData.shipping_price.toString(),
          profit: saleData.profit.toString(),
          products: saleData.products,
          userId: saleData.userId,
        });

        const counts = {};
        if (Array.isArray(saleData.products)) {
          saleData.products.forEach((productId) => {
            const idStr = productId.toString();
            counts[idStr] = (counts[idStr] || 0) + 1;
          });
        }

        const uniqueProducts = Object.keys(counts);
        setSelectedProducts(uniqueProducts);
        setProductQuantities(counts);
      } catch (error) {
        console.error("Error fetching sale", error);
      }
    };

    fetchProducts();
    fetchSale();
  }, [currentUser, navigate, id]);

  const validateField = (name, value) => {
    let error = "";

    if (name === "date") {
      if (!value) {
        error = t("errorRequired");
      }
    }

    if (name === "payment") {
      if (!value) {
        error = t("errorRequired");
      }
    }

    if (["taxes", "package_price", "shipping_price", "profit"].includes(name)) {
      if (value === "" || value === null) {
        error = t("errorRequired");
      } else if (Number(value) <= 0) {
        error = t("errorPositive");
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!sale.date) {
      newErrors.date = t("errorRequired");
    }

    if (!sale.payment) {
      newErrors.payment = t("errorRequired");
    }

    ["taxes", "package_price", "shipping_price", "profit"].forEach((field) => {
      const value = sale[field];
      if (value === "" || value === null) {
        newErrors[field] = t("errorRequired");
      } else if (Number(value) <= 0) {
        newErrors[field] = t("errorPositive");
      }
    });

    if (selectedProducts.length === 0) {
      newErrors.products = t("errorSelectAtLeastOneProduct");
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, multiple, selectedOptions } = e.target;

    if (multiple) {
      const values = Array.from(selectedOptions, (option) => option.value);
      setSale((prev) => ({ ...prev, [name]: values }));
    } else {
      let newValue = value;
      if (
        ["taxes", "package_price", "shipping_price", "profit"].includes(name)
      ) {
        newValue = value === "" ? "" : Number(value);
      }
      setSale((prev) => ({ ...prev, [name]: newValue }));
    }

    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleProductSelect = (values) => {
    setSelectedProducts(values);

    const updatedQuantities = { ...productQuantities };
    values.forEach((id) => {
      if (!updatedQuantities[id]) {
        updatedQuantities[id] = 1;
      }
    });

    Object.keys(updatedQuantities).forEach((id) => {
      if (!values.includes(id)) {
        delete updatedQuantities[id];
      }
    });

    setProductQuantities(updatedQuantities);

    if (errors.products) {
      if (values.length > 0) {
        setErrors((prev) => ({ ...prev, products: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          products: t("errorSelectAtLeastOneProduct"),
        }));
      }
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

    const expandedProducts = selectedProducts.flatMap((productId) =>
      Array(productQuantities[productId] || 1).fill(productId)
    );

    const finalSale = {
      ...sale,
      taxes: Number(sale.taxes),
      package_price: Number(sale.package_price),
      shipping_price: Number(sale.shipping_price),
      profit: Number(sale.profit),
      products: expandedProducts,
      userId: currentUser.userId,
    };

    try {
      console.log(finalSale);
      await axios.put(`http://localhost:5000/sales/${id}`, finalSale, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/sales");
    } catch (error) {
      console.error("Error actualizando la venta", error);
    }
  };

  const productOptions = products.map((product) => ({
    value: product.id.toString(),
    label: product.name,
  }));

  return (
    <div className="editForm">
      <h2>{t("editSale")}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>{t("saleDate")}</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={sale.date}
            required
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="formGroup">
          <label>{t("salePayment")}</label>
          <select
            name="payment"
            onChange={handleChange}
            value={sale.payment}
            required
          >
            <option value="">{`-- ${t("salePayment")} --`}</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Tranferencia</option>
            <option value="Bizum">Bizum</option>
          </select>
          {errors.payment && <span className="error">{errors.payment}</span>}
        </div>
        <div className="formGroup">
          <label>{t("saleTaxes")}</label>
          <input
            type="number"
            name="taxes"
            onChange={handleChange}
            value={sale.taxes}
            min="1"
            required
          />
          {errors.taxes && <span className="error">{errors.taxes}</span>}
        </div>
        <div className="formGroup">
          <label>{t("salePackagePrice")}</label>
          <input
            type="number"
            name="package_price"
            onChange={handleChange}
            value={sale.package_price}
            min="1"
            required
          />
          {errors.package_price && (
            <span className="error">{errors.package_price}</span>
          )}
        </div>
        <div className="formGroup">
          <label>{t("saleShippingPrice")}</label>
          <input
            type="number"
            name="shipping_price"
            onChange={handleChange}
            value={sale.shipping_price}
            min="1"
            required
          />
          {errors.shipping_price && (
            <span className="error">{errors.shipping_price}</span>
          )}
        </div>
        <div className="formGroup">
          <label>{t("saleProfit")}</label>
          <input
            type="number"
            name="profit"
            onChange={handleChange}
            value={sale.profit}
            min="1"
            required
          />
          {errors.profit && <span className="error">{errors.profit}</span>}
        </div>

        <div className="formGroup">
          <label>{t("products")}</label>
          <MultiSelect
            className="selectProducts"
            data={productOptions}
            value={selectedProducts}
            onChange={handleProductSelect}
            placeholder="Selecciona productos"
            searchable
            nothingfound="No se encontraron productos"
            clearable
          />
          {errors.products && <span className="error">{errors.products}</span>}
        </div>

        {selectedProducts.map((productId) => {
          const product = products.find((p) => p.id.toString() === productId);
          return (
            <div key={productId} className="formGroup">
              <label>
                {product?.name || "Producto"} - {t("quantity")}
              </label>
              <input
                type="number"
                min="1"
                value={productQuantities[productId] || 1}
                onChange={(e) => {
                  const qty = Math.max(1, Number(e.target.value));
                  setProductQuantities((prev) => ({
                    ...prev,
                    [productId]: qty,
                  }));
                }}
              />
            </div>
          );
        })}

        <button type="submit" className="btnSave">
          {t("editSale")}
        </button>
      </form>
    </div>
  );
}
