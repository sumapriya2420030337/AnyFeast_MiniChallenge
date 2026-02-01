import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-bg" onClick={() => navigate("/quiz")}>
      <div className="overlay">

        {/* LEFT FEATURE NOTES */}
        <div className="side left">
          <div className="feature-note">
            <span className="icon">🥗</span>
            <span>Personalised Meal Plans</span>
          </div>

          <div className="feature-note">
            <span className="icon">🧠</span>
            <span>AI-powered Suggestions</span>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div className="content">
          <h1>AnyFeast</h1>
          <p className="tagline">
            AI-powered meal planning made simple
          </p>

          <button className="cta">Start My Journey</button>
          <span className="hint">Tap anywhere to continue</span>
        </div>

        {/* RIGHT FEATURE NOTES */}
        <div className="side right">
          <div className="feature-note">
            <span className="icon">🛒</span>
            <span>Smart Ingredient Planning</span>
          </div>

          <div className="feature-note">
            <span className="icon">⏱️</span>
            <span>Saves Time & Effort</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Landing;