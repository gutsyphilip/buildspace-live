import React from 'react'
import Button from '../design-system/Button';
import { styled } from '../styles';
import { PUBLIC_CHAT_ENDPOINT, PUBLIC_CHAT_TOKEN } from '../utils/config';

import { io } from "socket.io-client";

const ChatWidget = () => {
    const [messages, setMessages] = React.useState([])
    // const [connection, setConnection] = React.useState(null)

    const connection = new WebSocket(PUBLIC_CHAT_ENDPOINT); 
    connection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const msg = {
          display_name: data.Sender.Attributes.DisplayName,
          message: data.Content,
          timestamp: data.SendTime
        };
        setMessages((prev) => [...prev, msg]);
    }

    const socket = io(PUBLIC_CHAT_ENDPOINT, {
        reconnectionDelayMax: 10000,
        auth: {
            token: PUBLIC_CHAT_TOKEN
        },
    });

   


    // const initConnection = async (token) => {
    //     console.log('initConnection', PUBLIC_CHAT_ENDPOINT, token)
    //     const connectionInit = new WebSocket(PUBLIC_CHAT_ENDPOINT, token);
    //     console.log('connectionInit' ,connectionInit)

    //     setConnection(connectionInit);
    
    //     connectionInit.onopen = (event) => {
    //       console.info("Connected to the chat room.")
    //         var t = setInterval(function(){
    //             if (connectionInit.readyState != 1) {
    //                 clearInterval(t);
    //                 return;
    //             }
    //             connectionInit.send('{type:"ping"}');
    //         }, 5000);

    //     //   renderConnect();
    //     };
    
    //     connectionInit.onclose = (event) => {
    //       // If the websocket closes, remove the current chat token
    //     //   setChatToken(null);
    //     //   renderDisconnect(event.reason);
    //     };
        
    
    //     connectionInit.onerror = (event) => {
    //       console.error("Chat room websocket error observed:", event);
    //     };
    
    //     // connectionInit.onmessage = (event) => {
    //     //   const data = JSON.parse(event.data);
    //     //   const eventType = data["Type"];
    
    //     //   switch (eventType) {
    //     //     case "EVENT":
    //     //       console.info("Received event:", data);
    //     //       handleEvent(data);
    //     //       break;
    //     //     case "ERROR":
    //     //       console.info("Received error:", data);
    //     //       handleError(data);
    //     //       break;
    //     //     case "MESSAGE":
    //     //       console.info("Received message:", data);
    //     //       const messageType = data.Attributes?.message_type || "MESSAGE";
    //     //       switch (messageType) {
    //     //         case "STICKER":
    //     //           handleSticker(data);
    //     //           break;
    //     //         default:
    //     //           handleMessage(data);
    //     //           break;
    //     //       }
    //     //       break;
    //     //     default:
    //     //       console.error("Unknown message received:", event);
    //     //   }
    //     // };

  
    const isSocketActive = connection?.readyState === 1;
    

    const handleSendMessage = () => {
        const payload = {
            "Action": "SEND_MESSAGE",
            // "RequestId": "OPTIONAL_ID_YOU_CAN_SPECIFY_TO_TRACK_THE_REQUEST",
            "Content": "text message",
            "Attributes": {
              "CustomMetadata": "test metadata"
            }
        }
        connection.send(JSON.stringify(payload));
    }


    React.useEffect(() => {
        connection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const msg = {
              display_name: data.Sender.Attributes.DisplayName,
              message: data.Content,
              timestamp: data.SendTime
            };
            setMessages((prev) => [...prev, msg]);
        }
    }, [])

    React.useEffect(() => {
        if(socket){
            socket.on('connect', () => {
                console.log('connected')
            });
            socket.on('disconnect', () => {
                console.log('disconnected')
            });
            socket.on('message', (data) => {
                console.log('message', data)
            });
        }
    },[socket])
    
  return (
    <StyledChatWidget>
        {messages.map((msg) => {
            return (
                <div key={`${msg.display_name}_${msg.timestamp}`}>
                    <h3>{msg.display_name}</h3>
                    <p>{msg.message}</p>
                </div>
            )
        })
        }
        {isSocketActive && <Button onClick={handleSendMessage} variant="secondary">Send</Button>}
    </StyledChatWidget>
  )
}

export default ChatWidget

const StyledChatWidget = styled('section', {
    backgroundColor: '$fgColor',
})