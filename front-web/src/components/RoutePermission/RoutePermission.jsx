import React, { useState, useEffect } from 'react'
import { 
    verifyAuthenticatedUser as verify, 
    decryptPayloadJwtAndReturnObject as decrypt, 
    getInLocalStorage } 
from '../../util/functions'
import { KEY_USER_JWT } from '../../util/constants'
import { Route, Redirect } from 'react-router-dom'

export default function RoutePermission({ path, role, component: Component}){

    const [authenticated] = useState(verify())
    const [roleJwt] = useState(decrypt(getInLocalStorage(KEY_USER_JWT)).Role)

    useEffect(() => {
        console.log(authenticated)
        console.log(roleJwt)
    },[])

    return (
        <Route
            path={path}
            render={props => authenticated ? (roleJwt === role) ? <Component {...props}/> : <Redirect to={{ pathname: "/" }}/> 
            : role === 0 ? <Component {...props}/> : <Redirect to={{ pathname: "/" }}/>}
        />
    )
}