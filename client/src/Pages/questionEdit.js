import React from 'react'
import CreateQuestion from './createQuestion'
import Layout from './Layout/layout'

function QuestionEdit(props) {

    const postData = props.location.data
    const postId = props.match.params.id
    return (
        <CreateQuestion isEditing={true} postData={postData} postId={postId} {...props} />
    )
}
export default QuestionEdit