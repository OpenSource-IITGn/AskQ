import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class MdEditor extends Component {
    state = {
        editorState: undefined,
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    wrapperClassName="wrapper"
                    editorClassName="editor"
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder={this.props.placeHolder}
                />
                {/* <textarea
                    disabled
                    value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
                /> */}
            </div>
        );
    }
}

export default MdEditor;