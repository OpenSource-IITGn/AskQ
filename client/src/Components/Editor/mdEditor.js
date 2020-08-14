import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';


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

    handleChange = () => {
        const { editorState } = this.state;
        const value = editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))
        this.props.handleChange(value);
    }

    render() {
        return (
            <div>
                <Editor
                    wrapperClassName="wrapper"
                    editorClassName="editor"
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder={this.props.placeHolder}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default MdEditor;