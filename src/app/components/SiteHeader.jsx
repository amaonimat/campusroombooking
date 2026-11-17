import Link from "next/link";
import Icon from "./Icon";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link aria-label="Campus Rooms home" className="brand" href="/">
          <span className="brand__mark"><Icon name="spark" size={21} /></span>
          <span>campus<span className="brand__accent">rooms</span></span>
        </Link>
        <nav aria-label="Main navigation" className="site-nav">
          <Link href="/">Explore spaces</Link>
          <Link className="nav-bookings" href="/bookings">
            <Icon name="calendar" size={17} /> My bookings
          </Link>
        </nav>
      </div>
    </header>
  );
}
