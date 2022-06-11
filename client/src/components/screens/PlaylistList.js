
import styles from "./PlaylistList.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useState } from "react";

import {Modal,Button, Form} from "react-bootstrap";

import { v4 as uuidv4 } from 'uuid';

import PlaylistRow from "../PlaylistRow"

function PlaylistList({playlists,tracks, handlePlaylistSelect}){
    const [show, setShow] = useState(false);

    const [playlistInfo, setPlaylistInfo] = useState({});

    const handleClose = () => {setPlaylistInfo([]);setShow(false);}
    const handleShow = () => {setPlaylistInfo([]);setShow(true);}

    const handlePLClick = (e)=>{handlePlaylistSelect(playlists.filter(p=>p.id===e.currentTarget.id)[0])}

    const handleSubmit = () => {

        playlistInfo.id = uuidv4();

        let tmp = playlistInfo.tracks.map((t,idx)=>{
            return {
                id: uuidv4(),
                track : t,
                index: idx
            }
        })
        playlistInfo.tracks =tmp;
        console.log(playlistInfo);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playlistInfo),
            mode: "cors"
        };
        fetch("http://localhost:8000/playlists/", requestOptions)
        .then(response => console.log(response.json()));
        setPlaylistInfo([]);setShow(false);
    }


    const onInput = (e)=>{
        let tmp = {...playlistInfo};

        if(e.target.id==="title"){
            tmp.title = e.target.value;
        }else{
            if(tmp.tracks===undefined)tmp.tracks=[];

            if(tmp.tracks.indexOf(e.target.id)>-1){
                tmp.tracks = tmp.tracks.filter(p=>p!=e.target.id);
            }else{
                tmp.tracks.push(e.target.id);
            }
        }
        
        setPlaylistInfo(tmp);
    };
    
    const validate = ()=>{
        return !(playlistInfo.title==='' || playlistInfo.title===undefined || playlistInfo.tracks===undefined || playlistInfo.tracks ===[]); 
    }

    return (
        <>
            <div className="row">
                <div onClick={handleShow}  className={"col-6 col-sm-3 d-flex  align-items-center justify-content-center "+styles.createPlaylist}>
                    <FontAwesomeIcon className="p-4" icon="plus" />
                    <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                        <h5 className="m-0">Create New Playlist</h5>
                    </div>
                </div>
                {
                    playlists.map((playlist, ix) => (
                        <button onClick={handlePLClick} id={playlist.id} className="anti-button col-6 col-sm-3">
                            <PlaylistRow key={ix} playlist={playlist}/>
                        </button>
                    ))
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dark">Make Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-3 text-dark"><b>Playlist Title</b></div>
                        <div className="col-9">
                            <input id="title" onChange={onInput}></input>
                        </div>
                        <div className="col-12 pt-4 text-dark">
                            <b>Choose Tracks in order:</b>
                        </div>
                    </div>
                    <div className="row p-3">
                        <ul className="text-dark col-12 overflow-auto multi-select">
                                {
                                    tracks.map((track, ix) => (
                                        <li key={track.id} onClick={onInput} id={track.id} 
                                        className={"p-3 multi-select-item row "+ ((playlistInfo.tracks!=undefined && playlistInfo.tracks.indexOf(track.id)>-1)?"active":"") }>
                                            <div id={track.id}  className="col-11">{track.title}</div>
                                            <div id={track.id}  className="col-1 ">{playlistInfo.tracks!=undefined && playlistInfo.tracks.indexOf(track.id)>-1? playlistInfo.tracks.indexOf(track.id)+1:""}</div>
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
        
    );
}

export default PlaylistList;