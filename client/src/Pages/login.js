import React from 'react'
import CustomNavbar from '../Components/navbar'
import LoginForm from '../Components/Forms/loginForm'
import { Container, Header, Content, FlexboxGrid, Panel, Footer } from 'rsuite';

import './../styles/global.css'
import './../styles/auth.css'

function Login(props) {
    return (
        <Container className="full-height">
            <Header>
                <CustomNavbar {...props} />
            </Header>
            <Content className="centered-container full-width">
                <FlexboxGrid justify="center" className="full-width">
                    <FlexboxGrid.Item colspan={10}>
                        <Panel header={<h3>Login</h3>} className="auth-card" shaded>
                            <LoginForm {...props} />
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
            <Footer>Footer</Footer>
        </Container>
    )
}


export default Login;