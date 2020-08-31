import React, { useContext, useState } from 'react'
import { Panel, Divider, FlexboxGrid, ButtonToolbar, Button, Icon, ButtonGroup } from 'rsuite'
import './../../styles/answer.css'
import CommentSection from './../Comments/commentSection'
import { UserContext } from '../../Contexts/UserContext'
import { useAuthorized } from '../../hooks/authorized'
import { Link } from 'react-router-dom'
import AddAnswerForm from '../Forms/addAnswerForm'

function Answer(props) {

    // fetch details
    const { answerDetails } = props
    const { id, body, comments, vote, createdAt } = answerDetails
    const username = answerDetails.user.username
    const userId = answerDetails.user.id


    // check authorization
    const { authenticated, setauthenticated, user, setUser } = useContext(UserContext)
    const [isAuthorized] = useAuthorized()
    var hasAuthorization = false
    hasAuthorization = isAuthorized(user.id, userId)

    // component states
    const [isEditing, setIsEditing] = useState(false)
    const [ansBody, setAnsBody] = useState(body)
    const handleToggle = () => setIsEditing(!isEditing)

    // actually on answer update
    const onAnswerUpdate = ({ body }) => {
        setAnsBody(body)
        setIsEditing(false)
    }


    // initial data
    const editData = {
        ansBody
    }



    const answerBlock = (
        <div>
            <Panel className="post-card">
                <div>
                    <p className="user-name">{username}</p>
                    <p className="answer-time">Answered {createdAt} ago</p>
                </div>
                <FlexboxGrid.Item>
                    {hasAuthorization && (
                        !isEditing ? (
                            <ButtonGroup>
                                <Button onClick={handleToggle}>Edit</Button>
                                <Button>Delete</Button>
                            </ButtonGroup>
                        ) : (
                                <ButtonGroup>
                                    <Button onClick={handleToggle}>Cancel</Button>
                                    <Button appearance="primary">Done</Button>
                                </ButtonGroup>
                            )
                    )}
                </FlexboxGrid.Item>
                <Divider />
                <div>
                    <article dangerouslySetInnerHTML={{ __html: ansBody }}></article>
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
                <CommentSection postId={id} />
            </Panel>
        </div>
    )


    const editingBlock = (
        <div>
            <AddAnswerForm {...editData} {...props} ansBody={ansBody} isEditing={true} ansId={id} onAnswerUpdate={onAnswerUpdate} />
        </div>
    )

    return (
        <div className="">
            {
                isEditing ? editingBlock : answerBlock
            }
        </div>
    )
}

export default Answer