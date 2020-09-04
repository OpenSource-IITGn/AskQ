import React, { useState, useContext } from 'react'
import { Container, Header, Content, FlexboxGrid } from 'rsuite'
import './../styles/questions.css'
import './../styles/global.css'
import Question from './../Components/Questions/question';
import QuestionDetails from '../Components/Questions/questionDetails'
import { usePostDetailsQuery } from './../GraphQL/Queries/postDetailsQuery'
import Layout from './Layout/layout'

function QuestionDetail(props) {

    const quesId = props.match.params.id

    return (
        <Layout {...props}>
            <Content className="horizontal-margin top-margin">
                <FlexboxGrid justify="center" className="">
                    <FlexboxGrid.Item colspan={14}>
                        <QuestionDetails {...props} quesId={quesId} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Layout>
    )
}

export default QuestionDetail;
