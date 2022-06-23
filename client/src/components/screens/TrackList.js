import TrackRow from "../TrackRow";


function TrackList({tracks, handlePlay}){
    return (
        tracks.map((track, ix) => (
            <TrackRow key={ix} index={ix} track={track} handlePlay={handlePlay} />
          ))
    );
}

export default TrackList;
