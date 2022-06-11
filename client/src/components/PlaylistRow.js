import React from "react";
import styles from "./PlaylistRow.module.css";

function PlaylistRow({playlist}) {
  return (
    <div className={"p-4 d-flex flex-column align-items-center justify-content-center "+styles.plRow}>
      <span className={styles.plTitle}>{playlist.title}</span>
      <span className={styles.plCount}>{playlist.tracks.length} Track(s)</span>
    </div>
  );
}

export default PlaylistRow;
