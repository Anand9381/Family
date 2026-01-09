import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo as link to home */}
      <h1 className="logo">
        <NavLink to="/" className="logo-link">
          My Family 💖
        </NavLink>
      </h1>

      <div className="nav-links">
        <NavLink to="/family">Family Photos</NavLink>
        <NavLink to="/events">Event Photos</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
