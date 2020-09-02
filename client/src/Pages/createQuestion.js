import React from 'react'
import { Container, Header, Content, FlexboxGrid, Panel, Footer } from 'rsuite'
import CustomNavbar from './../Components/navbar'
import AddQuestionForm from './../Components/Forms/addQuestionForm'
import Layout from './Layout/layout'

function CreateQuestion(props) {
    const { isEditing } = props
    const formheader = isEditing ? (<h3> Edit Question</h3>) : (<h3>Add Question</h3>)

    return (
        <Layout {...props}>
            <Content className="centered-container full-width">
                <FlexboxGrid justify="center" className="full-width">
                    <FlexboxGrid.Item colspan={16}>
                        <Panel header={formheader} className="auth-card" shaded>
                            <AddQuestionForm {...props} />
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Layout>
    )
}

export default CreateQuestion