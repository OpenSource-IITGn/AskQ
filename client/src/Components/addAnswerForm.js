import React, { useState } from 'react';
import { Panel, FlexboxGrid, Button } from 'rsuite'

import MdEditor from './mdEditor';
import './../styles/global.css'

function AddAnswerForm() {

    const [body, setBody] = useState('');

    const handleBodyChange = (body) => {
        setBody(body)
    }

    return (
        <Panel className="post-card">
            <MdEditor type="answer" handleChange={handleBodyChange} placeHolder="Write your answer here" />
            <FlexboxGrid justify="end">
                <Button appearance="primary">Submit</Button>
            </FlexboxGrid>
        </Panel >
    )
}

export default AddAnswerForm