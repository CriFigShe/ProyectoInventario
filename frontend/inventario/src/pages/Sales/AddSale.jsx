import "./AddSale.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function AddSale() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [sale, setSale] = useState({
    date: "",
    payment: "",
    taxes: "",
    package_price: "",
    shipping_price: "",
    profit: "",
    // products: "",
    userId: currentUser.userId,
  });
  const [products, setProducts] = useTranslation([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUser.token) {
          navigate("/");
        }
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
        console.error("Error recogiendo los productos", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/sales", sale, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/sales");
    } catch (error) {
      console.error("Error añadiendo una venta", error.message);
    }
  };

  return (
    <div className="addForm">
        <h2>{t('addSale')}</h2>
        <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>{t('saleDate')}</label>
          <input type="date" name="date" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>{t('salePayment')}</label>
          <select name="payment" onChange={handleChange} required>
            <option value="">-- {t('salePayment')} --</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Tranferencia</option>
            <option value="bizum">Bizum</option>
          </select>
        </div>
        <div className="formGroup">
          <label>{t('saleTaxes')}</label>
          <input type="number" name="stock" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>{t('salePackagePrice')}</label>
          <input type="number" name="cost" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>{t('saleShippingPrice')}</label>
          <input type="number" name="pvp" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>{t('saleProfit')}</label>
          <input type="number" name="cost" onChange={handleChange} required />
        </div>
        {/* <div className="formGroup">
          <label>{t('saleProduct')}</label>
          <select name="productId" onChange={handleChange} required>
            <option value="">-- {t('saleProduct')} --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div> */}
        <button type="submit" className="addSaleButton">{t('addSale')}</button>
      </form>
    </div>
  );
}
