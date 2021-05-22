import * as React from 'react'

interface Props {
    currentDraft: string
    handleSend(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void
    handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
}

function ConvoMessageEditor(props: Props) {
    return (
        <div
            id="convomessageeditor"
            style={{
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid black',
            }}
        >
            <textarea
                style={
                    {
                        // borderRadius: '24px',
                    }
                }
                onChange={props.handleMessageChange}
                value={props.currentDraft}
            />
            <input type="button" value="Send" onClick={props.handleSend} />
        </div>
    )
}

export default ConvoMessageEditor
