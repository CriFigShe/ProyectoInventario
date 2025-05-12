import { Burger, Drawer, Stack } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router";
import "./Header.css";

export default function Header() {
  const [opened, setOpened] = useState(false);
  return (
    <header className="header">
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        aria-label="Toggle Navigation"
        color="#eee"
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
            Productos
          </Link>
          <Link className="drawerLink" to="/suppliers">
            Proveedores
          </Link>
          <Link className="drawerLink" to="/events">
            Eventos
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
      <p className="hidden">Espanol , Ingles</p>
      <h1>Inventario</h1>
      <p className="hidden">Espanol , Ingles</p>
    </header>
  );
}
