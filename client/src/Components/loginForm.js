import React, { useState } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar } from 'rsuite';
import '../styles/global.css';

import { useLoginMutation } from '../GraphQL/Mutations/loginMutation';

const LoginForm = (props, { loading }) => {
    const [loginMutation, loginMutationResults] = useLoginMutation();

    // const onSubmit = (values) => loginMutation(values.username, values.password);
    const [email, setEmail] = useState('azleblade@gmail.com');
    const [password, setPassword] = useState('azleblade');


    const handleSubmit = async () => {
        await loginMutation(email, password)
        props.history.push('/questions')
        console.log(loginMutationResults)
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
