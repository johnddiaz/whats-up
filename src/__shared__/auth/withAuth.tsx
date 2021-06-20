import * as React from 'react'
import useFirebaseAuth from './useFirebaseAuth'

function withAuth(WrappedComponent: React.ElementType) {
    return function Hoc(props: Object) {
        const [isLoggedIn, showSignInPopup] = useFirebaseAuth()

        return isLoggedIn ? (
            <WrappedComponent {...props} />
        ) : (
            <button onClick={showSignInPopup}>Sign in</button>
        )
    }
}

export default withAuth
