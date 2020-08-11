import React from 'react'
import { FlexboxGrid, Button, Divider, Panel, Tag, TagGroup, ButtonGroup, ButtonToolbar, Icon } from 'rsuite'

import AnswerList from './answerList'
import CommentSection from './commentSection'

import "./../styles/questions.css"


function Question(props) {

    const handleClick = () => {
        alert('clicked on question')
    }
    const { showDetailed } = props;
    return (
        <div >
            <Panel onClick={handleClick} className="question-row">
                <TagGroup>
                    <Tag >Javascript</Tag>
                    <Tag >jQuery</Tag>
                </TagGroup>
                <br />
                <div className="question-body">
                    <div>
                        <h4 class="question-title">Rebuild jQuery native functions to HTMLElements in Javascript</h4>
                    </div>
                    <br />
                    <div className="">
                        Pokem ipsum dolor sit amet Smeargle Umbreon deserunt mollit Lotad Tropius Shelgon. Storm Badge Illumise Machoke Riolu I'm on the road to Viridian City Snorunt Excadrill. Fuchsia City Seel Hoothoot Froslass Seedot Nidorina Walrein. Pika-pi Salamence Dewgong Mime Jr Grumpig
                    </div>
                    <br />
                    <FlexboxGrid justify="end">
                        <FlexboxGrid.Item>
                            asked 13 mins ago <a href="https://www.google.com">Greil Omatics</a>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </div>
                <Divider />
                <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>
                        <ButtonToolbar>
                            <Button><Icon icon='thumbs-o-up' /></Button>
                            <Button>4 Votes</Button>
                            <Button><Icon icon='thumbs-o-down' /></Button>
                            <span style={{ margin: "0 1em" }}></span>
                            <Button><Icon icon='star' /> Favourite</Button>
                        </ButtonToolbar>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <ButtonGroup>
                            <Button>12 Answers /</Button>
                            <Button>730 Views</Button>
                        </ButtonGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
            <Panel className="comments-body" >
                {showDetailed && (<CommentSection />)}
            </Panel>
            {showDetailed && (<AnswerList />)}
        </div>
    )
}

export default Question