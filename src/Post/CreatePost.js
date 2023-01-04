import { signOut } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UseContextUser } from "../Context/AuthContext";
import { auth } from "../firebaseConfig";
import { shownotifyErr, shownotifySuccess } from "./../common/ShowToast";
const WrapperForm = styled.div`
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  h2 {
    text-align: center;
    color: gray;
  }
  .form-createpost {
    min-width: 350px;
    display: flex;
    padding: 20px;
    border-radius: 10px;
    flex-direction: column;
    gap: 15px;
    background-color: white;
  }
  .form-item {
    input {
      padding: 10px;
      border: 0.5px solid grey;
      border-radius: 10px;
      width: 100%;
      outline: none;
      color: gray;
      &::placeholder {
        color: gray;
      }
    }
    textarea {
      border-radius: 10px;
      padding: 10px 5px 10px 10px;
      width: 100%;
      outline: none;
      color: gray;
      &::placeholder {
        color: gray;
      }
    }
    .btn-createform {
      width: 100%;
      padding: 10px;
      background-color: #00f2fe;
      border-radius: 10px;
      outline: none;
      border: none;
      color: white;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
  }
`;
const CreatePost = (props) => {
  const userLogin = UseContextUser();
  const [contentPost, setContentPost] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (props.postItemEdit) {
      setContentPost(props.postItemEdit);
    }
  }, [props.postItemEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("contentPost:::", contentPost);
    //để tránh hiện tượng trùng key, nên sử dụng push method của firebase để tạo nên unique key
    //https://firebase.google.com/docs/database/web/lists-of-data
    const db = getDatabase();
    let postListRef;
    if (contentPost.path) {
      //update post
      postListRef = ref(db, `post/${userLogin?.uid}/${contentPost.path}`);
      set(ref(db, `post/${userLogin?.uid}/${contentPost.path}`), contentPost)
        .then(() => {
          // Data saved successfully!
          shownotifySuccess("Update post thành công");
        })
        .catch((error) => {
          console.log("errr", error);
          shownotifyErr("có lỗi xảy ra");
        });
    } else {
      //create post
      postListRef = ref(db, `post/${userLogin?.uid}`);
      const newPostRef = push(postListRef);
      set(newPostRef, contentPost);
      shownotifySuccess("Create post thành công");
      setTimeout(() => {
        navigate("/showpost");
      }, 2000);
    }
    setTimeout(
      () => props.setShowEditPost && props.setShowEditPost(false),
      2000
    );
    //clear input
    setContentPost({});
  }

  function handleSignout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("dataUser");
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  return (
    <WrapperForm>
      <form className="form-createpost" onSubmit={handleSubmit}>
        <h2>Create Post</h2>
        <div className="form-item">
          <input
            type="text"
            name="title"
            placeholder="Title Post"
            required
            value={contentPost ? contentPost.title : null}
            onChange={(e) => {
              setContentPost({
                ...contentPost,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-item">
          <input
            type="email"
            name="emal"
            placeholder="Your Email"
            value={contentPost ? contentPost?.emal : null}
            required
            onChange={(e) =>
              setContentPost({
                ...contentPost,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={contentPost ? contentPost?.author : null}
            required
            onChange={(e) =>
              setContentPost({
                ...contentPost,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item">
          <textarea
            rows={5}
            placeholder="Post content..."
            name="description"
            value={contentPost ? contentPost?.description : null}
            required
            onChange={(e) =>
              setContentPost({
                ...contentPost,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item">
          <button className="btn-createform">
            {contentPost.path ? "UpdatePost" : "CreatePost"}
          </button>
          <button
            className="btn-createform"
            style={{ marginTop: "20px" }}
            onClick={handleSignout}
            type="button"
          >
            Log out
          </button>
          <Link to="/showpost">
            <button
              className="btn-createform"
              style={{ marginTop: "20px" }}
              type="button"
              onClick={() =>
                props.setShowEditPost && props.setShowEditPost(false)
              }
            >
              ShowPost
            </button>
          </Link>
        </div>
      </form>
    </WrapperForm>
  );
};

export default CreatePost;
