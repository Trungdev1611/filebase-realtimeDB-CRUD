import React from "react";
import styled from "styled-components";
import { AiOutlineEdit } from "react-icons/ai";
const StyledPostItem = styled.div`
  margin-top: 20px;
  border: 0.1px solid grey;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  .postitem-title {
    font-weight: bold;
    color: #6497b1;
  }
  .post-content {
    padding: 10px 0;
    text-align: justify;
    font-size: 14px;
  }
  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .author-email {
      font-style: italic;
    }
    & .author-name {
      color: #6497b1;
      font-weight: bold;
    }
  }
  .icon-edit {
    position: absolute;
    top: 10px;
    right: 10px;
    color: green;
    font-size: 20px;
  }
`;
const PostItem = ({
  title,
  email,
  description,
  author,
  setShowEditPost,
  showEditPost,
  setPostitemEdit,
  path,
}) => {
  function handleShowEditPost() {
    setShowEditPost(true);
    setPostitemEdit({ title, emal: email, description, author, path });
  }
  return (
    <StyledPostItem>
      <h3 className="postitem-title">{title}</h3>
      <div className="post-content">{description}</div>
      <div className="author">
        <div className="author-name">Author Name: {author}</div>
        <div className="author-email">Email: {email}</div>
      </div>
      <span className="icon-edit" onClick={handleShowEditPost}>
        <AiOutlineEdit />
      </span>
    </StyledPostItem>
  );
};

export default PostItem;
