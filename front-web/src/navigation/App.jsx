import React from 'react';
import './reset.css'
import RoutePermission from './../components/routePermission/routePermission'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { HomePage as home, NotFoundPage as notfound, Pages } from './pages'
import { verifyAuthenticatedUser, getRoleInToken } from './../services/functions'

function RoutesComponent() {
    return Pages.map((page, index) =>
        <RoutePermission
            path={page.path}
            key={index}
            component={page.component}
            role={page.role}
        />)
}

function whichUser(){
    switch(getRoleInToken()){
        case "1": return "inicial-administrador"
        case "2": return "perfil-aluno"
        case "3": return "perfil-empresa"
    }
}

const HomeRender = ({ component: Component }) => (
    <Route
        render={props => !verifyAuthenticatedUser() ? <Component {...props} /> : <Redirect to={whichUser()} />}
    />
)

export default function App() {
    return (
        <Router>
            <Switch>
                <HomeRender exact path="/" component={home.component} />
                {RoutesComponent()}
                <Route component={notfound.component} />
            </Switch>
        </Router>
    );
}
