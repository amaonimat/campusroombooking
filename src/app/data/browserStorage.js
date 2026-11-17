const BOOKINGS_KEY = "campus-rooms-bookings-v1";
const FAVORITES_KEY = "campus-rooms-favorites-v1";

function readList(key, label) {
  const value = window.localStorage.getItem(key);
  if (value === null) return [];

  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed)) {
    throw new Error(`Saved ${label} data is not in the expected format.`);
  }
  return parsed;
}

export function getBookings() {
  return readList(BOOKINGS_KEY, "booking");
}

export function addBooking(booking) {
  const bookings = getBookings();
  const conflict = bookings.some(
    (item) =>
      item.roomId === booking.roomId &&
      item.date === booking.date &&
      item.time === booking.time,
  );
  if (conflict) {
    throw new Error("You already have this room reserved for that time.");
  }
  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...bookings, booking]));
}

export function removeBooking(bookingId) {
  const bookings = getBookings();
  window.localStorage.setItem(
    BOOKINGS_KEY,
    JSON.stringify(bookings.filter((booking) => booking.id !== bookingId)),
  );
}

export function getFavorites() {
  return readList(FAVORITES_KEY, "favorite");
}

export function saveFavorites(favorites) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
