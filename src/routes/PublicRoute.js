import React from 'react'

import { Route, Redirect } from 'react-router-dom'


export const PublicRoute =({component: Component,isAuthenticated, ...rest}) => {

    
    return(
        <>
        {isAuthenticated ? <Redirect to="/" />   :  <Route  {...rest} render={props => (
            <Component {...props} />  
    )}  />}
    </>
    )
    }
    