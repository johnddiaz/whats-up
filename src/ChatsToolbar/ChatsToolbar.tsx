import * as React from 'react'
import './styles.scss'

function ChatsToolbar() {
    return (
        <div id="chatstoolbar-root">
            <input type="search" placeholder="Search" />
            <input type="button" value="New Message" />
        </div>
    )
}

export default ChatsToolbar
