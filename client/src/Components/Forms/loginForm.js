import React, { useState, useContext } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar, Alert } from 'rsuite';
import './../../styles/global.css';

import { useLoginMutation } from '../../GraphQL/Mutations/loginMutation';
import { UserContext } from '../../Contexts/UserContext';
import { sucessAlert, loginError } from '../errorHandler';

const LoginForm = (props, { loading }) => {

    const [loginMutation, loginMutationResults] = useLoginMutation();
    const { authenticated, setauthenticated, user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('azleblade@gmail.com');
    const [password, setPassword] = useState('azleblade');


    const handleSubmit = async () => {
        const data = await loginMutation(email, password)
        console.log(data)
        const signIndata = data.data.signIn

        if (signIndata.ok) {
            setauthenticated(true)
            sucessAlert('Login success')
            props.history.push('/questions')
        } else {
            loginError()
            props.history.push('/login')
        }
    }

    const handleChange = (value, evt) => {
        if (evt.target.name === 'email') {
            setEmail(value)
        } else if (evt.target.name === 'password') {
            setPassword(value)
        }
    }

    return (
        <Form onSubmit={handleSubmit} fluid>
            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name="email" type="email" onChange={handleChange} value={email} />
                <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password" type="password" onChange={handleChange} value={password} />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button type="submit" appearance="primary">Login</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form>
    )
}



export default LoginForm;
