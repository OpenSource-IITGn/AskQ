import React, { useContext, useEffect } from 'react'
import { FlexboxGrid, Button, Divider, Panel, Tag, TagGroup, ButtonGroup, ButtonToolbar, Icon } from 'rsuite'
import { Link } from 'react-router-dom'
import { useAuthorized } from '../../hooks/authorized'
import { UserContext } from '../../Contexts/UserContext'
import { ReactComponent as LikeLogo } from './../../assets/thumbs.svg'
import { ReactComponent as BookMarkLogo } from './../../assets/bookmark.svg'
import avatarPng from './../../assets/avatar.png';

import './question.css';

function Question(props) {
    const { id, showDetailed, title, body, timeSinceCreation, tags, vote, numAnswers, userName, userId } = props;
    const { authenticated, setauthenticated, user, setUser } = useContext(UserContext)
    const [isAuthorized] = useAuthorized()
    var hasAuthorization = false
    hasAuthorization = isAuthorized(user.id, userId)

    const editData = {
        title,
        body,
        tags
    }

    const handleClick = () => {
        if (showDetailed) {
            return
        }
        props.history.push(`/questions/${id}`)
    }

    const displayText = (text) => {
        if (showDetailed) {
            return text
        }
        const wrappedText = text
        return wrappedText
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
                        {showDetailed && hasAuthorization && (<ButtonGroup>
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
                        </ButtonGroup>)}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <br />
                <div className="question-body">
                    <div className="question-header">
                        <div className="avatar-img">
                            <img src={avatarPng} />
                        </div>
                        <div>
                            <h4 className="question-title">{title}</h4>
                            <div className="question-desc">
                                <p className="author">Sean Parker</p>
                                <p>10 min ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <article dangerouslySetInnerHTML={{ __html: displayText(body) }} className={!showDetailed ? "wrap-text post-body" : "post-body"}></article>
                    </div>
                    <br />
                </div>
                <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>
                        <Button className="question-icons">
                            <LikeLogo />
                        </Button>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <div className="question-footer">
                            <p>17 votes</p>
                            <Button className="question-icons"><BookMarkLogo /></Button>
                        </div>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
        </div>
    )
}

export default Question