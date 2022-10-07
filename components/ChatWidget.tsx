import React from 'react'
import Button from '../design-system/Button';
import { styled } from '../styles';
import { PUBLIC_CHAT_ENDPOINT, PUBLIC_CHAT_TOKEN } from '../utils/config';

const ChatWidget = () => {
    const [messages, setMessages] = React.useState([])
    const [connection, setConnection] = React.useState(null)

    const initConnection = async (token) => {
        const connectionInit = new WebSocket(PUBLIC_CHAT_ENDPOINT, token);
        setConnection(connectionInit);
    
        connectionInit.onopen = (event) => {
          console.info("Connected to the chat room.")
            var t = setInterval(function(){
                if (connectionInit.readyState != 1) {
                    clearInterval(t);
                    return;
                }
                connectionInit.send('{type:"ping"}');
            }, 5000);

        //   renderConnect();
        };
    
        connectionInit.onclose = (event) => {
          // If the websocket closes, remove the current chat token
        //   setChatToken(null);
        //   renderDisconnect(event.reason);
        };
    
        connectionInit.onerror = (event) => {
          console.error("Chat room websocket error observed:", event);
        };
    
        // connectionInit.onmessage = (event) => {
        //   const data = JSON.parse(event.data);
        //   const eventType = data["Type"];
    
        //   switch (eventType) {
        //     case "EVENT":
        //       console.info("Received event:", data);
        //       handleEvent(data);
        //       break;
        //     case "ERROR":
        //       console.info("Received error:", data);
        //       handleError(data);
        //       break;
        //     case "MESSAGE":
        //       console.info("Received message:", data);
        //       const messageType = data.Attributes?.message_type || "MESSAGE";
        //       switch (messageType) {
        //         case "STICKER":
        //           handleSticker(data);
        //           break;
        //         default:
        //           handleMessage(data);
        //           break;
        //       }
        //       break;
        //     default:
        //       console.error("Unknown message received:", event);
        //   }
        // };

        connectionInit.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const msg = {
              display_name: data.Sender.Attributes.DisplayName,
              message: data.Content,
              timestamp: data.SendTime
            };
            setMessages((prev) => [...prev, msg]);
        }
    };

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
       initConnection(PUBLIC_CHAT_TOKEN)
    }, [])
    
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
        <Button onClick={handleSendMessage} variant="secondary">Send</Button>
    </StyledChatWidget>
  )
}

export default ChatWidget

const StyledChatWidget = styled('section', {
    backgroundColor: '$fgColor',
})