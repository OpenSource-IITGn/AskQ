import React, { useState } from 'react'
import { Container, Header, Content, FlexboxGrid } from 'rsuite'
import CustomNavbar from '../Components/navbar'

import './../styles/questions.css'
import './../styles/global.css'
import Question from './../Components/question';

function QuestionDetail(props) {
    return (
        <Container className="full-height">
            <Header>
                <CustomNavbar {...props} />
            </Header>
            <Content className="horizontal-margin top-margin">
                <FlexboxGrid justify="center" className="">
                    <FlexboxGrid.Item colspan={14}>
                        <Question showDetailed={true} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}

export default QuestionDetail;
