import React from 'react'
import Button from '../design-system/Button';
import Input from '../design-system/Input';
import { styled } from '../styles';
import { PUBLIC_CHAT_ENDPOINT, PUBLIC_CHAT_TOKEN } from '../utils/config';

const ChatWidget = () => {
    const [messages, setMessages] = React.useState([])
    const [connection, setConnection] = React.useState(null)
    const [chatToken, setChatToken] = React.useState(null)
    const [message, setMessage] = React.useState('')

    // POST req /api/auth to get token
    const fetchChatToken = async () => {
        const res = await fetch("/api/chat/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: "gutsyphilip",
                displayName: "gutsyphilip",
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
            const data = JSON.parse(event.data);
            console.log("onmessage", data)

            const msg = {
                userId: data?.Sender?.UserId,
                displayName: data?.Sender?.Attributes?.displayName,
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


    const handleSendMessage = () => {
        if (message) {
            try {
                const payload = {
                    "Action": "SEND_MESSAGE",
                    // "RequestId": "OPTIONAL_ID_YOU_CAN_SPECIFY_TO_TRACK_THE_REQUEST",
                    "Content": message,
                    "Attributes": {
                        "DisplayName": "gutsyphilip",
                    }
                }
                connection.send(JSON.stringify(payload));
            } catch (error) {
                console.error(error);
            }
        }
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
            <StyledChatWidgetHeader>
                <h2 className='ttl'>🦄 Global chat</h2>
            </StyledChatWidgetHeader>

            <StyledMessages>
                {messages.map((msg) => {
                    return (
                        <div key={`${msg.userId}_${msg.timestamp}`}>
                            <h3></h3>
                            <p><b>{msg.userId}:</b>{msg.message}</p>
                        </div>
                    )
                })}
            </StyledMessages>
            <StyledChatWidgetFooter>
                <Input isMultiline value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <Button onClick={handleSendMessage} size="S">Send</Button>
            </StyledChatWidgetFooter>
        </StyledChatWidget>
    )
}

export default ChatWidget

const StyledChatWidget = styled('section', {
    position: 'relative',
    backgroundColor: '$bgColor',
    padding: '$4 $3',
    borderRadius: '$2',

    '&  *': {
        color: '$textDark',
    }
})

const StyledChatWidgetHeader = styled('header', {
    position: 'absolute',
    // top: '$3',
    width: 'calc(100% - ($4 * 2))',
})

const StyledMessages = styled('div', {
    marginTop: '$8',

})

const StyledChatWidgetFooter = styled('footer', {
    position: 'absolute',
    bottom: '$3',
    right: '$3',
    border: '1px solid $borderBgColorDark',
    borderRadius: '$2',
    padding: '$2',
    width: 'calc(100% - ($3 * 2))',
})