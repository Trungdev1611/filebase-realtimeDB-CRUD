import React from "react";
import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { UseContextUser } from "../Context/AuthContext";
import { getDatabase, ref, remove } from "firebase/database";
import { shownotifyErr, shownotifySuccess } from "../common/ShowToast";
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
      display: flex;
      align-items: center;
      gap: 10px;
      flex-direction: row-reverse;
    }
  }
  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: green;
    font-size: 20px;
    display: flex;
    gap: 10px;
  }
  & img {
    max-width: 30px;
    max-height: 30px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const actionPost = {
  edit: 1,
  delete: 2,
};
const PostItem = ({
  title,
  email,
  description,
  author,
  setShowEditPost,
  setPostitemEdit,
  path,
}) => {
  const userLogin = UseContextUser();

  function handleShowEditPost(id) {
    if (id === actionPost.edit) {
      setShowEditPost(true);
      setPostitemEdit({ title, emal: email, description, author, path });
    }
    if (id === actionPost.delete) {
      const db = getDatabase();
      let postListRef = ref(db, `post/${userLogin?.uid}/${path}`);
      console.log("deleteItem:::", `post/${userLogin?.uid}/${path}`);

      //delete data in firebaseRealtime

      remove(postListRef)
        .then(function () {
          console.log("Remove succeeded.");
          shownotifySuccess("Xóa bài viết thành công");
        })
        .catch(function (error) {
          console.log("Remove failed: " + error.message);
          shownotifyErr("có lỗi xảy ra");
        });
    }
  }
  return (
    <StyledPostItem>
      <h3 className="postitem-title">{title}</h3>
      <div className="post-content">{description}</div>
      <div className="author">
        <div className="author-name">
          <span>Author Name: {author}</span>
          <img src={userLogin.photoURL} alt="111" />
        </div>
        <div className="author-email">Email: {email}</div>
      </div>
      <span className="icon">
        <AiOutlineEdit onClick={() => handleShowEditPost(actionPost.edit)} />
        <AiOutlineDelete
          onClick={() => handleShowEditPost(actionPost.delete)}
        />
      </span>
    </StyledPostItem>
  );
};

export default PostItem;
