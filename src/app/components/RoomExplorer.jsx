"use client";

import { useState, useSyncExternalStore } from "react";
import { buildings, rooms, roomTypes } from "../data/rooms";
import {
  getEmptyListSnapshot,
  getFavoritesSnapshot,
  parseListSnapshot,
  saveFavorites,
  subscribeFavorites,
} from "../data/browserStorage";
import Icon from "./Icon";
import RoomCard from "./RoomCard";

export default function RoomExplorer() {
  const favoriteSnapshot = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    getEmptyListSnapshot,
  );
  const [storageError, setStorageError] = useState("");
  const [query, setQuery] = useState("");
  const [building, setBuilding] = useState("All buildings");
  const [roomType, setRoomType] = useState("All spaces");
  const [minimumCapacity, setMinimumCapacity] = useState("Any size");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("recommended");

  let favorites = [];
  let snapshotError = "";
  try {
    favorites = parseListSnapshot(favoriteSnapshot, "favorite");
  } catch (error) {
    snapshotError = error instanceof Error ? error.message : "Favorites could not be loaded.";
  }

  const visibleRooms = rooms.filter((room) => {
    const searchable = [
      room.name,
      room.building,
      room.type,
      ...room.amenities,
    ].join(" ").toLowerCase();
    const matchesSearch = searchable.includes(query.trim().toLowerCase());
    const matchesBuilding = building === "All buildings" || room.building === building;
    const matchesType = roomType === "All spaces" || room.type === roomType;
    const matchesCapacity =
      minimumCapacity === "Any size" || room.capacity >= Number(minimumCapacity);
    const matchesFavorites = !favoritesOnly || favorites.includes(room.id);
    return matchesSearch && matchesBuilding && matchesType && matchesCapacity && matchesFavorites;
  }).sort((a, b) => {
    if (sortOrder === "capacity") return b.capacity - a.capacity;
    if (sortOrder === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  function toggleFavorite(roomId) {
    const updated = favorites.includes(roomId)
      ? favorites.filter((id) => id !== roomId)
      : [...favorites, roomId];
    try {
      saveFavorites(updated);
      setStorageError("");
    } catch (error) {
      setStorageError(error instanceof Error ? error.message : "Favorite could not be saved.");
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">YOUR CAMPUS, YOUR SPACE</p>
        <h1>A good place to <span>get things done.</span></h1>
        <p className="hero__copy">
          Find your next favorite study spot. Browse cozy corners, quiet rooms,
          and spaces made for big ideas.
        </p>
      </section>
      <section aria-labelledby="rooms-heading" className="room-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MADE FOR YOUR MOMENT</p>
            <h2 id="rooms-heading">Find your space</h2>
          </div>
          <span className="result-count">{visibleRooms.length} spaces</span>
        </div>
        <label className="search-field">
          <Icon name="search" size={19} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search rooms, buildings, or amenities"
            aria-label="Search rooms"
          />
        </label>
        <div aria-label="Filter spaces" className="filter-row">
          <label>
            <span>Building</span>
            <select value={building} onChange={(event) => setBuilding(event.target.value)}>
              {buildings.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Space type</span>
            <select value={roomType} onChange={(event) => setRoomType(event.target.value)}>
              {roomTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Seats</span>
            <select value={minimumCapacity} onChange={(event) => setMinimumCapacity(event.target.value)}>
              <option>Any size</option>
              <option value="2">2+ people</option>
              <option value="4">4+ people</option>
              <option value="6">6+ people</option>
              <option value="8">8+ people</option>
            </select>
          </label>
        </div>
        <button
          aria-pressed={favoritesOnly}
          className={`filter-chip${favoritesOnly ? " is-active" : ""}`}
          onClick={() => setFavoritesOnly((current) => !current)}
          type="button"
        >
          <Icon name="heart" size={16} />
          {favoritesOnly ? "Showing favorites" : "Favorites only"}
        </button>
        {(storageError || snapshotError) && (
          <p className="form-error" role="alert">{storageError || snapshotError}</p>
        )}
        <label className="sort-control">
          <span>Sort by</span>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="capacity">Largest capacity</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
        {visibleRooms.length === 0 ? (
          <div className="empty-state empty-state--results">
            <span className="empty-state__icon"><Icon name="search" size={25} /></span>
            <h2>No spaces match those filters</h2>
            <p>Try a different search or reset your filters to see every room.</p>
            <button
              className="secondary-button"
              onClick={() => {
                setQuery("");
                setBuilding("All buildings");
                setRoomType("All spaces");
                setMinimumCapacity("Any size");
                setFavoritesOnly(false);
                setSortOrder("recommended");
              }}
              type="button"
            >
              Clear all filters
            </button>
          </div>
        ) : <div className="room-grid">
          {visibleRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isFavorite={favorites.includes(room.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>}
      </section>
    </main>
  );
}
