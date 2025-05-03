import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addGuide } from "../store/guidesSlice";
import { Guide } from "../interfaces/Guide";

const GuideForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const existingGuides = useSelector((state: RootState) => state.guides.guides);

  const [formData, setFormData] = useState({
    trackingNumber: "",
    origin: "",
    destination: "",
    recipient: "",
    creationDate: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { trackingNumber, origin, destination, recipient, creationDate } = formData;

    if (
      !trackingNumber.trim() ||
      !origin.trim() ||
      !destination.trim() ||
      !recipient.trim() ||
      !creationDate.trim()
    ) {
      setError("Por favor completa todos los campos sin dejar espacios vacíos.");
      return;
    }

    const exists = existingGuides.some(
      g => g.id.trim().toLowerCase() === trackingNumber.trim().toLowerCase()
    );

    if (exists) {
      setError("El número de guía ya existe.");
      return;
    }

    const newGuide: Guide = {
      id: trackingNumber.trim(),
      origin: origin.trim(),
      destination: destination.trim(),
      recipient: recipient.trim(),
      creationDate: creationDate.trim(),
      status: "Pendiente",
      lastUpdate: creationDate.trim(),
      history: [],
    };

    dispatch(addGuide(newGuide));

    setFormData({
      trackingNumber: "",
      origin: "",
      destination: "",
      recipient: "",
      creationDate: "",
    });

    setError(null);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Registrar Nueva Guía</h2>

      {error && <p className="form__error" role="alert">{error}</p>}

      <div className="form__group">
        <label htmlFor="trackingNumber">Número de guía</label>
        <input
          id="trackingNumber"
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
          placeholder="Número de guía"
        />
      </div>

      <div className="form__group">
        <label htmlFor="origin">Origen</label>
        <input
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="Origen"
        />
      </div>

      <div className="form__group">
        <label htmlFor="destination">Destino</label>
        <input
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destino"
        />
      </div>

      <div className="form__group">
        <label htmlFor="recipient">Destinatario</label>
        <input
          id="recipient"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          placeholder="Destinatario"
        />
      </div>

      <div className="form__group">
        <label htmlFor="creationDate">Fecha de registro</label>
        <input
          type="date"
          id="creationDate"
          name="creationDate"
          value={formData.creationDate}
          onChange={handleChange}
        />
      </div>

      <div className="form__actions">
        <button type="submit" className="form__button">
          Registrar
        </button>
      </div>
    </form>
  );
};

export default GuideForm;
