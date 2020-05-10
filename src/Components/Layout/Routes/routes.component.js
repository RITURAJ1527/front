import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Login from '../../Login/Login';
import Home from '../../Home/Home';
import PrivateRoute from '../Routes/private-route';

class AppRoutes extends Component {
    componentDidMount() {
        console.log(sessionStorage.getItem('email'))
    }
    redirectToHomeIfLoggedIn = () => {
        let homeRute = null;
        if(localStorage.getItem('email')) {
            homeRute = <PrivateRoute path='/home' component={Home} isAuthenticated={true} /> 
        }
        else {
            homeRute = <PrivateRoute path='/home' component={Home} isAuthenticated={false} /> 
        }

        return homeRute;
    }
    render() {
        return (
            <Switch>
                {this.redirectToHomeIfLoggedIn()}
                <Route path="/login"  component={Login} />
                <Redirect from="/" exact to="login" />
            </Switch>
        )
    }
}

export default withRouter(AppRoutes);