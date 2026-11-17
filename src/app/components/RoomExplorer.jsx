"use client";

import { useState } from "react";
import { rooms } from "../data/rooms";
import Icon from "./Icon";
import RoomCard from "./RoomCard";

export default function RoomExplorer() {
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");

  const visibleRooms = rooms.filter((room) => {
    const searchable = [
      room.name,
      room.building,
      room.type,
      ...room.amenities,
    ].join(" ").toLowerCase();
    return searchable.includes(query.trim().toLowerCase());
  });

  function toggleFavorite(roomId) {
    setFavorites((current) =>
      current.includes(roomId)
        ? current.filter((id) => id !== roomId)
        : [...current, roomId],
    );
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
        <div className="room-grid">
          {visibleRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isFavorite={favorites.includes(room.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
