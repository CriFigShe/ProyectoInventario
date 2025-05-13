import "./EditEvent.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../context/AuthContext";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [event, setEvent] = useState({
    name: "",
    date: "",
    description: "",
    userId: currentUser.userId
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${id}`, {
          headers: {
            Authorization: `${currentUser.token}`,
          },
        });
        setEvent(response.data.data);
      } catch (error) {
        console.error("Error fetching event para editar: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(event);
      await axios.put(`http://localhost:5000/events/${id}`, event, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/events");
    } catch (error) {
      console.error("Error editando un evento");
    }
  };

  return (
    <div className="editForm">
      <h2>Editar evento: {event.name}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Fecha</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Descripción</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="editEventButton">Guardar cambios</button>
      </form>
    </div>
  );
}
