import React from 'react';
import { Panel, FlexboxGrid, Button } from 'rsuite'

import MdEditor from './mdEditor';
import './../styles/global.css'

function AddAnswerForm() {
    return (
        <Panel className="post-card">
            <MdEditor type="answer" />
            <FlexboxGrid justify="end">
                <Button appearance="primary">Submit</Button>
            </FlexboxGrid>
        </Panel >
    )
}

export default AddAnswerForm