import React from 'react';
import './reset.css'
import RoutePermission from './../components/routePermission/routePermission'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import {
    HomePage as home,
    NotFoundPage as notfound,
    Pages
} from './pages'

function RoutesComponent() {
    return Pages.map((page, index) => 
        <RoutePermission
            path={page.path}
            key={index}
            component={page.component}
            role={page.role}
        />)
}

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={home.path} component={home.component} />
                {RoutesComponent()}
                <Route component={notfound.component} />
            </Switch>
        </Router>
    );
}
