import React, { Component } from 'react';
import { convertToRaw, ContentState, EditorState, convertFromHTML, createFromBlockArray } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

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
        let initialContentState
        if (this.props.initialValue) {
            let initialValue = this.props.initialValue
            const blocksFromHTML = convertFromHTML(initialValue);
            initialContentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            );

        } else {
            initialContentState = ContentState.createFromText('')
        }
        const editorValue = EditorState.createWithContent(initialContentState);
        return (
            <div>
                <Editor
                    wrapperClassName="wrapper"
                    editorClassName="editor"
                    defaultEditorState={editorValue}
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder={this.props.placeHolder}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default MdEditor;