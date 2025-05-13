import "./AddEvent.css";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';

export default function AddEvent() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [event, setEvent] = useState({
    name: "",
    date: "",
    description: "",
    userId: currentUser.userId
  });

  const { t } = useTranslation();

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
      <h2>{t('addEvent')}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>{t('eventName')}</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>{t('eventDate')}</label>
          <input type="date" name="date" onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>{t('eventDescription')}</label>
          <textarea name="description" onChange={handleChange} required />
        </div>
        <button type="submit" className="addEventButton">{t('addEvent')}</button>
      </form>
    </div>
  );
}
