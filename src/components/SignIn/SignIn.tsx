import * as React from 'react'

interface Props {
    showSignInPopup: (method: 'google' | 'github') => void
}

export function SignIn(props: Props) {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <button
                style={{ margin: '4px' }}
                onClick={() => props.showSignInPopup('google')}
            >
                Sign in with Google
            </button>
            <button
                style={{ margin: '4px' }}
                onClick={() => props.showSignInPopup('github')}
            >
                Sign in with Github
            </button>
        </div>
    )
}
