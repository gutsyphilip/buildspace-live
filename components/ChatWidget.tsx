import React from 'react'
import Button from '../design-system/Button';
import Input from '../design-system/Input';
import { styled } from '../styles';
import { PUBLIC_CHAT_ENDPOINT } from '../utils/config';
import SetDisplayName from './SetDisplayName';

import uuid4 from "uuid4";

interface ChatWidgetStateParams {
    messages: any[],
    connection: any,
    chatToken: string | null,
    message: string,
}

const ChatWidget = () => {
    const initialState: ChatWidgetStateParams = {
        messages: [],
        connection: null,
        chatToken: null,
        message: '',
    }
    const [state, setState] = React.useState(initialState);

    const handleStateUpdate = async (payload: Partial<ChatWidgetStateParams>) => {
        await setState({ ...state, ...payload })
    }

    const fetchChatToken = async ({ displayName, userId }) => {
        const res = await fetch("/api/chat/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                displayName
            }),
        });
        const data = await res.json();
        return data;
    }



    const initConnection = async (token) => {
        console.log('initConnection', PUBLIC_CHAT_ENDPOINT, token)
        const connectionInit = new WebSocket(PUBLIC_CHAT_ENDPOINT, token);
        console.log('connectionInit', connectionInit)

        handleStateUpdate({ connection: connectionInit });

        connectionInit.onopen = (event) => {
            console.info("Connected to the chat room.")
        };

        connectionInit.onclose = (event) => {
            handleStateUpdate({ chatToken: null })
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
            handleStateUpdate({ messages: [...state.messages, msg] });
        }
    }


    const handleSendMessage = async () => {
        if (state.message) {
            try {
                const payload = {
                    "Action": "SEND_MESSAGE",
                    "Content": state.message,
                }
                await state.connection.send(JSON.stringify(payload));
                handleStateUpdate({ message: '' });
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleSetDisplayName = async (displayName: string) => {
        const userId = await uuid4()
        await fetchChatToken({ displayName, userId }).then((data) => {
            handleStateUpdate({ chatToken: data.token })
        })
    }



    React.useEffect(() => {
        if (state.chatToken) {
            initConnection(state.chatToken)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.chatToken])

    return (
        <StyledChatWidget>
            <StyledChatWidgetHeader>
                <h2 className='ttl'>🦄 Global chat</h2>
            </StyledChatWidgetHeader>

            <MessagesList>
                {state.messages.map((msg) => {
                    return (
                        <MessagesListItem key={`${msg.userId}_${msg.timestamp}`}>
                            <p><b>{msg.displayName}:</b> {msg.message}</p>
                        </MessagesListItem>
                    )
                })}
            </MessagesList>
            <StyledChatWidgetFooter>
                {!state.chatToken
                    ? <SetDisplayName handleSetDisplayName={handleSetDisplayName} /> :
                    <>
                        <Input isMultiline value={state.message} placeholder="Enter your message" onChange={(e) => { handleStateUpdate({ message: e.target.value }) }} />
                        <br />
                        <Button css={{ float: 'right' }} onClick={handleSendMessage} size="S">Send</Button>
                    </>
                }
            </StyledChatWidgetFooter>
        </StyledChatWidget>
    )
}

export default ChatWidget

const StyledChatWidget = styled('section', {
    position: 'relative',
    backgroundColor: '$bgColor',
    padding: '$4 $3',
    height: 'fit-content',

    '@bp2': {
        height: '100vh',
    },

    '&  *': {
        color: '$textDark',
    }
})

const StyledChatWidgetHeader = styled('header', {
    position: 'absolute',
    width: 'calc(100% - ($4 * 2))',
})

const MessagesList = styled('div', {
    marginTop: '$8',
})

const MessagesListItem = styled('div', {
    '&:not(:first-child)': {
        marginTop: '$2'
    }

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