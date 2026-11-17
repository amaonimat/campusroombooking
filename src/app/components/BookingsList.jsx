"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBookings, removeBooking } from "../data/browserStorage";
import Icon from "./Icon";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setBookings(getBookings());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Bookings could not be loaded.");
    } finally {
      setLoaded(true);
    }
  }, []);

  function cancelBooking(id) {
    try {
      removeBooking(id);
      setBookings((current) => current.filter((booking) => booking.id !== id));
      setError("");
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Booking could not be cancelled.");
    }
  }

  if (!loaded) return <p className="loading-message">Loading your bookings…</p>;

  return (
    <div className="booking-list">
      {error && <p className="form-error" role="alert">{error}</p>}
      {bookings.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon"><Icon name="calendar" size={27} /></span>
          <h2>No bookings yet</h2>
          <p>When you reserve a room, it will show up here.</p>
          <Link className="primary-button" href="/">Explore rooms <Icon name="arrow" size={17} /></Link>
        </div>
      ) : (
        <ul className="booking-list__items">
          {bookings.map((booking) => (
            <li className="booking-item" key={booking.id}>
              <div className="booking-item__date">
                <Icon name="calendar" size={21} />
                <span>{new Date(`${booking.date}T12:00:00`).toLocaleDateString(undefined, {
                  weekday: "short", month: "short", day: "numeric",
                })}</span>
              </div>
              <div className="booking-item__details">
                <h2>{booking.roomName}</h2>
                <p>{booking.building} · {booking.time} · {booking.partySize} {booking.partySize === 1 ? "person" : "people"}</p>
                <p className="booking-item__name">Reserved for {booking.name}</p>
              </div>
              <button className="secondary-button" onClick={() => cancelBooking(booking.id)} type="button">
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
