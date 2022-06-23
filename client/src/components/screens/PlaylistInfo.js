import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./PlaylistInfo.module.css";
import TrackList from "./TrackList";

import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Form } from "react-bootstrap";


function PlaylistInfo({ playlist, handlePlay, tracks, allTracks }) {
    const [show, setShow] = useState(false);

    const handleClose = () => { setPlaylistInfo(createSimplePl(playlist)); setShow(false); }
    const handleShow = () => { setPlaylistInfo(createSimplePl(playlist)); setShow(true); }

    const [playlistInfo, setPlaylistInfo] = useState({});

    let createSimplePl = ()=>{
        let tmp = {...playlist}
        tmp.tracks =  tmp.tracks.map(t=>t.track)
        return tmp

    }

    const handleSubmit = () => {

        let tmp = playlistInfo.tracks.map((t, idx) => {
            return {
                track: t,
                index: idx
            }
        })
        playlistInfo.tracks = tmp;

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playlistInfo),
            mode: "cors"
        };
        fetch("http://localhost:8000/playlists/"+playlistInfo.id+"/", requestOptions)
            .then(response => { window.location.reload(); });
        setPlaylistInfo([]); setShow(false);
    }


    const onInput = (e) => {
        console.log(playlistInfo);
        let tmp = { ...playlistInfo };

        if (e.target.id === "title") {
            tmp.title = e.target.value;
        } else {
            if (tmp.tracks === undefined) tmp.tracks = [];

            if (tmp.tracks.indexOf(e.target.id) > -1) {
                tmp.tracks = tmp.tracks.filter(p => p != e.target.id);
            } else {
                tmp.tracks.push(e.target.id);
            }
        }

        setPlaylistInfo(tmp);
    };

    const validate = () => {
        return !(playlistInfo.title === '' || playlistInfo.title === undefined || playlistInfo.tracks === undefined || playlistInfo.tracks === []);
    }

    return (
        <>
            <div className={"row h-100 " + styles.infoDiv}>
                <div className="col-6 h-25 d-flex align-items-center justify-content-center">
                    <h4>{playlist?.title}</h4>
                </div>
                <div className={"col-6 px-5 h-25 d-flex flex-row-reverse align-items-center"}>
                    <FontAwesomeIcon className="p-3 pencil" hidden={playlist===undefined} onClick={handleShow} icon="fa-solid fa-pencil" />
                </div>
                <div className="col-12 h-75 px-5">
                    <TrackList tracks={tracks} handlePlay={handlePlay}></TrackList>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dark">Edit Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-3 text-dark"><b>Playlist Title</b></div>
                        <div className="col-9">
                            <input id="title" value={playlistInfo.title} onChange={onInput}></input>
                        </div>
                        <div className="col-12 pt-4 text-dark">
                            <b>Choose Tracks in order:</b>
                        </div>
                    </div>
                    <div className="row p-3">
                        <ul className="text-dark col-12 overflow-auto multi-select">
                            {
                                allTracks.map((track, ix) => (
                                    <li key={track.id} onClick={onInput} id={track.id}
                                        className={"p-3 multi-select-item row " + ((playlistInfo.tracks != undefined && playlistInfo.tracks.indexOf(track.id) > -1) ? "active" : "")}>
                                        <div id={track.id} className="col-11">{track.title}</div>
                                        <div id={track.id} className="col-1 ">{playlistInfo.tracks != undefined && playlistInfo.tracks.indexOf(track.id) > -1 ? playlistInfo.tracks.indexOf(track.id) + 1 : ""}</div>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={!validate()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default PlaylistInfo;