import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/landing";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Layout> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;