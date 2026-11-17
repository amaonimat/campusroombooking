"use client";

import Link from "next/link";
import { useState } from "react";
import { addBooking } from "../data/browserStorage";
import Icon from "./Icon";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00",
];

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingForm({ room }) {
  const today = localDateString(new Date());
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const date = String(formData.get("date"));
    if (date < today) {
      setMessage("Choose today or a future date for your booking.");
      return;
    }

    try {
      addBooking({
        id: crypto.randomUUID(),
        roomId: room.id,
        roomName: room.name,
        building: room.building,
        date,
        time: String(formData.get("time")),
        partySize: Number(formData.get("partySize")),
        name: String(formData.get("name")).trim(),
        email: String(formData.get("email")).trim(),
        status: "confirmed",
      });
      setMessage("");
      setSaved(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Your booking could not be saved.");
    }
  }

  if (saved) {
    return (
      <div className="booking-success" role="status">
        <Icon name="check" size={22} />
        <div>
          <strong>Your room is reserved.</strong>
          <p>We saved your booking on this device.</p>
          <Link className="text-link" href="/bookings">View my bookings <Icon name="arrow" size={16} /></Link>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Reserve this room</h2>
      <p className="form-note">Choose a one-hour time slot. Reservations are saved in this browser.</p>
      <label>
        <span>Your name</span>
        <input autoComplete="name" name="name" required maxLength={80} />
      </label>
      <label>
        <span>Email address</span>
        <input autoComplete="email" name="email" type="email" required maxLength={254} />
      </label>
      <div className="form-row">
        <label>
          <span>Date</span>
          <input name="date" type="date" min={today} defaultValue={today} required />
        </label>
        <label>
          <span>Start time</span>
          <select name="time" defaultValue="09:00">
            {timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
          </select>
        </label>
      </div>
      <label>
        <span>People</span>
        <select name="partySize" defaultValue="1">
          {Array.from({ length: room.capacity }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>{count} {count === 1 ? "person" : "people"}</option>
          ))}
        </select>
      </label>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button className="primary-button" type="submit">
        Confirm booking <Icon name="arrow" size={17} />
      </button>
    </form>
  );
}
