import React, { useState } from 'react'
import { Form, FormGroup, ControlLabel, HelpBlock, ButtonToolbar, Button, FormControl, Panel, FlexboxGrid } from 'rsuite'
import { useCreatePostMutation } from '../GraphQL/Mutations/createPostMutation';

import MdEditor from './../Components/mdEditor'
import './../styles/global.css'


function AddQuestionForm(props) {

    const [createPostMutation, createPostMutationResults] = useCreatePostMutation();

    const postType = 0
    const quesid = null

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')

    const handleSubmit = async () => {
        await createPostMutation(
            postType,
            quesid,
            title,
            body,
            tags
        )

        props.history.push('/questions')
    }

    const handleChange = (value, evt) => {
        if (evt.target.name === 'title') {
            setTitle(value)
        } else if (evt.target.name === 'tags') {
            setTags(value)
        }
    }

    const handleBodyChange = (body) => {
        setBody(body)
    }

    return (
        <Form onSubmit={handleSubmit} fluid>
            <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl name="title" type="text" onChange={handleChange} value={title} />
                <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Body</ControlLabel>
                <MdEditor handleChange={handleBodyChange} type="question" placeHolder="Write body of Question here..." />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Tags</ControlLabel>
                <FormControl name="tags" type="text" onChange={handleChange} value={tags} />
                <HelpBlock tooltip>Atleat 1 tag required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button type="submit" appearance="primary">Post Question</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form>
    )
}

export default AddQuestionForm