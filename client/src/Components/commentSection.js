import React from 'react'
import { List, FlexboxGrid } from 'rsuite';
import Comment from './../Components/comment'

import './../styles/comments.css'

function CommentSection() {
    return (
        <FlexboxGrid justify="end" className="comment-section">
            <FlexboxGrid.Item colspan={24}>
                <List size="sm" hover>
                    <List.Item className="small-heading"><h6>Comments</h6></List.Item>
                    <Comment />
                    <Comment />
                    <Comment />
                </List>

            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}
export default CommentSection;