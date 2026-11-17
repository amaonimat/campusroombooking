import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "../../components/Icon";
import { rooms } from "../../data/rooms";

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const room = rooms.find((item) => item.id === id);
  return room
    ? { title: room.name, description: room.description }
    : { title: "Room not found" };
}

export default async function RoomPage({ params }) {
  const { id } = await params;
  const room = rooms.find((item) => item.id === id);

  if (!room) notFound();

  return (
    <main className="page-shell detail-shell">
      <Link className="back-link" href="/">
        <span aria-hidden="true">←</span> All spaces
      </Link>
      <div className={`detail-art room-card__art--${room.color}`}>
        <span className="room-card__type">{room.type}</span>
        <Icon name={room.icon} size={72} />
        <span>{room.building} · {room.floor}</span>
      </div>
      <section className="detail-content">
        <p className="eyebrow">{room.building} · {room.floor}</p>
        <h1>{room.name}</h1>
        <p className="detail-description">{room.description}</p>
        <div className="detail-facts">
          <span><Icon name="users" /> Seats up to {room.capacity}</span>
          <span><Icon name="location" /> {room.building}</span>
        </div>
        <h2>Room amenities</h2>
        <ul className="amenity-list">
          {room.amenities.map((amenity) => (
            <li key={amenity}><Icon name="check" size={17} /> {amenity}</li>
          ))}
        </ul>
        <div className="booking-placeholder">
          <Icon name="calendar" />
          <div>
            <strong>Make it your study spot</strong>
            <p>Booking options are coming right up.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
