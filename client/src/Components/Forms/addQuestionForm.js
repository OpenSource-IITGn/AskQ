import React, { useState } from 'react'
import { Form, FormGroup, ControlLabel, HelpBlock, ButtonToolbar, Button, FormControl, Panel, FlexboxGrid, Alert } from 'rsuite'
import { useCreatePostMutation, useUpdatePostMutation } from '../../GraphQL/Mutations/createPostMutation';

import MdEditor from '../Editor/mdEditor'
import './../../styles/global.css'
import { unknownError } from '../errorHandler';


function AddQuestionForm(props) {

    const [createPostMutation, createPostMutationResults] = useCreatePostMutation();
    const [updatePostMutation, updatePostMutationResults] = useUpdatePostMutation();

    const { isEditing, postData, postId } = props

    const postType = 0
    const quesid = null

    var [title_var, body_var, tags_var] = ['', '', '']

    if (isEditing) {
        const [title_, body_, tags_] = [postData.title, postData.body, postData.tags]
        var tagsString = ''
        tags_.forEach(e => {
            if (e.length !== 0) {
                tagsString += e + ','
            }
        });
        title_var = title_
        body_var = body_
        tags_var = tagsString
    }


    const [title, setTitle] = useState(title_var)
    const [body, setBody] = useState(body_var)
    const [tags, setTags] = useState(tags_var)


    const handleSubmit = async () => {

        try {
            const pid = postId
            const response = isEditing ?
                await updatePostMutation(
                    pid,
                    title,
                    body,
                    tags
                ) : await createPostMutation(
                    postType,
                    quesid,
                    title,
                    body,
                    tags
                )
            if (response.data.createPost && response.data.createPost.ok === 202) {
                return (
                    <div>
                        response.createPost.error
                    </div>
                )
            }
            if (response.data.createPost && response.data.createPost.ok === 300) {
                const createdPostId = response.data.createPost.error
                props.history.push(`/questions/${createdPostId}`)
            }
            if (response.data.updatePost && response.data.updatePost.ok === 300) {
                const createdPostId = response.data.updatePost.error
                props.history.push(`/questions/${createdPostId}`)
            }
            unknownError(response.data.createPost.error)
            props.history.push(`/questions/page=1`)

        }
        catch (e) {
            unknownError('Failed to add Question - Try again')
        }
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
                <MdEditor initialValue={body} handleChange={handleBodyChange} type="question" placeHolder="Write body of Question here..." />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Tags</ControlLabel>
                <FormControl name="tags" type="text" onChange={handleChange} value={tags} />
                <HelpBlock tooltip>Atleat 1 tag required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button type="submit" appearance="primary">
                        {isEditing ? 'Update Question' : 'Post Question'}
                    </Button>
                </ButtonToolbar>
            </FormGroup>
        </Form>
    )
}

export default AddQuestionForm