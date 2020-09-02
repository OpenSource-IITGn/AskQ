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
import QuestionEdit from '../Pages/questionEdit';
import { UserProvider } from '../Contexts/UserContext';
import ProfileDashboard from '../Pages/profileDashboard';

export default class Routes extends Component {
    render() {
        return (
            <UserProvider>
                <Switch>

                    <Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />
                    <Route exact path="/dashboard" render={(routeProps) => <ProfileDashboard {...routeProps} />} />

                    <Route exact path="/signup" render={(routeProps) => <Signup {...routeProps} />} />
                    <Route exact path="/login" render={(routeProps) => <Login {...routeProps} />} />
                    <ProtectedRoute exact path="/questions/create" component={CreateQuestion} />
                    <Route exact path="/questions/page=:page" render={(routeProps) => <Questions {...routeProps} />} />
                    <Route exact path="/questions/:id" render={(routeProps) => <QuestionDetail {...routeProps} />} />
                    <ProtectedRoute exact path="/questions/:id/edit" component={QuestionEdit} />
                </Switch>
            </UserProvider>

        )
    }
}
