import React from "react";
import styles from "./PlaylistRow.module.css";

function PlaylistRow({playlist}) {
  return (
    <div class="d-flex flex-column" className={styles.plRow}>
      <span className={styles.plTitle}>{playlist.title}</span>
      <span className={styles.plCount}>{playlist.tracks.length} Tracks</span>
    </div>
  );
}

export default PlaylistRow;
