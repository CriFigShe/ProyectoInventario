import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Burger, Drawer, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [opened, setOpened] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

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
        const suppliersResponse = await axios.get(
          "http://localhost:5000/suppliers",
          {
            headers: {
              Authorization: `${token}`,
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
      <div className="header">
        <h1 className="homeTitle">Productos</h1>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          aria-label="Toggle Navigation"
          color="#00bcd9"
          style={{ position: "absolute", left: 20 }}
          transitionDuration={250}
        />
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Menú"
          padding="md"
          size="md"
          closeButtonProps={{
            style: {
              color: "white",
              transition: "color 0.3s ease",
            },
            onMouseEnter: (e) => (e.currentTarget.style.color = "#00bcd9"),
            onMouseLeave: (e) => (e.currentTarget.style.color = "white"),
          }}
          styles={{
            content: {
              backgroundColor: "#00bcd9",
            },
            header: {
              backgroundColor: "#00bcd9",
            },
            body: {
              backgroundColor: "#00bcd9",
            },
            title: {
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          <Stack>
            <Link className="drawerLink" to="/home">
              Inicio
            </Link>
            <Link className="drawerLink" to="/suppliers">
              Proveedores
            </Link>
            <Link className="drawerLink" to="#">
              a
            </Link>
            <Link className="drawerLink" to="#">
              a
            </Link>
            <div
              className="drawerLink"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Cerrar Sesión
            </div>
          </Stack>
        </Drawer>
      </div>
      <div className="listTitles">
        <h3>Nombre</h3>
        <h3>Tipo</h3>
        <h3>Stock</h3>
        <h3>Coste(€)</h3>
        <h3>Precio(€)</h3>
        <h3>Notas</h3>
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
            <p>{suppliers[product.supplierId]}</p>
            {/* <Link to={`/products/${product.id}`}>Ver detalles</Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
