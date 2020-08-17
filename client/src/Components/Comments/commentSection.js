import React, { useState, useContext } from 'react'
import { List, FlexboxGrid, Button } from 'rsuite';
import Comment from './comment'
import { CommentsContext } from './../../Contexts/CommentsContext'
import './../../styles/comments.css'

function CommentSection() {

    const [showEditor, setShowEditor] = useState(false)
    const context = useContext(CommentsContext)

    if (!context) {
        return (
            <div>Loading</div>
        )
    }


    let commentsList, setCommentsList, updateCommentsList

    commentsList = context.commentsList
    setCommentsList = context.setCommentsList
    updateCommentsList = context.updateCommentsList

    const handleClick = () => {
        setShowEditor(currState => !currState)
    }

    const allComments = commentsList.map((c) => <Comment commentDetails={c} />)
    const handleSubmit = () => {

    }
    const commentButton = showEditor ? (
        <div>
            <Button onClick={handleSubmit} >
                Submit
        </Button >
            <Button onClick={handleClick} >
                Cancel
        </Button >
        </div>
    ) :
        (<Button onClick={handleClick} >
            Add Comment
        </Button >
        )

    return (
        <FlexboxGrid justify="end" className="comment-section">
            <FlexboxGrid.Item colspan={24}>
                <List size="sm" hover>
                    <List.Item className="small-heading"><h6>Comments</h6></List.Item>
                    {allComments}
                    {showEditor && <textarea />}
                </List>


            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}
export default CommentSection;