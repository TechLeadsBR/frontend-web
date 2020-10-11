import React from 'react'
import { 
    verifyAuthenticatedUser as verify, 
    decryptPayloadJwtAndReturnObject as decrypt, 
    getInLocalStorage,
    removeInLocalStorage
} 
from './../../util/functions'
import { KEY_USER_JWT } from './../../util/constants'
import { Route, Redirect } from 'react-router-dom'

export default function RoutePermission({ path, role, component: Component}){

    const authenticated = () => verify()
    const verifyToken = () => decrypt(getInLocalStorage(KEY_USER_JWT))
    const roleJwt = () => verifyToken() ? verifyToken().Role : removeInLocalStorage(KEY_USER_JWT)

    return (
        <Route
            path={path}
            render={props => authenticated() ? ((roleJwt() === role) ? <Component {...props}/> : <Redirect to={{ pathname: "/" }}/>)
            : role === 0 ? <Component {...props}/> : <Redirect to={{ pathname: "/" }}/>     }
        />
    )
}