import { createContext, useReducer } from "react";

export const Videocontext = createContext();
const defaultState = {
    isConnected: false,
    roomName: {},
};

function reducer(roomName, action) {
    const { type, payload } = action;

    switch (type) {
        case "CONNECT":
            localStorage.setItem("token", payload.data.token)
            return {
                isConnected: true,
                roomName: payload.data.roomName,
            }
        case "DISCONNECT":
            localStorage.removeItem("token")
            return {
                isConnected: false,
                roomName: {},
            };
        default:
            throw new Error();
    }
}

export function VideoContextProvider({ children }) {
    const [videoState, videoDispatch] = useReducer(reducer, defaultState);

    return (
        <Videocontext.Provider value={[videoState, videoDispatch]}>
            {children}
        </Videocontext.Provider>
    );
}