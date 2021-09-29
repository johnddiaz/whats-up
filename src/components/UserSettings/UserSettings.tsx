import * as React from 'react'
import firebase from 'firebase'

interface Props {
    displayName: string
    updateProfile: (
        userInfo: Partial<Pick<firebase.UserInfo, 'displayName' | 'photoURL'>>
    ) => void
}

export function UserSettings(props: Props) {
    const [newUsername, setNewUsername] = React.useState(props.displayName)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (newUsername) {
            props.updateProfile({
                displayName: newUsername,
            })
        } else {
            console.error('Username was not valid.')
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px',
                }}
                onSubmit={handleSubmit}
            >
                <div
                    style={{
                        display: 'flex',
                        padding: '4px',
                        marginBottom: '16px',
                        flexDirection: 'column',
                    }}
                >
                    <label
                        htmlFor="username-input"
                        style={{ paddingBottom: '4px' }}
                    >
                        Username
                    </label>
                    <input
                        id="username-input"
                        type="text"
                        placeholder="Type in the user name"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    ></input>
                </div>
                <input type="submit" value="Save"></input>
            </form>
        </div>
    )
}
