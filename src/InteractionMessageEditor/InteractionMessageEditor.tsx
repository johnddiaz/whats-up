import * as React from 'react'
import './styles.scss'

interface Props {
    currentDraft: string
    handleSend(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void
    handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
}

function InteractionMessageEditor(props: Props) {
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

export default InteractionMessageEditor
