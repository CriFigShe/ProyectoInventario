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
    userId: currentUser.userId,
  });

  const [errors, setErrors] = useState({});

  const { t } = useTranslation();

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" || name === "description") {
      if (!value.trim()) {
        error = t("errorRequired");
      } else if (value.trim().length < 3) {
        error = t("errorMinLength", { count: 3 });
      }
    }

    if (name === "date") {
      if (!value) {
        error = t("errorRequired");
      } else {
        const today = new Date();
        today.setHours(0,0,0,0);
        const selectedDate = new Date(value);
        if (selectedDate < today) {
          error = t("errorDatePast");
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!event.name.trim()) {
      newErrors.name = t("errorRequired");
    } else if (event.name.trim().length < 3) {
      newErrors.name = t("errorMinLength", { count: 3 });
    }

    if (!event.date) {
      newErrors.date = t("errorRequired");
    } else {
      const today = new Date();
      today.setHours(0,0,0,0);
      const selectedDate = new Date(event.date);
      if (selectedDate < today) {
        newErrors.date = t("errorDatePast");
      }
    }

    if (!event.description.trim()) {
      newErrors.description = t("errorRequired");
    } else if (event.description.trim().length < 3) {
      newErrors.description = t("errorMinLength", { count: 3 });
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      console.log("Evento a guardar: ", event);
      await axios.post("http://localhost:3000/events", event, {
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
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="formGroup">
          <label>{t('eventDate')}</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="formGroup">
          <label>{t('eventDescription')}</label>
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <button type="submit" className="addEventButton">{t('addEvent')}</button>
      </form>
    </div>
  );
}
