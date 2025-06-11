import "./Events.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification } from "@mantine/core";
import { useTranslation } from "react-i18next";
import DeleteModal from "../../components/DeleteModal";

import { CiTrash } from "react-icons/ci";
import { GoPencil } from "react-icons/go";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [registerSucceed, setRegisterSucceed] = useState();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  const { t } = useTranslation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!currentUser.token) {
          navigate("/");
        }
        const response = await axios.get(
          `http://localhost:3000/events/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        console.log("Eventos cargados: ",response.data.data);
        setEvents(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, [currentUser]);

  useEffect(() => {
    if (registerSucceed !== undefined) {
      const timer = setTimeout(() => {
        setRegisterSucceed(undefined);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registerSucceed]);

  if (error) return <div>Error: {error}</div>;

  const confirmDeleteEvent = (event) => {
    setEventToDelete(event);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      await axios.delete(`http://localhost:3000/events/${eventToDelete.id}`, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      setRegisterSucceed(true);
      setEvents(events.filter((e) => e.id !== eventToDelete.id));
      setError(null);
    } catch (error) {
      setRegisterSucceed(false);
      setError(`Error al eliminar el evento: ${error}`);
    } finally {
      setDeleteModalOpen(false);
      setEventToDelete(null);
    }
  };

  const renderTextWithEllipsis = (text) => (
    <span title={text} className="truncatedText">
      {text}
    </span>
  );

  return (
    <main className="eventPage">
      <DeleteModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={eventToDelete?.name}
      />

      <div className="eventsTitle">
        <h2>{t("events")}</h2>
        <Link to="/addEvents">
          <button className="addEvents">+</button>
        </Link>
      </div>
      <div className="notificationContainer">
        {registerSucceed == false && (
          <Notification
            icon={xIcon}
            color="red"
            title={t("errorRemovingEvent")}
            withCloseButton={false}
          />
        )}
        {registerSucceed == true && (
          <Notification
            icon={checkIcon}
            color="teal"
            title={t("successRemovingEvent")}
            withCloseButton={false}
          />
        )}
      </div>
      <div>
        {events.length > 0 && (
          <div className="eventsContainer">
            <div className="listTitles">
              <h3>{t("eventName")}</h3>
              <h3>{t("eventDate")}</h3>
              <h3>{t("eventDescription")}</h3>
              <h3>{t("eventActions")}</h3>
            </div>
            <div className="eventsList">
              {events.map((event) => (
                <div key={event.id} className="eventCard">
                  <p>{event.name}</p>
                  <p>{new Date(event.date).toLocaleDateString("esp")}</p>
                  <p>{event.description}</p>
                  <p>
                    <Link to={`/editEvent/${event.id}`}>
                      <button className="eventActionButton">
                        <GoPencil />
                      </button>
                    </Link>
                    <button
                      className="eventActionButton"
                      onClick={() => confirmDeleteEvent(event)}
                    >
                      <CiTrash />
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {events.length == 0 && <p className="noEvents">{t("noEvents")}</p>}
      </div>
    </main>
  );
}
