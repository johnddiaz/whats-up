import * as React from 'react'
import { SignIn } from '../../components/SignIn'
import useFirebaseAuth from './useFirebaseAuth'

export default function withAuth(WrappedComponent: React.ElementType) {
    return function Hoc(props: Record<string, unknown>) {
        const [user, showSignInPopup] = useFirebaseAuth()

        return user ? (
            <WrappedComponent user={user} {...props} />
        ) : (
            <SignIn showSignInPopup={showSignInPopup} />
        )
    }
}
