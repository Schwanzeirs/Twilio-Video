import { Usercontext } from "../context/user-context"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const Navigate = useNavigate();
    const [state, dispatch] = useContext(Usercontext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value
        dispatch({
            type: 'LOGIN',
            payload: username
        })
        Navigate('/prejoin')
        console.log(state);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                Input your name : <input type="text" placeholder="Username" name="username" id="username" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}