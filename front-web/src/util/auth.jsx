import React from 'react'
import { verifyAuthenticatedUser, decryptPayloadJwtAndReturnObject, getInLocalStorage } from './functions'
import { KEY_USER_JWT } from './constants'
import { Route, Redirect } from 'react-router-dom'

export default function RoutePermission(key, role){

    const authenticatedUser = verifyAuthenticatedUser()
    const roleJwt = decryptPayloadJwtAndReturnObject(getInLocalStorage(KEY_USER_JWT)).Role

    const permission = ({ component: Component }) => {

        return (
            <Route 
                key={key}
                render={props => authenticatedUser && roleJwt === role ? 
                    <Component {...props} /> : 
                    role === 0 ? <Component {...props} /> : 
                    <Redirect to={{ pathname: "/login" }} 
                />}
            />
        )
    }

    return permission
}