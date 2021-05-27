import React, { useState } from "react";
import io from 'socket.io-client';

/** An auth token can contain the live server connection information
 *  This will also spark a kafka producer event for the "presentation" topic
 *  As you would image, consumers will be listening for this event.
 *  Mock authentication for now.
 */
var authToken = {
  live_update_server: {
    endpoint: "http://127.0.0.1:3004",
    session: {
      id: Math.random().toString(),
      user: {
        id: "c324l4jk32ljk4342",
      },
    }
  }
}
var { endpoint, session } = authToken.live_update_server

function App() {
  const [magicNumber, setMagicNumber] = useState(0.00);

  /** Subscribe to the frontend server */
  var socket = io.connect(endpoint);
  socket.emit('join', { session_id: session.id });

  /** Read model updates from front-end server */
  socket.on(
    "live_sessions:magic_number_generated",
    data => {
      console.log('live sessions magic number update: ', data)
      setMagicNumber(data.magic_number);
  });

  return (
    <p>
      Magic Number Generated: {magicNumber}
      <button
        onClick={
          ()=>{

            /** User clicks submit to generate
             *  a new number
             */
            console.log('button click')
            socket.emit(
              "resolver:generate_magic_number",
              session,
            )
        }}
      >
        Generate
      </button>
    </p>
  );
}

export default App;