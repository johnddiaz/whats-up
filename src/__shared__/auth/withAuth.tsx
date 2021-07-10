import * as React from 'react'
import useFirebaseAuth from './useFirebaseAuth'

function withAuth(WrappedComponent: React.ElementType) {
    return function Hoc(props: Object) {
        const [user, isLoggedIn, showSignInPopup] = useFirebaseAuth()

        return isLoggedIn ? (
            <WrappedComponent user={user} {...props} />
        ) : (
            <button onClick={showSignInPopup}>Sign in</button>
        )
    }
}

export default withAuth
