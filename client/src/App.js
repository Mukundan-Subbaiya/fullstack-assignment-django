import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackList from "./components/screens/TrackList"
import AudioPlayer from "./components/AudioPlayer";
import { MemoryRouter as Router, Route, Link, Routes }
                    from 'react-router-dom';
import PlaylistList from "./components/screens/PlaylistList";
import PlaylistInfo from "./components/screens/PlaylistInfo";

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [currentTrack, setCurrentTrack] = useState();
  const [currentPlayList, setCurrentPlaylist] = useState();
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
  const handlePlaylistSelect = (playlist) => setCurrentPlaylist(playlist);
  const handleScreens = (screen) => setCurrentScreen(screen.target.id);

  const filterTracks = ()=>{
    let tmp = currentPlayList?.tracks?.map(t=>t.track)

    return tracks.filter(t=>tmp?.indexOf(t.id)>-1);
  }

  return (
    <>
      <main className={"container h-100 "+styles.app}>
        <Router>
          <nav>
            <img src={logo} className={styles.logo} alt="Logo" />
            <div className="pt-5 p-2">
              <AudioPlayer trackList={tracks} currIndex={currentTrack} />
            </div>
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
            <Route exact path="/" element={
              <div className="pb-4" style={{height:"500px",overflowY:"auto"}}>
                <TrackList tracks={tracks} handlePlay={handlePlay}></TrackList>
              </div>
            }>  
            </Route>
            <Route path="/playlists"  element={
              <div className="row" style={{height:"70%"}}>
                <div  className="col-7">
                  <PlaylistList handlePlaylistSelect={handlePlaylistSelect} playlists={playlists} tracks={tracks}></PlaylistList>
                </div>
                <div  className="col-5">
                  <PlaylistInfo allTracks={tracks} playlist={currentPlayList} handlePlay={handlePlay} tracks = {filterTracks()}></PlaylistInfo>
                </div>
              </div>
            }> 
            </Route>
          </Routes>
        </Router>
      </main>
      
    </>
  );
}

export default App;
