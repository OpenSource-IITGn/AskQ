import React, { Component } from 'react'
import { Container, Header, Content, FlexboxGrid, Panel, Footer } from 'rsuite';

import CustomNavbar from '../Components/navbar'
import SignupForm from '../Components/Forms/signupForm'

function Signup(props) {
    return (
        <Container className="full-height">
            <Header>
                <CustomNavbar {...props} />
            </Header>
            <Content className="centered-container full-width">
                <FlexboxGrid justify="center" className="full-width">
                    <FlexboxGrid.Item colspan={10}>
                        <Panel header={<h3>Signup</h3>} className="auth-card" shaded>
                            <SignupForm {...props} />
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
            <Footer>Footer</Footer>
        </Container>
    )

}

export default Signup;