import React from 'react'
import Button from '../design-system/Button';
import { styled } from '../styles';
import { PUBLIC_CHAT_ENDPOINT, PUBLIC_CHAT_TOKEN } from '../utils/config';

const ChatWidget = () => {
    const [messages, setMessages] = React.useState([])
    const [connection, setConnection] = React.useState(null)
    const [chatToken, setChatToken] = React.useState(null)

    // POST req /api/auth to get token
    const fetchChatToken = async () => {
        const res = await fetch("/api/chat/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: "gutsyphilip",
                displayName: "Jonah",
            }),
        });
        const data = await res.json();
        return data;
    }



    const initConnection = async (token) => {
        console.log('initConnection', PUBLIC_CHAT_ENDPOINT, token)
        const connectionInit = new WebSocket(PUBLIC_CHAT_ENDPOINT, token);
        console.log('connectionInit', connectionInit)

        setConnection(connectionInit);

        connectionInit.onopen = (event) => {
            console.info("Connected to the chat room.")
            // var t = setInterval(function () {
            //     if (connectionInit.readyState != 1) {
            //         clearInterval(t);
            //         return;
            //     }
            //     connectionInit.send('{type:"ping"}');
            // }, 5000);

            //   renderConnect();
        };

        connectionInit.onclose = (event) => {
            // If the websocket closes, remove the current chat token
            setChatToken(null);
            //   renderDisconnect(event.reason);
        };


        connectionInit.onerror = (event) => {
            console.error("Chat room websocket error observed:", event);
        };

        connectionInit.onmessage = (event) => {
            console.log("onmessage", event)
            const data = JSON.parse(event.data);
            const msg = {
                display_name: data?.Sender?.Attributes?.DisplayName,
                message: data.Content,
                timestamp: data.SendTime
            };
            setMessages((prev) => [...prev, msg]);
        }
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
    }

    const isSocketActive = () => {
        return connection?.readyState === 1
    };


    const handleSendMessage = () => {
        const payload = {
            "Action": "SEND_MESSAGE",
            // "RequestId": "OPTIONAL_ID_YOU_CAN_SPECIFY_TO_TRACK_THE_REQUEST",
            // Generate random changing message
            "Content": `Hello from builder ${Math.random()}`,
            "Attributes": {
                "DisplayName": "gutsyphilip",
            }
        }
        connection.send(JSON.stringify(payload));
    }


    React.useEffect(() => {
        fetchChatToken().then((data) => {
            setChatToken(data.token);
        })
    }, [])

    React.useEffect(() => {
        if (chatToken) {
            initConnection(chatToken)
        }
    }, [chatToken])

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
            {/* {isSocketActive() ? */}
            {/* : <p style={{ color: '#151515' }}>Connecting to chat...</p> */}
            {/* } */}
            <Button onClick={handleSendMessage}>Send</Button>

        </StyledChatWidget>
    )
}

export default ChatWidget

const StyledChatWidget = styled('section', {
    backgroundColor: '$bgColor',
    padding: '$5',

    '&  *': {
        color: '$textDark',
    }
})