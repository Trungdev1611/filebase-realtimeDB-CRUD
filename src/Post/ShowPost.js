import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { UseContextUser } from "../Context/AuthContext";
import PostItem from "./PostItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import CreatePost from "./CreatePost";

const PostContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 100%;
  overflow-x: hidden;

  .post-container {
    width: 80vw;
    position: relative;
    & .showpost-heading {
      font-size: 30px;
      text-align: center;
      margin-top: 20px;
    }
  }
`;
const ShowPost = () => {
  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const userLogin = UseContextUser();
  const [postItemEdit, setPostitemEdit] = useState(null);
  const db = getDatabase();
  useEffect(() => {
    function getDataInDatabaseRealTime(path) {
      try {
        const posttRef = userLogin && ref(db, "post/" + userLogin.uid);
        setLoading(true);
        posttRef &&
          onValue(posttRef, async (snapshot) => {
            const data = await snapshot.val();
            console.log("dât1", data);
            if (data) {
              let listkeys = Object.keys(data);
              let listValues = Object.values(data);
              let listDataConvert = listValues.map((item, index) => {
                return { ...item, keypath: listkeys[index] };
              });
              setListData(listDataConvert);
            }
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
      }
    }
    getDataInDatabaseRealTime();
  }, [db, userLogin]);
  console.log(111111, listData);
  if (loading) {
    return <Loading color={"#00ffc3"} loading={loading} />;
  }
  return (
    <>
      {showEditPost ? (
        <CreatePost
          showEditPost={showEditPost}
          setShowEditPost={setShowEditPost}
          postItemEdit={postItemEdit}
        />
      ) : (
        <PostContainer>
          <div className="post-container">
            <h2 className="showpost-heading">List Post</h2>

            {listData ? (
              listData.map((post, index) => {
                return (
                  <PostItem
                    title={post.title}
                    email={post.emal}
                    description={post.description}
                    author={post.author}
                    key={Math.random()}
                    path={post.keypath}
                    showEditPost={showEditPost}
                    setShowEditPost={setShowEditPost}
                    setPostitemEdit={setPostitemEdit}
                  />
                );
              })
            ) : (
              <h3 style={{ marginTop: "20px", textAlign: "center" }}>
                Chưa có bài post nào trong cơ sở dữ liệu
              </h3>
            )}
          </div>
          <div>
            <Link
              to="/"
              s
              style={{
                textDecoration: "none",
                color: "blue",
                margin: "10px",
                display: "inline-block",
              }}
            >
              CreatePost
            </Link>
          </div>
        </PostContainer>
      )}
    </>
  );
};

export default ShowPost;
