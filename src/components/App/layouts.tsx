import React from 'react'

export function ChatsLayout(props: { children: React.ReactNode }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 2,
                flexBasis: 0,
                maxWidth: '700px',
            }}
        >
            {props.children}
        </div>
    )
}

export function InteractionLayout(props: { children: React.ReactNode }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'grey',
                flexGrow: 3,
                flexBasis: 0,
            }}
        >
            {props.children}
        </div>
    )
}
