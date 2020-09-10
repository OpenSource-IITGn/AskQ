import React, { useState } from "react";
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "./../../GraphQL/Mutations/commentMutation";

import { List, FlexboxGrid, Button, ButtonToolbar, Input } from "rsuite";

import { ReactComponent as EditLogo } from "./../../assets/Edit.svg";
import { ReactComponent as DeleteLogo } from "./../../assets/Delete.svg";
import { ReactComponent as TickLogo } from "./../../assets/Tick Square.svg";
import { ReactComponent as CloseLogo } from "./../../assets/Close Square.svg";
import { sucessAlert, unknownError } from "../errorHandler";

function Comment(props) {
  const { commentDetails, handleDeleteComment } = props;
  const { body, id, user } = commentDetails;
  const { username } = user;

  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const [newCommentBody, setNewCommentBody] = useState(body);

  const [
    updateCommentMutation,
    updateCommentMutationResults,
  ] = useUpdateCommentMutation();

  const [
    deleteCommentMutation,
    deleteCommentMutationResults,
  ] = useDeleteCommentMutation();

  const handleEditToggle = () => {
    setShowCommentEditor(!showCommentEditor);
  };

  const handleCommentEdit = (val) => {
    setNewCommentBody(val);
  };

  const handleCommentUpdate = async () => {
    try {
      setNewCommentBody(newCommentBody);
      setShowCommentEditor(false);
      const response = await updateCommentMutation(id, newCommentBody);
      if (response.data && response.data.updateComment) {
        if (response.data.updateComment.ok === 300) {
          sucessAlert("Deleted Successfuly");
        } else {
          unknownError("Update Failed");
        }
      } else {
        unknownError("Update Failed");
      }
    } catch {
      unknownError("Update Failed");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCommentMutation(id);
      if (response.data && response.data.deleteComment) {
        const ok = response.data.deleteComment.ok;
        if (ok === 300) {
          handleDeleteComment(id);
          sucessAlert("Deleted Successfuly");
        }
      } else {
        unknownError(`Delete Failed -${response.data.deleteComment.error}`);
      }
    } catch {
      unknownError("Delete Failed");
    }
  };

  const commentEditTextarea = (
    <div>
      <Input
        componentClass="textarea"
        rows={3}
        name="comment"
        componentClass="textarea"
        value={newCommentBody}
        onChange={handleCommentEdit}
      />
      <ButtonToolbar>
        <Button onClick={handleEditToggle}>
          <CloseLogo />
        </Button>
        <Button onClick={handleCommentUpdate}>
          <TickLogo />
        </Button>
      </ButtonToolbar>
    </div>
  );

  const commentBox = (
    <FlexboxGrid justify="space-between" className="full-width">
      <FlexboxGrid.Item>{newCommentBody}</FlexboxGrid.Item>
      <FlexboxGrid.Item>
        asked 13 mins ago <a href="https://www.google.com">{username}</a>
        <ButtonToolbar>
          <Button onClick={handleEditToggle}>
            <EditLogo />
          </Button>
          <Button onClick={handleDelete}>
            <DeleteLogo />
          </Button>
        </ButtonToolbar>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );

  return (
    <List.Item className="comment">
      {showCommentEditor ? commentEditTextarea : commentBox}
    </List.Item>
  );
}
export default Comment;
