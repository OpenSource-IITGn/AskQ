import React, { Component } from 'react'
import { Container, Header, Content, FlexboxGrid, Panel, Footer } from 'rsuite';

import CustomNavbar from '../Components/navbar'
import SignupForm from '../Components/Forms/signupForm'
import Layout from './Layout/layout';

function Signup(props) {
    return (
        <Layout {...props}>
            <Content className="centered-container full-width">
                <FlexboxGrid justify="center" className="full-width">
                    <FlexboxGrid.Item colspan={10}>
                        <Panel header={<h3>Signup</h3>} className="auth-card" shaded>
                            <SignupForm {...props} />
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Layout>
    )

}

export default Signup;