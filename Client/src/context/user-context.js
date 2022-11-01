import { createContext, useReducer } from "react";

export const Usercontext = createContext();
const defaultState = {
    isLogin: false,
    user: {},
};

function reducer(user, action) {
    const { type, payload } = action;

    switch (type) {
        case "LOGIN":
            return {
                isLogin: true,
                user: payload,
            }
        case "LOGOUT":
            return {
                isLogin: false,
                user: {},
            };
        default:
            throw new Error();
    }
}

export function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
        <Usercontext.Provider value={[state, dispatch]}>
            {children}
        </Usercontext.Provider>
    );
}