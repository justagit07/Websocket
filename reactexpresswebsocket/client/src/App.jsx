import { useEffect, useState } from 'react'
import  io from 'socket.io-client'
const socket= io.connect("http://localhost:3001")
function App() {

     const [send, setsend]= useState("")
     const [recieve,setrecieve ]= useState()
     const [roomno, setroomno]=useState()
     const handlesubmit=(e)=>
     {
         e.preventDefault()
         socket.emit("send", {send, roomno})
          setsend('')
     }

     const handleroom =()=>
     {
       socket.emit("room",roomno )
     }


      useEffect(()=>
      {
        socket.on("recievemsg", (data)=>
        {
  
            setrecieve(data.send)

        })

      },[socket])

  return (
    <>
    <div>


       <input type="text"  value={roomno} onChange={(e)=>(setroomno(e.target.value))} placeholder='enter the code of room' />
       <button onClick={handleroom}>Join Room</button>
      <h1>Message App</h1>
      <form onSubmit={handlesubmit}>
      <input type="text" value={send}  onChange={(e)=>(setsend(e.target.value))} placeholder='write message' />
      <button  type='submit'>Sends</button>
      </form>

      <div>
           <h2>lastmessage : </h2>
          <p>{recieve}</p>
      </div>
    </div>

    </>
  )
}

export default App
