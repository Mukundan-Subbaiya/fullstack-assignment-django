import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackRow from "./components/TrackRow";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [currentScreen, setCurrentScreen] = useState("playlists");

  useEffect(() => {
    fetch("http://localhost:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);
  const handleScreens = (screen) => setCurrentScreen(screen.target.id);;

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <a id="tracks" onClick={handleScreens} className={currentScreen==='tracks'?styles.active:''}>
                Tracks
              </a>
            </li>
            <li>
              <a id="playlists" onClick={handleScreens} className={currentScreen==='playlists'?styles.active:''}>
                Playlists</a>
            </li>
          </ul>
        </nav>
        {currentScreen==="tracks" && tracks.map((track, ix) => (
          <TrackRow key={ix} track={track} handlePlay={handlePlay} />
        ))}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;
