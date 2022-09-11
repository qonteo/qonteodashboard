import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';

import { AuthRouter } from './AuthRoute';
import { DashboardRouter } from './DasboardRoute';
import { PublicRoute } from './PublicRoute';
import { PrivateRouter } from './PrivateRoute';


export const AppRoute = () => {

    const dispatch = useDispatch();
    const { isCheking ,uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (!isCheking) {
        return <h4>Cargando...</h4>;
    }
    return (
        <Router>

            <div>
                <Switch>
                    <PublicRoute isAuthenticated={!!uid} path="/auth"
                        component={AuthRouter} />
                    <PrivateRouter isAuthenticated={!!uid} path="/"
                        component={DashboardRouter} />
                    <Redirect to="/auth/login" />
                </Switch>

            </div>

        </Router>
    )
}
