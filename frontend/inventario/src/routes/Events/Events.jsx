import "./Events.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { Burger, Drawer, Stack } from "@mantine/core";

import { CiTrash } from "react-icons/ci";
import { GoPencil } from "react-icons/go";

export default function Events() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const [opened, setOpened] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setEvents(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, [token]);

  if (error) return <div>Error: {error}</div>;

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Estas seguro de eliminar este evento")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setEvents(events.filter((event) => event.id !== eventId));
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
    <div className="divEvents">
      <div className="eventsHeader">
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          aria-label="Toggle Navigation"
          color="#eee"
          style={{ position: "absolute", left: 20 }}
          transitionDuration={250}
        />
        <h1 className="eventsTitle">Eventos</h1>
        <Link to="/addEvents">
          <button className="addEvent">+</button>
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
      <div className="eventsContainer">
        <div className="eventListTitles">
          <h3>Nombre</h3>
          <h3>Fecha</h3>
          <h3>Descripción</h3>
          <h3>Acciones</h3>
        </div>
        <div className="eventsList">
          {events.map((event) => (
            <div key={event.id} className="eventCard">
              <p>{event.name}</p>
              <p>{event.date}</p>
              <p>{renderTextWithEllipsis(event.description)}</p>
              <p>
                <Link to={`/editEvent/${event.id}`}>
                  <button className="eventActionButton">
                    <GoPencil />
                  </button>
                </Link>
                <button
                  className="eventActionButton"
                  onClick={() => handleDeleteEvent(event.id)}
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
