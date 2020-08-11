import React, { useState } from 'react'
import { Form, FormGroup, ControlLabel, HelpBlock, ButtonToolbar, Button, FormControl, Panel, FlexboxGrid } from 'rsuite'
import MdEditor from './../Components/mdEditor'
import './../styles/global.css'
function AddQuestionForm() {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')

    const handleSubmit = () => {

    }

    const handleChange = () => {

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
                <MdEditor type="question" placeHolder="Write body of Question here..." />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Tags</ControlLabel>
                <FormControl name="title" type="text" onChange={handleChange} value={title} />
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