import React from 'react'
import CustomNavbar from '../Components/navbar'
import { Button, Container, Header, Content, FlexboxGrid, Footer, Divider } from 'rsuite'
import Question from './../Components/Questions/question';
import CustomPagination from './../Components/pagination';

import './../styles/questions.css';
import './../styles/global.css'
import { usePostsQuery } from '../GraphQL/Queries/postsQuery';
import { LIMITS_PER_PAGE } from '../constants';

function Questions(props) {

    const handleClick = (e) => {
        props.history.push("/questions/create")
    }

    const page_number = parseInt(props.match.params.page, 10)
    const limit = LIMITS_PER_PAGE
    const offset = page_number ? (page_number - 1) * limit : 0
    const postsData = usePostsQuery({ limit: limit, offset: offset })

    if (postsData.loading) {
        return (
            <div>loading</div>
        )
    }
    if (postsData.error) {
        return (
            <div> Error : postData.error </div>
        )
    }
    const { data, fetchMore } = postsData
    const { ok, error, posts } = data.getPosts

    // id={id} showDetailed={true} title={title} body={body} timeSinceCreation={timeSinceCreation} tags={tags} vote={vote} numAnswers={numAnswers} userName={user.username} userId={user.id} 
    const allQuestions = posts ? posts.map((post) =>
        (<Question showDetailed={false} {...post} {...props} />)
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