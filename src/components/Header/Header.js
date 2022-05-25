import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

function Header(props) {
  let location = useLocation();
  return <header className={`header ${location.pathname === "/" ?"header_theme_dark" : ""}`}>{props.children}</header>;
}
export default Header;
