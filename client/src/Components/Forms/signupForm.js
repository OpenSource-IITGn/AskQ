import React, { useState } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar } from 'rsuite';
import { useSignupMutation } from '../../GraphQL/Mutations/signupMutation'

import '../../styles/global.css';


const SignupForm = (props, { loading }) => {
  const [signupMutation, signupMutationResults] = useSignupMutation();

  // const onSubmit = (values) => loginMutation(values.username, values.password);
  const [username, setUsername] = useState('help');
  const [email, setEmail] = useState('azleblade@gmail.com');
  const [password, setPassword] = useState('azleblade');


  const handleSubmit = async () => {
    console.log(username, email, password)
    await signupMutation(username, email, password)
    props.history.push('/login')
  }

  const handleChange = (value, evt) => {
    if (evt.target.name === 'email') {
      setEmail(value)
    } else if (evt.target.name === 'password') {
      setPassword(value)
    } else if (evt.target.name === "username") {
      setUsername(value)
    }
  }

  return (
    <Form onSubmit={handleSubmit} fluid>
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <FormControl name="username" type="text" onChange={handleChange} value={username} />
        <HelpBlock tooltip>Required</HelpBlock>
      </FormGroup>
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
};

export default SignupForm;