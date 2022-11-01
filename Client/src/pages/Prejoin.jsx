import { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { Usercontext } from "../context/user-context"
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Videocontext } from '../context/video-context';

export default function Prejoin() {
    const Navigate = useNavigate();
    const [state, dispatch] = useContext(Usercontext)
    const [videoState, videoDispatch] = useContext(Videocontext)
    const [name] = useState(state)
    const [forms, setForms] = useState({
        roomName: "",
    })
    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value,
        });
    };
    const Logout = () => {
        dispatch({
            type: 'LOGOUT'
        })
        Navigate('/')
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            // Store data with FormData as object
            const body = forms
            console.log("Room Name : ", body);
            // Insert data
            const response = await API.post("/join-room", body);
            if (response?.status === 200) {
                videoDispatch({
                    type: 'CONNECT',
                    payload: response
                })
                Navigate('/check')
            }
            console.log("Response : ", response.data);
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <>
            <div>
                <form id="room-name-form" onSubmit={(e) => handleSubmit.mutate(e)}>
                    Enter a Room Name to join: <input name="roomName" id="room-name-input" onChange={handleChange} />
                    <button type="submit">Join Room</button>
                </form>
                <div id="video-container"></div>
            </div>
            <p>Hello {name.user}!, Ready to start your meeting today ?</p>
            <button onClick={Logout}>Logout</button>
        </>
    )
}