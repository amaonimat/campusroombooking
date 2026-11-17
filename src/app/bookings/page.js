import BookingsList from "../components/BookingsList";

export const metadata = {
  title: "My bookings",
  description: "Review and manage your campus room reservations.",
};

export default function BookingsPage() {
  return (
    <main className="page-shell bookings-shell">
      <p className="eyebrow">YOUR STUDY PLANS</p>
      <h1>My bookings</h1>
      <p className="page-intro">All the spaces you have reserved, in one place.</p>
      <BookingsList />
    </main>
  );
}
