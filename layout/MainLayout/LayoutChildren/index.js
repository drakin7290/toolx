import { useSession } from 'next-auth/react'
import React from 'react'
import LoadingContainer from '~/components/common/LoadingContainer'
import LoginContainer from '~/containers/LoginContainer'

const LayoutChildren = ({ children }) => {
    const { data, status } = useSession()

    if (status === 'unauthenticated') {
        return (
            <LoginContainer></LoginContainer>
        )
    }
    else if (status === 'authenticated') {
        return <>
            {children}
        </>
    }
    else {
        return <LoadingContainer />
    }
}

export default LayoutChildren