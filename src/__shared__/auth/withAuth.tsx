import * as React from 'react'
import { SignIn } from '../../components/SignIn'
import useFirebaseAuth from './useFirebaseAuth'

function withAuth(WrappedComponent: React.ElementType) {
    return function Hoc(props: Object) {
        const [user, showSignInPopup] = useFirebaseAuth()

        return user ? (
            <WrappedComponent user={user} {...props} />
        ) : (
            <SignIn showSignInPopup={showSignInPopup} />
        )
    }
}

export default withAuth
