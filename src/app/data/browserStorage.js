const BOOKINGS_KEY = "campus-rooms-bookings-v1";
const FAVORITES_KEY = "campus-rooms-favorites-v1";
const BOOKINGS_CHANGE = `${BOOKINGS_KEY}:change`;
const FAVORITES_CHANGE = `${FAVORITES_KEY}:change`;

function getSnapshot(key) {
  try {
    return window.localStorage.getItem(key) ?? "[]";
  } catch (error) {
    return JSON.stringify({
      storageError: error instanceof Error ? error.message : "Browser storage is unavailable.",
    });
  }
}

function subscribe(key, eventName, listener) {
  const handleStorage = (event) => {
    if (event.key === key || event.key === null) listener();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(eventName, listener);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(eventName, listener);
  };
}

function notify(eventName) {
  window.dispatchEvent(new Event(eventName));
}

export function getBookingsSnapshot() {
  return getSnapshot(BOOKINGS_KEY);
}

export function getFavoritesSnapshot() {
  return getSnapshot(FAVORITES_KEY);
}

export function getEmptyListSnapshot() {
  return "[]";
}

export function subscribeBookings(listener) {
  return subscribe(BOOKINGS_KEY, BOOKINGS_CHANGE, listener);
}

export function subscribeFavorites(listener) {
  return subscribe(FAVORITES_KEY, FAVORITES_CHANGE, listener);
}

export function parseListSnapshot(snapshot, label) {
  const parsed = JSON.parse(snapshot);
  if (parsed && !Array.isArray(parsed) && parsed.storageError) {
    throw new Error(parsed.storageError);
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`Saved ${label} data is not in the expected format.`);
  }
  return parsed;
}

function readList(key, label) {
  const value = window.localStorage.getItem(key);
  if (value === null) return [];

  return parseListSnapshot(value, label);
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
  notify(BOOKINGS_CHANGE);
}

export function removeBooking(bookingId) {
  const bookings = getBookings();
  window.localStorage.setItem(
    BOOKINGS_KEY,
    JSON.stringify(bookings.filter((booking) => booking.id !== bookingId)),
  );
  notify(BOOKINGS_CHANGE);
}

export function getFavorites() {
  return readList(FAVORITES_KEY, "favorite");
}

export function saveFavorites(favorites) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  notify(FAVORITES_CHANGE);
}
