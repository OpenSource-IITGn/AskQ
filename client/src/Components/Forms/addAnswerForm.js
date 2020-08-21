import React, { useState } from 'react';
import { Panel, FlexboxGrid, Button, Form, Alert } from 'rsuite'
import { useCreatePostMutation } from './../../GraphQL/Mutations/createPostMutation'

import MdEditor from '../Editor/mdEditor';
import './../../styles/global.css'
import { useUserQuery } from '../../GraphQL/Queries/userQuery';
import { useHistory } from 'react-router-dom';
import { unAuthorizedError, unknownError } from './../errorHandler'

function AddAnswerForm(props) {
    const questionId = props.match.params.id
    const history = useHistory();

    const [createPostMutation, createPostMutationResults] = useCreatePostMutation();

    const postType = 1
    const quesid = questionId
    const title = null
    // lame hack
    const tags = " , , , , "

    const [body, setBody] = useState('')
    const userData = useUserQuery();

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
        try {
            const mutation = await createPostMutation(
                postType,
                quesid,
                title,
                body,
                tags
            )

            const { data } = mutation
            const response = data.createPost

            if (response.ok === 202) {
                unAuthorizedError(response.error, history)
            } else {
                const ansId = data.createPost.error
                setBody("")
                props.onAnswerSubmit(
                    {
                        body: body,
                        comments: [],
                        createdAt: "0 mins",
                        updatedAt: "0 mins",
                        id: ansId,
                        user: {
                            id: user.id,
                            username: user.username
                        },
                        vote: 0
                    }
                )
            }
        } catch (e) {
            unknownError('Failed to add Answer')
        }

    }


    const handleBodyChange = (body) => {
        setBody(body)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Panel className="post-card">
                <MdEditor type="answer" handleChange={handleBodyChange} placeHolder="Write your answer here" />
                <FlexboxGrid justify="end">
                    <Button appearance="primary" type="submit">Submit</Button>
                </FlexboxGrid>
            </Panel >
        </Form>
    )
}

export default AddAnswerForm