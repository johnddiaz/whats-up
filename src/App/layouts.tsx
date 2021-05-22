import React from 'react'

function ChatsLayout(props: { children: React.ReactNode }) {
    return (
        <div
            id="chat thread list"
            style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                flexBasis: 0,
            }}
        >
            {props.children}
        </div>
    )
}

function InteractionLayout(props: { children: React.ReactNode }) {
    return (
        <div
            id="convoviewdiv"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'grey',
                flexGrow: 3,
                flexBasis: 0,
            }}
        >
            {props.children}
        </div>
    )
}

export { ChatsLayout, InteractionLayout }
