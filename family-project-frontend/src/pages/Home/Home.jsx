import { useEffect, useRef, useState } from "react";
import "./Home.css";
import grannyImg from "../../assets/granny.jpg";
import grandmotherImg from "../../assets/grandmother.jpg";
import homeMusic from "../../assets/home-music.mp3";

function Home() {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    play ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
  }, [play]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="home-container">
      {/* Music */}
      <audio ref={audioRef} loop src={homeMusic} />

      {/* Music Button */}
      <button className="music-btn" onClick={() => setPlay(!play)}>
        {play ? "⏸" : "▶"}
      </button>

      {/* Family Images */}
      <div className="family-section">
        <div className="image-card large">
          <img src={grannyImg} alt="Grand Father" />
          <p>Grand Father</p>
        </div>

        <div className="love-symbol">❤️</div>

        <div className="image-card large">
          <img src={grandmotherImg} alt="Grand Mother" />
          <p>Grand Mother</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
