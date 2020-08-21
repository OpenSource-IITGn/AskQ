import React, { useState } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar } from 'rsuite';
import { useSignupMutation } from '../../GraphQL/Mutations/signupMutation'

import '../../styles/global.css';
import { TextField, model } from '../formValidation';
import { invalidError, alreadySignedError } from '../errorHandler';


const SignupForm = (props, { loading }) => {
  const [signupMutation, signupMutationResults] = useSignupMutation();

  // const onSubmit = (values) => loginMutation(values.username, values.password);
  const [username, setUsername] = useState('help');
  const [email, setEmail] = useState('azleblade@gmail.com');
  const [password, setPassword] = useState('azleblade');
  const [verifyPassword, setVerifyPassword] = useState('azleblade');
  const [formError, setFormError] = useState();


  const handleSubmit = async () => {
    if (formError) {
      console.log(formError)

      invalidError(formError.name)
      return;
    }
    const data = await signupMutation(username, email, password)
    const response = data.data.signUp

    if (response.ok === 104) {
      alreadySignedError()
      props.history.push('/login')
    }

  }

  const handleChange = (value, evt) => {
    if (evt.target.name === 'email') {
      setEmail(value)
    } else if (evt.target.name === 'password') {
      setPassword(value)
    } else if (evt.target.name === "username") {
      setUsername(value)
    } else if (evt.target.name === "verifyPassword") {
      setVerifyPassword(value)
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      model={model}
      onCheck={formError => {
        setFormError({ formError });
      }}
      formValue={{
        username,
        email,
        password,
        verifyPassword
      }}
      fluid
    >
      <TextField name="name" label="Username" onChange={handleChange} />
      <TextField name="email" label="Email" onChange={handleChange} />
      <TextField name="password" label="Password" type="password" onChange={handleChange} />
      <TextField name="verifyPassword" label="Verify password" type="password" onChange={handleChange} />
      <ButtonToolbar>
        <Button type="submit" appearance="primary">Login</Button>
      </ButtonToolbar>
      {/* </FormGroup> */}
    </Form >
  )
};

export default SignupForm;