import Link from "next/link";
import Icon from "./Icon";

export default function RoomCard({ room, isFavorite = false, onToggleFavorite }) {
  return (
    <article className="room-card">
      <Link
        className={`room-card__art room-card__art--${room.color}`}
        href={`/rooms/${room.id}`}
        aria-label={`View ${room.name} details`}
      >
        <span className="room-card__type">{room.type}</span>
        <span className="room-card__illustration">
          <Icon name={room.icon} size={48} />
        </span>
        <span className="room-card__floor">{room.floor}</span>
      </Link>
      <div className="room-card__body">
        <div className="room-card__heading">
          <div>
            <p className="eyebrow">{room.building}</p>
            <h3><Link href={`/rooms/${room.id}`}>{room.name}</Link></h3>
          </div>
          <button
            aria-label={`${isFavorite ? "Remove" : "Add"} ${room.name} ${isFavorite ? "from" : "to"} favorites`}
            aria-pressed={isFavorite}
            className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
            onClick={() => onToggleFavorite(room.id)}
            type="button"
          >
            <Icon name="heart" size={19} />
          </button>
        </div>
        <p className="room-card__description">{room.description}</p>
        <div className="room-card__footer">
          <span><Icon name="users" size={16} /> Up to {room.capacity}</span>
          <Link className="text-link" href={`/rooms/${room.id}`}>
            Room details <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
