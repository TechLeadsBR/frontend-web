import React from 'react';
import './reset.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { 
    HomePage as home, 
    NotFoundPage as notfound, 
    Pages
} from './Pages'
import RoutePermission from '../components/RoutePermission/RoutePermission'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={home.path} component={home.component} />
                {Pages.map((page, index) => <RoutePermission path={page.path} key={index} component={page.component} role={page.role} />)}
                <Route component={notfound.component} />
            </Switch>
        </Router>
    );
}

export default App;
