import { useState } from 'react';
import { useContext } from "react"
import { Videocontext } from '../context/video-context';
import { Twilio, createLocalVideoTrack, TrackPublication, Participant, Track, connect, createLocalTracks } from 'twilio-video'
import { Usercontext } from '../context/user-context';

export default function Check() {
    const [videoState] = useContext(Videocontext)
    const [state] = useContext(Usercontext)
    const token = localStorage.token
    console.log("Access Token : ", token);
    const [user] = useState(state.user)
    const [roomName] = useState(videoState.roomName)
    console.log(videoState.roomName);
    async function startVideo() {
        const track = await createLocalVideoTrack();
        const box = document.getElementById("box");
        box.append(track.attach());
        console.log("Local Video Track : ", track);
    }

    async function start() {
        const tracks = await createLocalTracks();
        const box = document.getElementById("box");
        const LocalVideoTrack = tracks.find(track => track.kind === 'video');
        box.appendChild(LocalVideoTrack.attach());
    }

    async function room() {
        const tracks = await createLocalTracks({
            audio: true,
            video: { facingMode: 'user'}
        })
        const username = user
        const nameRoom = roomName
        const LocalVideoTrack = tracks.find(track => track.kind === 'video');
        const box = document.getElementById("box");
        const on = document.getElementById("on-btn");
        const name = document.getElementById("name")
        const rooms = document.getElementById("roomName")
        await connect(`${token}`, {
            name: `${roomName}`,
            tracks
        })
        box.appendChild(LocalVideoTrack.attach());
        on.style.visibility = "hidden";
        console.log("Local Tracks : ", tracks);
        console.log("You are connect to room : ", nameRoom);
        console.log("User Name : ", username);
        name.append(document.createTextNode(username))
        rooms.append(document.createTextNode(`You are connected to room : ${nameRoom}`))
    }

    return (
        <>
            <button onClick={start} id="on-btn">Video on</button>
            <div id='box'></div>
            <p id='name'></p>
            <p id='roomName'></p>
            <button onClick={room} id="start" value="connect">Join Room</button>
        </>
    )
}