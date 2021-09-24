import * as React from 'react'
import useFirebaseAuth from './useFirebaseAuth'

function withAuth(WrappedComponent: React.ElementType) {
    return function Hoc(props: Object) {
        const [user, isLoggedIn, showSignInPopup] = useFirebaseAuth()

        return isLoggedIn ? (
            <WrappedComponent user={user} {...props} />
        ) : (
            // This should probably be moved to a different component.
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
                    onClick={() => showSignInPopup('google')}
                >
                    Sign in with Google
                </button>
                <button
                    style={{ margin: '4px' }}
                    onClick={() => showSignInPopup('github')}
                >
                    Sign in with Github
                </button>
            </div>
        )
    }
}

export default withAuth
