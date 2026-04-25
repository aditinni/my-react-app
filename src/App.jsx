import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import HomeSkeleton from "./component/HomeSkeleton";
import StorySkeleton from "./component/StorySkeleton";
import AboutAuthor from "./pages/AboutAuthor";
import InstagramRedirect from "./component/InstagramRedirect";

const Home = lazy(() => import("./pages/Home"));
const StoryPage = lazy(() => import("./pages/StoryPage"));

function App() {
  return (
    <>
      <InstagramRedirect />

      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/story/:id"
            element={
              <Suspense fallback={<StorySkeleton />}>
                <StoryPage />
              </Suspense>
            }
          />

          <Route path="/about" element={<AboutAuthor />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;