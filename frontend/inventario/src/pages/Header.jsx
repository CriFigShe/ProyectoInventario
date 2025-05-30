import { Burger, Drawer, Stack } from "@mantine/core";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import "./Header.css";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";
import i18n from "../i18n/i18n";

export default function Header() {
  const [opened, setOpened] = useState(false);

  const { i18n, t } = useTranslation();

  const { setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setCurrentUser();
    navigate("/");
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
            overflow: "hidden"
          },
          header: {
            backgroundColor: "#00bcd9",
            overflow: "hidden"
          },
          body: {
            backgroundColor: "#00bcd9",
            overflow: "hidden"
          },
          title: {
            color: "white",
            fontWeight: "bold",
          },
        }}
      >
        <Stack>
          <div className="categorias">
            <Link className="drawerLink" to="/home">
              {t("products")}
            </Link>
            <Link className="drawerLink" to="/suppliers">
              {t("suppliers")}
            </Link>
            <Link className="drawerLink" to="/events">
              {t("events")}
            </Link>
            <Link className="drawerLink" to="/sales">
              {t("sales")}
            </Link>
            <Link className="drawerLink" to="/calendar">
              {t("calendar")}
            </Link>
          </div>
          <div className="otros">
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
          </div>
        </Stack>
      </Drawer>
      <p className="hidden">Espanol , Ingles</p>
      <h1>{t("inventory")}</h1>
      <p className="hidden">Espanol , Ingles</p>
    </header>
  );
}
