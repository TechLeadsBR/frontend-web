import React from 'react'
import {
    verifyAuthenticatedUser as verify,
    decryptPayloadJwtAndReturnObject as decrypt,
    getInLocalStorage,
    removeInLocalStorage,
    getRoleInToken
}
    from './../../services/functions'
import { KEY_USER_JWT } from './../../services/constants'
import { Route, Redirect } from 'react-router-dom'

export default function RoutePermission({ path, role, component: Component }) {

    const token = () => decrypt(getInLocalStorage(KEY_USER_JWT))
    const roleJwt = () => token() ? getRoleInToken() : removeInLocalStorage(KEY_USER_JWT)

    return (
        <Route
            path={path}
            render={props => verify() ? ((roleJwt() === role) ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />)
                : role === 0 ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />}
        />
    )
}