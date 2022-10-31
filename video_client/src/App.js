import { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from './config/api';

function App() {

const [forms, setForms] = useState({
  roomName:"",
})
const [todo, setTodo] = useState("")

const handleChange = (e) => {
  setForms({
    ...forms,
    [e.target.name]: e.target.value,
  });
};

const handleChangeTodo = (e) => {
  setTodo({
    ...todo,
    [e.target.name]: e.target.value
  })
}

console.log(forms);

const handleSubmitTodo = useMutation(async (e) => {
  try {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type" : "application/json",
      },
    };

    const body = JSON.stringify({title : todo})
    var response = await API.post("/todos", body, config)
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})

const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();

    const config = {
      headers: {
        accept : "aplication/json",
        "Content-type": "application/json",
      },
    };

    // Store data with FormData as object
    const body = forms
    console.log("Room Name : ",body);
    // Insert data
    const response = await API.post("/join-room", body, config);
    console.log("Response : ",response);
  } catch (error) {
    console.log(error);
  }
});

  return (
    <>
    <div>
      <form  id="room-name-form" onSubmit={(e) => handleSubmit.mutate(e)}>
      Enter a Room Name to join: <input name="roomName" id="room-name-input" onChange={handleChange}/>
      <button type="submit">Join Room</button>
      </form>
      <div id="video-container"></div>
    </div>
    <br/>
    <br/>
    <br/>
    <div>
      <form id='todo-name' onSubmit={(e) => handleSubmitTodo.mutate(e)}>
        Enter todo : <input name='' id='' value={forms} onChange={(e) => setForms(e.target.value)}/>
        <button type='submit'>Submit Todo</button>
      </form>
    </div>
    </>
  );
}

export default App;
