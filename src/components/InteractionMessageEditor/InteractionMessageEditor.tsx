import * as React from 'react'
import './InteractionMessageEditor.scss'

interface Props {
    currentDraft: string
    handleSend(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void
    handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
}

export default function InteractionMessageEditor(props: Props) {
    return (
        <div id="interactionmessageeditor-root">
            <textarea
                onChange={props.handleMessageChange}
                value={props.currentDraft}
            />
            <input type="button" value="Send" onClick={props.handleSend} />
        </div>
    )
}
