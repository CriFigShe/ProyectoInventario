import { Burger, Drawer, Stack } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router";
import "./Header.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

export default function Header() {
  const [opened, setOpened] = useState(false);

  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
        title="Menu"
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
            {t("products")}
          </Link>
          <Link className="drawerLink" to="/suppliers">
            {t("suppliers")}
          </Link>
          <Link className="drawerLink" to="/events">
            {t("events")}
          </Link>
          <Link className="drawerLink" to="#">
            a
          </Link>
          <select
            className="drawerLinkLanguages"
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
          >
            <option value="es" className="languageOptions">
              Español
            </option>
            <option value="en" className="languageOptions">
              English
            </option>
          </select>
          <div
            className="drawerLink"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            {t("logOut")}
          </div>
        </Stack>
      </Drawer>
      <p className="hidden">Espanol , Ingles</p>
      <h1>{t("inventory")}</h1>
      <p className="hidden">Espanol , Ingles</p>
    </header>
  );
}
