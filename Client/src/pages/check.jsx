import { useState } from 'react';
import { useContext } from "react"
import { Videocontext } from '../context/video-context';
import { Twilio, createLocalVideoTrack, TrackPublication, Participant, Track, } from 'twilio-video'
import { Usercontext } from '../context/user-context';

export default function Check() {
    const [videoState, videoDispatch] = useContext(Videocontext)
    const [state, dispatch] = useContext(Usercontext)
    const [name] = useState(state)
    console.log(videoState.roomName);
    async function startVideo() {
        const track = await createLocalVideoTrack();
        const box = document.getElementById("box");
        box.append(track.attach());
        console.log("Local Video Track : ", track);
    }
    const startRoom = async (event) => {
        event.preventDefault();
        const { token } = localStorage.token
        const { roomName } = videoState.roomName
        const room = await joinVideoRoom(roomName, token);
        console.log("Authentication token : ", token);
        handleConnectedParticipant(room.localParticipant)
        room.participants.forEach(handleConnectedParticipant);
        console.log("Audio track : ", room.localParticipant.audioTracks);
        console.log("Video track : ", room.localParticipant.videoTracks);
        room.on("participantConnected", handleConnectedParticipant);
        // handle cleanup when a participant disconnects
        room.on("participantDisconnected", handleDisconnectedParticipant);
        window.addEventListener("pagehide", () => room.disconnect());
        window.addEventListener("beforeunload", () => room.disconnect());
    }
    const joinVideoRoom = async (roomName, token) => {
        const room = await Twilio.Video.connect(token, {
            room: roomName
        });
        return room;
    }
    const handleConnectedParticipant = (Participant) => {
        const participantDiv = document.createElement("div");
        participantDiv.setAttribute("id", Participant.identity);
        console.log("Participant DIV : ", participantDiv);
        const user = document.createElement("p");
        user.append(document.createTextNode(name))
        const container = document.getElementById("video-container")
        container.appendChild(participantDiv);
        container.append(user)

        console.log("participant: ", Participant);
        Participant.tracks.forEach((TrackPublication) => {
            console.log("trackPublication: ", TrackPublication);
            handleTrackPublication(TrackPublication, Participant);
        });

        // listen for any new track publications
        Participant.on("trackPublished", handleTrackPublication);
    }

    const handleDisconnectedParticipant = (Participant) => {
        Participant.removeAllListeners();
        const participantDiv = document.getElementById(Participant.identity);
        participantDiv.remove();
    }

    const handleTrackPublication = (TrackPublication, Participant) => {
        function displayTrack(Track) {
            const participantDiv = document.getElementById(Participant.identity);
            participantDiv.append(Track.attach());
        }
        if (TrackPublication.Track) {
            displayTrack(TrackPublication.Track)
        }

        TrackPublication.on("subscribed", displayTrack)
    }

    return (
        <>
            <button onClick={startVideo}>Video on</button>
            <div id='box'></div>
            <button onClick={startRoom}>Join Room</button>
            <div className='videos'>
                <div id='video-container'></div>
                <p id='name'></p>
            </div>
        </>
    )
}