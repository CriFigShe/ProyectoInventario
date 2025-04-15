import "./Suppliers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Burger, Drawer, Stack } from "@mantine/core";

import { CiTrash } from "react-icons/ci";
import { GoPencil } from "react-icons/go";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  const [opened, setOpened] = useState(false);

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
      }
    };

    fetchSuppliers();
  }, []);

  if (error) return <div>Error: {error}</div>;

  const handleDeleteSupplier = async (supplierId, supplierName) => {
    if (
      !window.confirm(
        `Estas seguro de eliminar este proveedor: ${supplierName}`
      )
    ) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/suppliers/${supplierId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setSuppliers(suppliers.filter((supplier) => supplier.id !== supplierId));
      setError(null);
    } catch (error) {
      setError(`Error al eliminar el proveedor: ${error}`);
    }
  };

  return (
    <div className="divSuppliers">
      <div className="suppliersHeader">
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          aria-label="Toggle Navigation"
          color="#eee"
          style={{ position: "absolute", left: 20 }}
          transitionDuration={250}
        />
        <h1 className="suppliersTitle">Proveedores</h1>
        <Link to="/addSupplier">
          <button className="addSupplier">+</button>
        </Link>
      </div>

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
          <Link className="drawerLink" to="/events">
            Eventos
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
      <div className="suppliersContainer">
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
                <Link to={`/editSupplier/${supplier.id}`}>
                  <button className="supplierActionButton">
                    <GoPencil />
                  </button>
                </Link>
                <button
                  className="supplierActionButton"
                  onClick={() =>
                    handleDeleteSupplier(supplier.id, supplier.name)
                  }
                >
                  <CiTrash />
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
