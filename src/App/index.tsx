import React, { useState } from 'react'
import './App.css'
import '../../shared/styles.scss'
import { ConvoPreview } from '../ConvoPreview'
import { ConvoPreviewListToolbar } from '../ConvoPreviewListToolbar'
import { conversations, john } from '../__shared__/api-responses/conversations'
import { LoggedInPersonContext } from '../__shared__/utils/context'
import { ConvoView } from '../ConvoView'

function App () {
    const [currentConvoId, setCurrentConvoId] = useState<number | undefined>()

    function handlePreviewSelect (id: number) {
        setCurrentConvoId(id)
    }

    return (
        <LoggedInPersonContext.Provider value={john}>
            <div
                id='parent'
                style={{
                    display: 'flex',
                    height: '100%',
                    padding: '32px',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    id='chat thread list'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        flexBasis: 0,
                    }}
                >
                    <ConvoPreviewListToolbar />
                    {conversations.map(convo => {
                        return (
                            <ConvoPreview
                                key={convo.id}
                                conversation={convo}
                                onPreviewClick={handlePreviewSelect}
                            />
                        )
                    })}
                </div>
                <ConvoView
                    conversation={conversations.find(
                        convo => convo.id === currentConvoId
                    )}
                />
            </div>
        </LoggedInPersonContext.Provider>
    )
}

export default App
