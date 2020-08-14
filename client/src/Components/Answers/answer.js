import React from 'react'
import { Panel, Divider, FlexboxGrid, ButtonToolbar, Button, Icon } from 'rsuite'
import './../../styles/answer.css'
import CommentSection from './../Comments/commentSection'

function Answer(props) {

    const { answerDetails } = props
    const { id, body, comments, vote, user, createdAt } = answerDetails
    const { username } = user

    return (
        <div className="">
            <Panel className="post-card">
                <div>
                    <p className="user-name">{username}</p>
                    <p className="answer-time">Answered {createdAt} ago</p>
                </div>
                <Divider />
                <div>
                    <article dangerouslySetInnerHTML={{ __html: body }}></article>
                </div>
                <Divider />

                <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>
                        <ButtonToolbar>
                            <Button><Icon icon='thumbs-o-up' /></Button>
                            <Button>{vote} Votes</Button>
                            <Button><Icon icon='thumbs-o-down' /></Button>
                            <span style={{ margin: "0 1em" }}></span>
                        </ButtonToolbar>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
            <Panel className="comments-body" >
                <CommentSection />
            </Panel>

        </div>
    )
}

export default Answer