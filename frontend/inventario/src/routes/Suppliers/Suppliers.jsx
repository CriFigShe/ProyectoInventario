import "./Suppliers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Burger, Drawer, Stack } from "@mantine/core";

export default function Suppliers() {
  const { token } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [opened, setOpened] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/suppliers", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setSuppliers(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [token]);

  if (loading) return <div>Cargendo proveedores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="divSuppliers">
      <div className="suppliersHeader">
        <h1 className="suppliersTitle">Proveedores</h1>
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
            <Link className="drawerLink" to="#">
              a
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
      <div className="suppliersListTitles">
        <h3>Nombre</h3>
        <h3>Contacto</h3>
        <h3>Acciones</h3>
      </div>
      <div className="suppliersList">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="supplierCard">
            <p>{supplier.name}</p>
            <p>{supplier.contact}</p>
            <p>
              <button>U</button>
              <button>D</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
