import React from 'react'
import { Container, Header, Content, FlexboxGrid, Panel, Footer } from 'rsuite'
import CustomNavbar from './../Components/navbar'
import AddQuestionForm from './../Components/addQuestionForm'

function CreateQuestion(props) {
    return (
        <Container className="full-height">
            <Header>
                <CustomNavbar {...props} />
            </Header>
            <Content className="centered-container full-width">
                <FlexboxGrid justify="center" className="full-width">
                    <FlexboxGrid.Item colspan={16}>
                        <Panel header={<h3>Add Question</h3>} className="auth-card" shaded>
                            <AddQuestionForm {...props} />
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
            <Footer>Footer</Footer>
        </Container>

    )
}

export default CreateQuestion