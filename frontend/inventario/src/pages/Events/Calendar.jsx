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
          `http://localhost:3000/events/users/${currentUser.userId}`,
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

 const formatLocalDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const tileContent = ({ date, view }) => {
  if (view === "month") {
    const localDateStr = formatLocalDate(date);

    const dayHasEvent = events.some((event) => {
      const eventLocalDate = formatLocalDate(new Date(event.date));
      return eventLocalDate === localDateStr;
    });

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
