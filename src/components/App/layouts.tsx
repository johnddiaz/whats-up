import React from 'react'

export function ChatsLayout(props: { children: React.ReactNode }) {
    return (
        <div
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

export function InteractionLayout(props: { children: React.ReactNode }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'grey',
                flexGrow: 3,
                flexBasis: 0,
                borderRadius: '1%',
            }}
        >
            {props.children}
        </div>
    )
}
