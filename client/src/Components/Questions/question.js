import React from 'react'
import { FlexboxGrid, Button, Divider, Panel, Tag, TagGroup, ButtonGroup, ButtonToolbar, Icon } from 'rsuite'

import "./../../styles/questions.css"


function Question(props) {

    const handleClick = () => {
        // alert('clicked on question')
    }
    const { showDetailed, title, body, timeSinceCreation, tags, vote, numAnswers, userName, userId } = props;
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
                        <h4 class="question-title">{title}</h4>
                    </div>
                    <br />
                    <div className="">
                        <article dangerouslySetInnerHTML={{ __html: body }}></article>
                    </div>
                    <br />
                    <FlexboxGrid justify="end">
                        <FlexboxGrid.Item>
                            asked {timeSinceCreation} ago <a href="https://www.google.com"> {userName}</a>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </div>
                <Divider />
                <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>
                        <ButtonToolbar>
                            <Button><Icon icon='thumbs-o-up' /></Button>
                            <Button>{vote} Votes</Button>
                            <Button><Icon icon='thumbs-o-down' /></Button>
                            <span style={{ margin: "0 1em" }}></span>
                            <Button><Icon icon='star' /> Favourite</Button>
                        </ButtonToolbar>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <ButtonGroup>
                            <Button>{numAnswers} Answers /</Button>
                            <Button>730 Views</Button>
                        </ButtonGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
        </div>
    )
}

export default Question