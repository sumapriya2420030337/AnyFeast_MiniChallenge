# AnyFeast AI: Onboarding UX Redesign 🍲✨

This project is a high-fidelity redesign of the **AnyFeast AI** meal-planning onboarding flow. The goal was to transform a standard data-entry process into an aesthetic, immersive "SaaS" experience that reduces user drop-off and increases brand trust.



## 🚀 Key Improvements

### 1. Spatial & Visual Architecture
* **Fatter Breadth:** Expanded the container to **1100px** to move away from a "document" feel. This wider layout mimics a professional dashboard, providing a more expansive user experience.
* **Aesthetic Mesh Background:** Replaced flat backgrounds with a dynamic, multi-layered radial gradient. This creates a premium "Design-Heavy" atmosphere.
* **Glassmorphism:** Utilized `backdrop-filter: blur` on section cards to create a frosted-glass effect, allowing the mesh background to bleed through while maintaining high readability.

### 2. Enhanced Tactile UX (Fitts’s Law)
* **Scalable Interactive Elements:** Significantly enlarged Chips, Option Cards, and Inputs. Larger touch targets lead to faster completion times and less user frustration.
* **Chunky Action Rows:** Redesigned the "Add Custom" logic. The custom input and its corresponding action button now sit on the same visual hierarchy as pre-set options, empowering user personalization.

### 3. Frictionless Logic & Feedback
* **3-State Day Toggles:** Implemented logic allowing users to cycle through "Off ➔ Veg ➔ Non-Veg" statuses with single clicks, removing the need for clunky dropdowns.
* **Dopamine Progress Loops:** A sticky, blurred progress bar provides real-time visual feedback. The use of `cubic-bezier` transitions makes the progress feel smooth and "alive."
* **New Personalization Layers:** Added 9 critical data points (DOB, Activity Level, Fitness Goals, Kitchen Setup, etc.) seamlessly into the flow without cluttering the UI.

## 🛠️ Technical Stack
* **React.js** (Functional Components & Hooks)
* **CSS3** (Custom Properties, Flexbox, Mesh Gradients, Glassmorphism)
* **React Memo/UseMemo** (Performance optimization for progress calculation)

## 📁 Project Structure
- `Quiz.jsx`: Core logic, state management, and the 15+ onboarding sections.
- `quiz.css`: Aesthetic styles, animations, and the wide-breadth layout grid.
- `Layout.jsx`: The top-nav application shell.
- `Layout.css`: The global mesh gradient and sticky navigation styles.

---
*Developed as part of the AnyFeast Innovation Assessment.*
