import React, { useState, useContext } from 'react'
import { List, FlexboxGrid, Button, Input } from 'rsuite';
import Comment from './comment'
import { CommentsContext } from './../../Contexts/CommentsContext'
import { useCreateCommentMutation } from './../../GraphQL/Mutations/commentMutation'
import { useUserQuery } from './../../GraphQL/Queries/userQuery'
import './../../styles/comments.css'

function CommentSection(props) {

    const [showEditor, setShowEditor] = useState(false)
    const [body, setBody] = useState('')
    const [commentBody, setCommentBody] = useState('')
    const [createCommentMutation, createCommentMutationResults] = useCreateCommentMutation();
    const { postId } = props
    const userData = useUserQuery();

    const context = useContext(CommentsContext)

    if (!context) {
        return (
            <div>Loading</div>
        )
    }

    const { commentsList, setCommentsList, updateCommentsList } = context

    const handleClick = () => {
        setShowEditor(currState => !currState)
    }

    const handleCommentChange = (val, e) => {
        setCommentBody(val)
    }


    if (userData.loading) {
        return (
            <div>loading</div>
        )
    }
    if (userData.error) {
        return (
            <div> Error : Userdata.error </div>
        )
    }


    const { user } = userData.data.getMyProfile


    const handleSubmit = async () => {
        const mutation = await createCommentMutation(
            postId,
            commentBody,
        )

        const { data } = mutation

        updateCommentsList({
            id: "4",
            body: commentBody,
            user: {
                id: user.id,
                username: user.username
            }
        })
        setCommentBody('')
        setShowEditor(false)
    }

    const allComments = commentsList.map((c) => <Comment commentDetails={c} />)

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

    const commentInputTextarea = (
        <Input componentClass="textarea" rows={3} placeholder="Write your comment..." name="comment" componentClass="textarea" value={commentBody} onChange={handleCommentChange} />
    )

    return (
        <FlexboxGrid justify="end" className="comment-section">
            <FlexboxGrid.Item colspan={24}>
                <List size="sm" hover>
                    <List.Item className="small-heading"><h6>Comments</h6></List.Item>
                    {allComments}
                    {showEditor && commentInputTextarea}
                </List>
                {commentButton}
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}
export default CommentSection;