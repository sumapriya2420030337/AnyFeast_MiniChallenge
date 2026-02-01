import { useState } from "react";
import "./Layout.css";
import logo from "../assets/logo-image.jpg"; // 👈 your app logo
const Navbar = () => {
  const menuItems = [
    { label: "Meal Planner", icon: "🍱", active: true },
    { label: "Recipes", icon: "📖" },
    { label: "Grocery List", icon: "🛒" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <nav className="top-navbar">
      <div className="nav-container">
        <div className="logo-box">
<img src={logo} alt="AnyFeast logo" className="logo-img" />          <span className="logo-text">AnyFeast</span>
        </div>

        <div className="nav-links">
          {menuItems.map((item) => (
            <div key={item.label} className={`nav-link-item ${item.active ? "active" : ""}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="nav-upgrade">
          <button className="upgrade-btn-top">✨ Go Pro</button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-content">
      <p>© 2026 AnyFeast AI. Built for Health.</p>
      <div className="footer-links">
        <a href="#privacy">Privacy</a>
        <a href="#support">Support</a>
      </div>
    </div>
  </footer>
);

export default function Layout({ children }) {
  return (
    <div className="app-layout-top">
      <Navbar />
      <div className="main-wrapper-top">
        <div className="page-content-top">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}