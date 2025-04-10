import "./AddEvent.css";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function AddEvent() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [event, setEvent] = useState({
    name: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/events", event, {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate("/events");
    } catch (error) {
      console.error("Error añadiendo un evento: ", error);
    }
  };

  return (
    <div className="addEventForm">
      <h2>Añadir evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="formEventGroup">
          <label>Nombre</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="formEventGroup">
          <label>Fecha</label>
          <input type="date" name="date" onChange={handleChange} required />
        </div>
        <div className="formEventGroup">
          <label>Descripción</label>
          <textarea name="description" onChange={handleChange} required />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
