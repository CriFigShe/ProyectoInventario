import "./HomePage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Burger, Drawer, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import { CiTrash } from "react-icons/ci";
import { GoPencil } from "react-icons/go";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if(!currentUser.token){
          navigate('/');
        }
        const productsResponse = await axios.get(
          `http://localhost:5000/products/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        const suppliersResponse = await axios.get(
          `http://localhost:5000/suppliers/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        const suppliersMap = {};
        suppliersResponse.data.data.forEach((supplier) => {
          suppliersMap[supplier.id] = supplier.name;
        });
        setSuppliers(suppliersMap);
        setProducts(productsResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, [currentUser]);

  if (error) return <div>Error: {error}</div>;

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Estas seguro de eliminar este producto")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/products/${productId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== productId));
      setError(null);
    } catch (error) {
      setError(`Error al eliminar el producto: ${error}`);
    }
  };

  const renderTextWithEllipsis = (text) => (
    <span title={text} className="truncatedText">
      {text}
    </span>
  );

  return (
    <div className="divHome">
      <div className="header">
        <h1 className="homeTitle">Productos</h1>
        <Link to="/addProduct">
          <button className="addProduct">+</button>
        </Link>
      </div>

      {products.length > 0 && <div className="productsContainer">
        <div className="listTitles">
          <h3>Nombre</h3>
          <h3>Tipo</h3>
          <h3>Stock</h3>
          <h3>Coste(€)</h3>
          <h3>Precio(€)</h3>
          <h3>Notas</h3>
          <h3>Proveedor</h3>
          <h3>Acciones</h3>
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
              <p>{suppliers[product.supplierId]}</p>
              <p>
                <Link to={`/editProduct/${product.id}`}>
                  <button className="productActionButton">
                    <GoPencil />
                  </button>
                </Link>
                <button
                  className="productActionButton"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <CiTrash />
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>}
      {products.length == 0 && <p>No hay productos guardados.</p>}
    </div>
  );
}
