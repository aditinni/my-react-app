import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";
import AboutAuthor from "./pages/AboutAuthor";
import InstagramRedirect from "./component/InstagramRedirect";

function App() {
  return (
    <>
    <InstagramRedirect />
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/about" element={<AboutAuthor />} />
      </Routes>
    </HashRouter>
    </>
  );
}

export default App;