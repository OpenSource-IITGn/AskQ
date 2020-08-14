import React, { useState, useContext } from 'react'
import { Container, Header, Content, FlexboxGrid } from 'rsuite'
import CustomNavbar from '../Components/navbar'
import { AnswersProvider } from './../Contexts/AnswersContext'

import './../styles/questions.css'
import './../styles/global.css'
import Question from './../Components/Questions/question';
import QuestionDetails from '../Components/Questions/questionDetails'
import { usePostDetailsQuery } from './../GraphQL/Queries/postDetailsQuery'

function QuestionDetail(props) {

    const quesId = props.match.params.id
    const postData = usePostDetailsQuery({ id: quesId })

    if (postData.loading) {
        return (
            <div>loading</div>
        )
    }
    if (postData.error) {
        return (
            <div> Error : postData.error </div>
        )
    }

    const { ok, error, post } = postData.data.getPostDetailsByID
    console.log(post)

    return (
        <Container className="full-height">
            <Header>
                <CustomNavbar {...props} />
            </Header>
            <Content className="horizontal-margin top-margin">
                <FlexboxGrid justify="center" className="">
                    <FlexboxGrid.Item colspan={14}>
                        <AnswersProvider>
                            <QuestionDetails {...props} post={post} />
                        </AnswersProvider>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}

export default QuestionDetail;
