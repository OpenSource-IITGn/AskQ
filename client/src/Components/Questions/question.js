import React from 'react'
import { FlexboxGrid, Button, Divider, Panel, Tag, TagGroup, ButtonGroup, ButtonToolbar, Icon } from 'rsuite'
import { Link } from 'react-router-dom'

import "./../../styles/questions.css"
import { from } from 'apollo-link'


function Question(props) {

    const handleClick = () => {
        // alert('clicked on question')
    }
    const { id, showDetailed, title, body, timeSinceCreation, tags, vote, numAnswers, userName, userId } = props;

    const editData = {
        title,
        body,
        tags
    }

    return (
        <div >
            <Panel onClick={handleClick} className="question-row">
                <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>
                        <TagGroup>
                            <Tag >Javascript</Tag>
                            <Tag >jQuery</Tag>
                        </TagGroup>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <ButtonGroup>
                            <Button>
                                <Link to={{
                                    pathname: `${id}/edit`,
                                    data: editData,
                                }}>Edit</Link>
                            </Button>
                            <Button>
                                <Link to={{
                                    pathname: `${id}/delete`
                                }}>Delete</Link>
                            </Button>
                        </ButtonGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>

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