import "./AddEvent.css";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";

export default function AddEvent() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [event, setEvent] = useState({
    name: "",
    date: "",
    description: "",
    userId: currentUser.userId
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
          Authorization: `${currentUser.token}`,
        },
      });
      navigate("/events");
    } catch (error) {
      console.error("Error añadiendo un evento: ", error);
    }
  };

  return (
    <div className="addForm">
      <h2>Añadir evento</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>Nombre</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>Fecha</label>
          <input type="date" name="date" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>Descripción</label>
          <textarea name="description" onChange={handleChange} required />
        </div>
        <button type="submit" className="addEventButton">Añadir evento</button>
      </form>
    </div>
  );
}
