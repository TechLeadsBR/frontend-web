import React from 'react'
import {
    verifyAuthenticatedUser as authenticated,
    decryptPayloadJwtAndReturnObject as decrypt,
    getInLocalStorage,
    removeInLocalStorage,
    getRoleInToken
}
    from './../../services/functions'
import { KEY_USER_JWT } from './../../services/constants/constants'
import { Route, Redirect } from 'react-router-dom'

export default function RoutePermission({ path, role, component: Component }) {

    const token = () => decrypt(getInLocalStorage(KEY_USER_JWT))
    const roleUser = () => token() ? getRoleInToken() : removeInLocalStorage(KEY_USER_JWT)

    const verificationUserToRoute = (props) => {
        if (authenticated()) {
            return roleUser() === role ? <Component {...props} /> : <Redirect to="/" />
        } else {
            return role === "0" ? <Component {...props} /> : <Redirect to="/" />
        }
    }

    return (
        <>
            <Route
                path={path}
                render={props => {
                    return <>
                        {iconLoading && <LoadingPage />}
                        {verificationUserToRoute(props)}
                    </>
                }}
            />
        </>
    )
}