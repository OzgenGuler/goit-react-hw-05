import { NavLink } from "react-router-dom";
import CSS from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={CSS.navigation}>
      <ul className={CSS.nav_list}>
        <li>
          <NavLink
            to="/"
            className={CSS.nav_link}
            style={({ isActive }) => ({
              color: isActive ? "red" : "black",
              textDecoration: isActive ? "underline" : "none",
              hover: {
                color: "yellow  ",
              },
            })}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={CSS.nav_link}
            style={({ isActive }) => ({
              color: isActive ? "red" : "black",
              textDecoration: isActive ? "underline" : "none",
            })}
          >
            Search Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
