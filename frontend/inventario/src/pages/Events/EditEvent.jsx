import "./EditEvent.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';

export default function EditEvent() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://proyectoinventario.onrender.com/events/${id}`, {
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
      console.log(event);
      await axios.put(`https://proyectoinventario.onrender.com/events/${id}`, event, {
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
      <h2>{t('editEvent')} - {event.name}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label>{t('eventName')}</label>
          <input
            type="text"
            name="name"
            value={event.name}
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
            value={new Date(event.date).toLocaleDateString("en-CA")}
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
            value={event.description}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <button type="submit" className="editEventButton">{t('saveChanges')}</button>
      </form>
    </div>
  );
}
