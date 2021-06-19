import * as React from 'react'
import './ChatsToolbar.scss'

function ChatsToolbar() {
    return (
        <div id="chatstoolbar-root">
            <input type="search" placeholder="Search" />
            <input type="button" value="New Message" />
        </div>
    )
}

export default ChatsToolbar
