import React, { useState } from 'react';
import { Panel, FlexboxGrid, Button, Form } from 'rsuite'
import { useCreatePostMutation } from './../../GraphQL/Mutations/createPostMutation'

import MdEditor from '../Editor/mdEditor';
import './../../styles/global.css'
import { useUserQuery } from '../../GraphQL/Queries/userQuery';

function AddAnswerForm(props) {
    const questionId = props.match.params.id

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

    console.log(createPostMutationResults)


    const handleSubmit = async () => {
        await createPostMutation(
            postType,
            quesid,
            title,
            body,
            tags
        )
        console.log(userData)
        // props.updateAnswerList(
        //     {

        //     }
        // )
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