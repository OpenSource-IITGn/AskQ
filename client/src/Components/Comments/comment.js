import React from 'react'
import { List, FlexboxGrid } from 'rsuite'

import './../../styles/comments.css'

function Comment(props) {
    const { commentDetails } = props
    const { body, id, user } = commentDetails
    const { username } = user

    return (
        <List.Item className="comment">
            <FlexboxGrid justify="space-between" className="full-width">
                <FlexboxGrid.Item>
                    {body}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                    asked 13 mins ago <a href="https://www.google.com">{username}</a>

                </FlexboxGrid.Item>
            </FlexboxGrid>
        </List.Item>
    )
}
export default Comment;