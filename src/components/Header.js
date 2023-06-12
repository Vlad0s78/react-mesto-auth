import React from "react";
import headerLogo from "../images/header__logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Лого Место" />
    </header>
  );
}
