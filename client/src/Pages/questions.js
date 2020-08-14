import React from 'react'
import CustomNavbar from '../Components/navbar'
import { Button, Container, Header, Content, FlexboxGrid, Footer, Divider } from 'rsuite'
import Question from './../Components/Questions/question';
import CustomPagination from './../Components/pagination';

import './../styles/questions.css';
import './../styles/global.css'

function Questions(props) {

    const handleClick = (e) => {
        props.history.push("/questions/create")
    }

    const header =
        (<FlexboxGrid justify="space-between" colspan={14}>
            <FlexboxGrid.Item><h2 class="container-heading">Top Questions</h2></FlexboxGrid.Item>
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
                        <Question showDetailed={false} />
                        <Question showDetailed={false} />
                        <Question showDetailed={false} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <FlexboxGrid justify="center">
                    <CustomPagination />
                </FlexboxGrid>
            </Content>
            <Footer>Footer</Footer>
        </Container>
    )
}

export default Questions