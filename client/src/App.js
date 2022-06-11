import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackList from "./components/screens/TrackList"
import AudioPlayer from "./components/AudioPlayer";
import { MemoryRouter as Router, Route, Link, Routes }
                    from 'react-router-dom';
import PlaylistList from "./components/screens/PlaylistList";

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [currentTrack, setCurrentTrack] = useState();
  const [currentScreen, setCurrentScreen] = useState("tracks");

  useEffect(() => {
    fetch("http://localhost:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);
  const handleScreens = (screen) => setCurrentScreen(screen.target.id);;

  return (
    <>
      <main className={styles.app}>
        <Router>
          <nav>
            <img src={logo} className={styles.logo} alt="Logo" />
            <ul className={styles.menu}>
              <li>
                <Link to="/" id="tracks" onClick={handleScreens} className={currentScreen==='tracks'?styles.active:''}>
                  Tracks
                </Link>
              </li>
              <li>
                <Link to="/playlists" id="playlists" onClick={handleScreens} className={currentScreen==='playlists'?styles.active:''}>
                  Playlists
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={<TrackList tracks={tracks} handlePlay={handlePlay}></TrackList>}>  
            </Route>
            <Route path="/playlists"  element={<PlaylistList playlists={playlists} tracks={tracks}></PlaylistList>}> 
            </Route>
          </Routes>
        </Router>
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;
