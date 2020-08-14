import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './protected';
import Home from './../Pages/home';
import Login from './../Pages/login';
import Signup from './../Pages/signup';
// import Secret from './../Components/';
import Questions from './../Pages/questions';
import QuestionDetail from './../Pages/questionDetail';
import CreateQuestion from './../Pages/createQuestion';

export default class Routes extends Component {
    render() {
        return (
            <Switch>

                <Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />

                <Route exact path="/signup" render={(routeProps) => <Signup {...routeProps} />} />
                <Route exact path="/login" render={(routeProps) => <Login {...routeProps} />} />

                <Route exact path="/questions" render={(routeProps) => <Questions {...routeProps} />} />
                <ProtectedRoute exact path="/questions/create" component={CreateQuestion} />
                <Route exact path="/questions/:id" render={(routeProps) => <QuestionDetail {...routeProps} />} />

                {/* <ProtectedRoute exact path="/secret" component={Secret} /> */}
            </Switch>

        )
    }
}
