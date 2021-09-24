import * as React from 'react'
import './ChatsToolbar.scss'

interface Props {
    searchValue: string
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    openConversationForm: (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => void
}

export default function ChatsToolbar(props: Props) {
    return (
        <div
            id="chatstoolbar-root"
            style={{ borderBottom: '1px solid black', paddingBottom: '16px' }}
        >
            <input
                type="search"
                placeholder="Search"
                value={props.searchValue}
                onChange={props.handleSearchChange}
            />
            <input
                type="button"
                value="New Chat"
                onClick={props.openConversationForm}
            />
        </div>
    )
}
