import * as React from 'react'

function ConvoPreviewListToolbar () {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
            }}
        >
            <input type='search' placeholder='Search' />
            <input type='button' value='New Message' />
        </div>
    )
}

export { ConvoPreviewListToolbar }
