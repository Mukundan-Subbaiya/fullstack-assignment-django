import styles from "./PlaylistInfo.module.css";
import TrackList from "./TrackList";

function PlaylistInfo({playlist,handlePlay,tracks}){
    return (playlist!=undefined && 
        <div className={"row h-100 "+styles.infoDiv}>
            <div className="col-12 h-25 d-flex align-items-center justify-content-center">
                <h4>{playlist.title}</h4>
            </div>
            <div className="col-12 h-75 px-5">
                <TrackList tracks={tracks} handlePlay={handlePlay}></TrackList>
            </div>
        </div>
    )
}

export default PlaylistInfo;