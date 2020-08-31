import React from 'react'
import CustomNavbar from '../Components/navbar'
import { Button, Container, Header, Content, FlexboxGrid, Footer, Divider } from 'rsuite'
import Question from './../Components/Questions/question';
import CustomPagination from './../Components/pagination';

import './../styles/questions.css';
import './../styles/global.css'
import { LIMITS_PER_PAGE } from '../constants';
import { useQuestionsQuery } from '../GraphQL/Queries/questionsQuery';

function Questions(props) {

    const handleClick = (e) => {
        props.history.push("/questions/create")
    }

    const page_number = parseInt(props.match.params.page, 10)
    const limit = LIMITS_PER_PAGE
    const offset = page_number ? (page_number - 1) * limit : 0
    const questionsData = useQuestionsQuery({ limit: limit, offset: offset })

    if (questionsData.loading) {
        return (
            <div>loading</div>
        )
    }
    if (questionsData.error) {
        return (
            <div> Error : questionData.error </div>
        )
    }
    const { data, fetchMore } = questionsData
    const { ok, error, posts } = data.getQuestions

    const allQuestions = posts ? posts.map((question) =>
        (<Question showDetailed={false} {...question} {...props} />)
    ) : "No Questions Found"

    const handlePageChange = (curr_page) => {
        props.history.push(`/questions/page=${curr_page}`)
    }

    const header =
        (<FlexboxGrid justify="space-between" colspan={14}>
            <FlexboxGrid.Item><h2 className="container-heading">Top Questions</h2></FlexboxGrid.Item>
            <FlexboxGrid.Item>
                <Button appearance="primary" onClick={handleClick}>Ask Question</Button>
            </FlexboxGrid.Item>
        </FlexboxGrid>)

    return (
        <Container className="full-height">
            <Header>
                <CustomNavbar {...props} />
            </Header>
            <Content className="horizontal-margin top-margin">
                <FlexboxGrid justify="center" className="full-width">
                    <FlexboxGrid.Item colspan={14}>
                        {header}
                        <Divider>"Top Questions"</Divider>
                        {allQuestions}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <FlexboxGrid justify="center">
                    <CustomPagination onPageChange={handlePageChange} active={page_number} />
                </FlexboxGrid>
            </Content>
            <Footer>Footer</Footer>
        </Container>
    )
}

export default Questions