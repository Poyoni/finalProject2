import React, { useState } from "react";
import "./EventForm.css";

interface EventFormProps {
  goBack: () => void;
}

export interface ITerrorAttackStats {
  eventid: number;
  iyear: number;
  imonth: number;
  iday: number;
  country_txt: string;
  region_txt: string;
  city: string;
  latitude: number;
  longitude: number;
  attacktype1_txt: string;
  targtype1_txt: string;
  target1: string;
  gname: string;
  weaptype1_txt: string;
  nkill?: number;
  nwound?: number;
}

const EventForm: React.FC<EventFormProps> = ({goBack}) => {
  const [formData, setFormData] = useState<ITerrorAttackStats>({
    eventid: 0,
    iyear: 2024,
    imonth: 1,
    iday: 1,
    country_txt: "",
    region_txt: "",
    city: "",
    latitude: 0,
    longitude: 0,
    attacktype1_txt: "",
    targtype1_txt: "",
    target1: "",
    gname: "",
    weaptype1_txt: "",
    nkill: undefined,
    nwound: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "nkill" || name === "nwound" || name === "latitude" || name === "longitude"
          ? parseFloat(value) || undefined
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

  };

  return (
    <form className="filter-container" onSubmit={handleSubmit}>
      {Object.entries(formData).map(([key, value]) => (
        <div className="input-group" key={key}>
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input
            type={typeof value === "number" ? "number" : "text"}
            name={key}
            value={value || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit" className="submit-button">
        Submit
      </button>
      <div>
      <h2>פרטי אירוע</h2>
      <button onClick={goBack}>חזור</button>
    </div>
    </form>

  );
};

export default EventForm;
