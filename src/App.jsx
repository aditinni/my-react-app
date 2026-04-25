import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";
import AboutAuthor from './pages/AboutAuthor'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/about" element={<AboutAuthor/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;