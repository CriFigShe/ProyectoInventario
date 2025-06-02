import "./Calendar.css";
import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function Calendario() {
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState(new Date());

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!currentUser.token) {
          navigate("/");
        }
        const response = await axios.get(
          `https://proyectoinventario.onrender.com/events/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        console.log(response.data.data);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error recogiendo los eventos", error.message);
      }
    };

    fetchEvents();
  }, [currentUser]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayHasEvent = events.some(
        (event) =>
          new Date(event.date).toDateString() === date.toDateString()
      );
      return dayHasEvent ? <div className="highlight-dot"></div> : null;
    }
  };

  return (
    <div className="contenedorCalendario">
      <Calendar
      className="cal"
        onChange={setValue}
        value={value}
        tileContent={tileContent}
      />
    </div>
  );
}
