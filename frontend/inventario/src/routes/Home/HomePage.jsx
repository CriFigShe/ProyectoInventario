import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function HomePage() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState({});
  const [suppliers, setSuppliers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost:5000/products",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const usersResponse = await axios.get("http://localhost:5000/users", {
          headers: {
            Authorization: `${token}`,
          },
        });
        const suppliersResponse = await axios.get(
          "http://localhost:5000/suppliers",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const usersMap = {};
        usersResponse.data.data.forEach((user) => {
          usersMap[user.id] = user.name;
        });
        const suppliersMap = {};
        suppliersResponse.data.data.forEach((supplier) => {
          suppliersMap[supplier.id] = supplier.name;
        });
        setUsers(usersMap);
        setSuppliers(suppliersMap);
        setProducts(productsResponse.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderTextWithEllipsis = (text) => (
    <span title={text} className="truncatedText">
      {text}
    </span>
  );

  return (
    <div className="divHome">
      <h1 className="homeTitle">Productos</h1>
      <div className="listTitles">
        <h3>Nombre</h3>
        <h3>Tipo</h3>
        <h3>Stock</h3>
        <h3>Coste(€)</h3>
        <h3>Precio(€)</h3>
        <h3>Notas</h3>
        <h3>Usuario</h3>
        <h3>Proveedor</h3>
      </div>
      <div className="productsList">
        {products.map((product) => (
          <div key={product.id} className="productCard">
            <p>{product.name}</p>
            <p>{product.type}</p>
            <p>{product.stock}</p>
            <p>{product.cost}</p>
            <p>{product.pvp}</p>
            <p>{renderTextWithEllipsis(product.notes)}</p>
            <p>{users[product.userId]}</p>
            <p>{suppliers[product.supplierId]}</p>
            {/* <Link to={`/products/${product.id}`}>Ver detalles</Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
