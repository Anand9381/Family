import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import FamilyPhotos from "./pages/FamilyPhotos/FamilyPhotos";
import EventPhotos from "./pages/EventPhotos/EventPhotos";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/family" element={<FamilyPhotos />} />
        <Route path="/events" element={<EventPhotos />} />
      </Routes>
    </>
  );
}

export default App;
