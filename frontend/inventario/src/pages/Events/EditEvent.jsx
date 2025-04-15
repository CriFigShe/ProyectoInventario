import "./EditEvent.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setEvent(response.data.data);
      } catch (error) {
        console.error("Error fetching event para editar: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/events/${id}`, event, {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate("/events");
    } catch (error) {
      console.error("Error editando un evento");
    }
  };

  return (
    <div className="editEventForm">
      <h2>Editar evento: {event.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="formEventGroup">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formEventGroup">
          <label>Fecha</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formEventGroup">
          <label>Descripción</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
