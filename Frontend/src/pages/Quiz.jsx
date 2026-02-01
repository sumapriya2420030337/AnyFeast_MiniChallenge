import { useState, useMemo } from "react";
import "./quiz.css";

/* ---------- INITIAL DATA ---------- */
const COUNTRIES = [
  { label: "India", currency: "INR", icon: "🇮🇳" },
  { label: "United Kingdom", currency: "GBP", icon: "🇬🇧" },
  { label: "United States", currency: "USD", icon: "🇺🇸" },
];

const GENDERS = ["Male", "Female", "Other"];

const DIETS = [
  { label: "Vegetarian", icon: "🥦" },
  { label: "Non-vegetarian", icon: "🍗" },
  { label: "Vegan", icon: "🌱" },
  { label: "Pescatarian", icon: "🐟" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Quiz() {
  /* --- Existing Local States --- */
  const [cuisineList, setCuisineList] = useState(["Indian", "Italian", "Mexican", "Thai", "Korean", "Japanese", "Mediterranean", "American"]);
  const [allergyList, setAllergyList] = useState(["Peanuts", "Tree Nuts", "Dairy", "Eggs", "Soy", "Wheat", "Shellfish", "Fish"]);
  const [goalList, setGoalList] = useState(["Muscle Gain", "Heart Health", "Brain Health", "Hair Fall Control", "Sugar Control", "Better Sleep"]);

  /* --- New States for Added Sections --- */
  const [dob, setDob] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [goalPace, setGoalPace] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [physicalActivities, setPhysicalActivities] = useState([]);
  const [cookingTime, setCookingTime] = useState("");
  const [kitchenSetup, setKitchenSetup] = useState("");
  const [heavyMealTiming, setHeavyMealTiming] = useState("");

  /* --- UI State --- */
  const [showSummary, setShowSummary] = useState(false);

  /* --- Main Form State --- */
  const [unit, setUnit] = useState("metric");
  const [data, setData] = useState({
    country: "",
    gender: "",
    height: "",
    weight: "",
    diet: "",
    cuisines: [],
    allergies: [],
    healthGoals: [],
    cookingFrequency: "",
    cookingDays: {},
    weeklyBudget: 3200,
  });

  const [custom, setCustom] = useState({ cuisine: "", allergy: "", goal: "" });

  /* --- Helpers --- */
  const toggleMulti = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  };

  const toggleActivity = (val) => {
    setPhysicalActivities((prev) => 
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const handleAddNew = (type, stateKey, listSetter, currentList) => {
    const val = custom[type].trim();
    if (!val) return;
    if (!currentList.includes(val)) listSetter([...currentList, val]);
    if (!data[stateKey].includes(val)) toggleMulti(stateKey, val);
    setCustom({ ...custom, [type]: "" });
  };

  const toggleDay = (day) => {
    setData((prev) => {
      const current = prev.cookingDays[day];
      const updated = { ...prev.cookingDays };
      if (!current) updated[day] = "veg";
      else if (current === "veg") updated[day] = "nonveg";
      else delete updated[day];
      return { ...prev, cookingDays: updated };
    });
  };

  /* --- Progress Calculation (Logic Unchanged) --- */
  const TOTAL_FIELDS = 9;
  const progress = useMemo(() => {
    let count = 0;
    if (data.country) count++;
    if (data.gender) count++;
    if (data.height) count++;
    if (data.weight) count++;
    if (data.diet) count++;
    if (data.cuisines.length) count++;
    if (data.allergies.length) count++;
    if (data.healthGoals.length) count++;
    if (data.cookingFrequency) count++;
    return Math.round((count / TOTAL_FIELDS) * 100);
  }, [data]);

  return (
    <div className="quiz-bg">
      <div className="progress-sticky">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        {progress > 0 && <span>{progress}% complete</span>}
      </div>

      <div className="quiz-container">
        {/* Country Section */}
        <section className="fade-in">
          <h2>Select your country</h2>
          <div className="chip-grid center">
            {COUNTRIES.map((c) => (
              <button
                key={c.label}
                className={`chip ${data.country === c.label ? "active" : ""}`}
                onClick={() => setData({ ...data, country: c.label })}
              >
                {c.icon} {c.label}
                <span className="chip-sub">Currency · {c.currency}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 1️⃣ Added: Date of Birth */}
        <section className="fade-in">
          <h2>Date of Birth</h2>
          <input 
            type="date" 
            className="input-field"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </section>

        {/* Gender Section */}
        <section className="fade-in">
          <h2>Select your gender</h2>
          <div className="chip-grid center">
            {GENDERS.map((g) => (
              <button
                key={g}
                className={`chip ${data.gender === g ? "active" : ""}`}
                onClick={() => setData({ ...data, gender: g })}
              >
                {g}
              </button>
            ))}
          </div>
        </section>

        {/* Measurements Section */}
        <section className="fade-in">
          <h2>Your measurements</h2>
          <div className="unit-toggle">
            <button className={unit === "metric" ? "active" : ""} onClick={() => setUnit("metric")}>Metric (cm/kg)</button>
            <button className={unit === "imperial" ? "active" : ""} onClick={() => setUnit("imperial")}>Imperial (ft/lbs)</button>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Height</label>
              <input
                placeholder={unit === "metric" ? "170 cm" : "5.7 ft"}
                value={data.height}
                onChange={(e) => setData({ ...data, height: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Weight</label>
              <input
                placeholder={unit === "metric" ? "70 kg" : "154 lbs"}
                value={data.weight}
                onChange={(e) => setData({ ...data, weight: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* 2️⃣ Added: Primary Fitness Goal */}
        <section className="fade-in">
          <h2>Primary Fitness Goal</h2>
          <div className="option-grid">
            {["Lose Weight", "Maintain Weight", "Gain Weight"].map((goal) => (
              <button
                key={goal}
                className={`option-card ${fitnessGoal === goal ? "active" : ""}`}
                onClick={() => setFitnessGoal(goal)}
              >
                <span className="option-title">{goal}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3️⃣ Added: Target Weight */}
        <section className="fade-in">
          <h2>Target Weight</h2>
          <div className="input-group">
            <input
              type="number"
              placeholder="Target weight in kg"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
            {data.weight && targetWeight && (
                <p className="chip-sub" style={{marginTop: '12px'}}>
                    Goal: {data.weight}kg → {targetWeight}kg
                </p>
            )}
          </div>
        </section>

        {/* 4️⃣ Added: Goal Speed / Pace */}
        <section className="fade-in">
          <h2>Goal Speed / Pace</h2>
          <div className="option-grid">
            {[
              { l: "Slow & steady", s: "0.25 kg/week" },
              { l: "Moderate", s: "0.5 kg/week" },
              { l: "Aggressive", s: "1 kg/week" }
            ].map((p) => (
              <button
                key={p.l}
                className={`option-card ${goalPace === p.l ? "active" : ""}`}
                onClick={() => setGoalPace(p.l)}
              >
                <span className="option-title">{p.l}</span>
                <span className="chip-sub">{p.s}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 5️⃣ Added: Activity Level */}
        <section className="fade-in">
          <h2>Activity Level</h2>
          <div className="option-grid">
            {[
              { l: "Sedentary", s: "little to no exercise" },
              { l: "Light", s: "1–3 days/week" },
              { l: "Moderate", s: "3–5 days/week" },
              { l: "Intense", s: "6–7 days/week" }
            ].map((level) => (
              <button
                key={level.l}
                className={`option-card ${activityLevel === level.l ? "active" : ""}`}
                onClick={() => setActivityLevel(level.l)}
              >
                <span className="option-title">{level.l}</span>
                <span className="chip-sub">{level.s}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 6️⃣ Added: Main Physical Activities */}
        <section className="fade-in">
          <h2>Main Physical Activities</h2>
          <div className="chip-grid">
            {["Walking", "Running", "Yoga", "Weight Training", "Cycling", "Swimming", "Dancing", "Other"].map((act) => (
              <button
                key={act}
                className={`chip ${physicalActivities.includes(act) ? "active" : ""}`}
                onClick={() => toggleActivity(act)}
              >
                {act}
              </button>
            ))}
          </div>
        </section>

        {/* Diet preference Section */}
        <section className="fade-in">
          <h2>Diet preference</h2>
          <div className="option-grid">
            {DIETS.map((d) => (
              <button
                key={d.label}
                className={`option-card ${data.diet === d.label ? "active" : ""}`}
                onClick={() => setData({ ...data, diet: d.label })}
              >
                <span className="option-icon">{d.icon}</span>
                <span className="option-title">{d.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Cuisines Section */}
        <section className="fade-in">
          <h2>Preferred cuisines</h2>
          <div className="chip-grid">
            {cuisineList.map((c) => (
              <button
                key={c}
                className={`chip ${data.cuisines.includes(c) ? "active" : ""}`}
                onClick={() => toggleMulti("cuisines", c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="add-row">
            <input
              placeholder="Add cuisine"
              value={custom.cuisine}
              onChange={(e) => setCustom({ ...custom, cuisine: e.target.value })}
            />
            <button onClick={() => handleAddNew("cuisine", "cuisines", setCuisineList, cuisineList)}>Add</button>
          </div>
        </section>

        {/* Allergies Section */}
        <section className="fade-in">
          <h2>Allergies</h2>
          <div className="chip-grid">
            {allergyList.map((a) => (
              <button
                key={a}
                className={`chip ${data.allergies.includes(a) ? "active" : ""}`}
                onClick={() => toggleMulti("allergies", a)}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="add-row">
            <input
              placeholder="Add allergy"
              value={custom.allergy}
              onChange={(e) => setCustom({ ...custom, allergy: e.target.value })}
            />
            <button onClick={() => handleAddNew("allergy", "allergies", setAllergyList, allergyList)}>Add</button>
          </div>
        </section>

        {/* Additional health goals Section */}
        <section className="fade-in">
          <h2>Additional health goals</h2>
          <div className="chip-grid">
            {goalList.map((g) => (
              <button
                key={g}
                className={`chip ${data.healthGoals.includes(g) ? "active" : ""}`}
                onClick={() => toggleMulti("healthGoals", g)}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="add-row">
            <input
              placeholder="Add goal"
              value={custom.goal}
              onChange={(e) => setCustom({ ...custom, goal: e.target.value })}
            />
            <button onClick={() => handleAddNew("goal", "healthGoals", setGoalList, goalList)}>Add</button>
          </div>
        </section>

        {/* 7️⃣ Added: Cooking Time Availability */}
        <section className="fade-in">
          <h2>Cooking Time Availability</h2>
          <div className="option-grid">
            {["15–30 mins", "45–60 mins", "I love to cook"].map((t) => (
              <button
                key={t}
                className={`option-card ${cookingTime === t ? "active" : ""}`}
                onClick={() => setCookingTime(t)}
              >
                <span className="option-title">{t}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Cooking frequency Section */}
        <section className="fade-in">
          <h2>Cooking frequency</h2>
          <div className="chip-grid">
            {["Daily (3 meals/day)", "Daily (1 meal/day)", "5 times a week", "3 times a week", "2 times a week", "Once a week"].map((f) => (
              <button
                key={f}
                className={`chip ${data.cookingFrequency === f ? "active" : ""}`}
                onClick={() => setData({ ...data, cookingFrequency: f })}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="instruction-box">
            💡 <strong>Tip:</strong> Click a day once for <span className="text-veg">Veg</span>, twice for <span className="text-nonveg">Non-Veg</span>.
          </div>
          
          <div className="days-grid-modern">
            {DAYS.map((d) => (
              <button
                key={d}
                className={`day-card ${data.cookingDays[d] || ""}`}
                onClick={() => toggleDay(d)}
              >
                <span className="day-name">{d}</span>
                <span className="day-status">{data.cookingDays[d] === 'veg' ? 'Veg' : data.cookingDays[d] === 'nonveg' ? 'N-Veg' : ''}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 8️⃣ Added: Kitchen Setup */}
        <section className="fade-in">
          <h2>Kitchen Setup</h2>
          <div className="option-grid">
            {["Air Fryer", "Rice Cooker", "Full Kitchen"].map((k) => (
              <button
                key={k}
                className={`option-card ${kitchenSetup === k ? "active" : ""}`}
                onClick={() => setKitchenSetup(k)}
              >
                <span className="option-title">{k}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 9️⃣ Added: Preferred Heavy Meal Timing */}
        <section className="fade-in">
          <h2>Preferred Heavy Meal Timing</h2>
          <div className="chip-grid center">
            {["Breakfast", "Lunch", "Dinner"].map((timing) => (
              <button
                key={timing}
                className={`chip ${heavyMealTiming === timing ? "active" : ""}`}
                onClick={() => setHeavyMealTiming(timing)}
              >
                {timing}
              </button>
            ))}
          </div>
        </section>

        {/* Weekly budget Section */}
        <section className="fade-in">
          <h2>Weekly budget</h2>
          <div className="budget-slider-container">
            <input
              type="range"
              className="budget-slider"
              min="500"
              max="5000"
              step="100"
              value={data.weeklyBudget}
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  ((data.weeklyBudget - 500) / (5000 - 500)) * 100
                }%, #e2e8f0 ${
                  ((data.weeklyBudget - 500) / (5000 - 500)) * 100
                }%, #e2e8f0 100%)`,
              }}
              onChange={(e) => setData({ ...data, weeklyBudget: e.target.value })}
            />
            <div className="budget-display">
              <span>Weekly budget:</span>
              <strong>₹{data.weeklyBudget}</strong>
            </div>
          </div>
        </section>

        <div className="cta-wrap">
          <button className="primary" onClick={() => setShowSummary(true)}>Create my plan</button>
        </div>

      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-icon">🏆</span>
            <h3>100% Complete!</h3>
            <p>Your personalized meal plan is ready to be generated.</p>
            <div className="summary-details">
                <div className="s-pill">Diet: {data.diet || 'Any'}</div>
                <div className="s-pill">Budget: ₹{data.weeklyBudget}</div>
            </div>
            <button className="modal-btn" onClick={() => setShowSummary(false)}>Finish Setup</button>
          </div>
        </div>
      )}
    </div>
  );
}