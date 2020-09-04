import React from 'react'
import LoginForm from '../Components/Forms/loginForm'
import { Container, Header, Content, FlexboxGrid, Panel, Footer } from 'rsuite';
import Layout from './Layout/layout';

import './../styles/global.css'
import './../styles/auth.css'

function Login(props) {
    return (
        <Layout {...props}>
            <Content className="centered-container full-width">
                <FlexboxGrid justify="center" className="full-width">
                    <FlexboxGrid.Item colspan={10}>
                        <Panel header={<h3>Login</h3>} className="auth-card" shaded>
                            <LoginForm {...props} />
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Layout>
    )
}


export default Login;