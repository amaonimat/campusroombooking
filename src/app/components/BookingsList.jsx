"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  getBookingsSnapshot,
  getEmptyListSnapshot,
  parseListSnapshot,
  removeBooking,
  subscribeBookings,
} from "../data/browserStorage";
import Icon from "./Icon";

export default function BookingsList() {
  const bookingSnapshot = useSyncExternalStore(
    subscribeBookings,
    getBookingsSnapshot,
    getEmptyListSnapshot,
  );
  const [error, setError] = useState("");
  let bookings = [];
  let loadError = "";
  try {
    bookings = parseListSnapshot(bookingSnapshot, "booking");
  } catch (snapshotError) {
    loadError = snapshotError instanceof Error
      ? snapshotError.message
      : "Bookings could not be loaded.";
  }

  function cancelBooking(id) {
    const booking = bookings.find((item) => item.id === id);
    if (!booking || !window.confirm(`Cancel your booking for ${booking.roomName}?`)) {
      return;
    }

    try {
      removeBooking(id);
      setError("");
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Booking could not be cancelled.");
    }
  }

  return (
    <div className="booking-list">
      {(error || loadError) && (
        <p className="form-error" role="alert">{error || loadError}</p>
      )}
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
