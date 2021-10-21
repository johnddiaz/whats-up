import * as React from 'react'
import Header from '../Header'

interface Props {
    showSignInPopup: (method: 'google' | 'github') => void
}

export function SignIn(props: Props) {
    return (
        <div style={{ height: '100%' }}>
            <Header>
                <h3
                    style={{
                        marginLeft: '16px',
                        fontSize: '1.3em',
                    }}
                >
                    Whats Up
                </h3>
            </Header>
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
                    style={{
                        margin: '4px',
                        fontSize: '24px',
                        marginBottom: '16px',
                    }}
                    onClick={() => props.showSignInPopup('google')}
                >
                    Sign in with Google
                </button>
                <button
                    style={{ margin: '4px', fontSize: '24px' }}
                    onClick={() => props.showSignInPopup('github')}
                >
                    Sign in with Github
                </button>
            </div>
        </div>
    )
}
