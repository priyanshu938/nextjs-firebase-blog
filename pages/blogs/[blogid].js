import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";

const blogPage = ({ blog, user, comments }) => {
  const [myComment, setMyComment] = useState("");
  const [allComments, setAllComments] = useState(comments);
  const router = useRouter();
  const { blogid } = router.query;
  const makeComment = async () => {
    const blogDocRef = doc(db, "blogs", blogid);
    const colRef = collection(blogDocRef, "comments");
    await addDoc(colRef, {
      text: myComment,
      name: user.email,
      createdAt: serverTimestamp(),
    });
    const blogComments = query(
      collection(db, `blogs/${blogid}/comments`),
      orderBy("createdAt", "desc")
    );
    const commentsSnapshot = await getDocs(blogComments);
    comments = commentsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAllComments(comments);
    setMyComment("");
  };
  return (
    <div className="container center">
      <h2>{blog.title}</h2>
      <h5>Created on - {new Date(blog.createdAt).toDateString()}</h5>
      <img src={blog.imageUrl} alt={blog.title} />
      <p>{blog.body}</p>
      {user ? (
        <div>
          <div className="input-field">
            <input
              type="text"
              placeholder="add a comment"
              value={myComment}
              onChange={(e) => {
                setMyComment(e.target.value);
              }}
            />
          </div>
          <button className="btn #fb8c00 orange darken-1" onClick={makeComment}>
            Make comment
          </button>
        </div>
      ) : (
        <h4><span>Please Login to make comments</span></h4>
      )}

      <hr />
      <div className="left-align">
        {allComments.map((item) => {
          return (
            <h6 key={item.id}>
              <span>{item.name}</span> {item.text}
            </h6>
          );
        })}
      </div>
      <style jsx global>
        {`
          body {
            color: orange;
          }
          img {
            width: 100%;
            max-width: 500px;
          }
          span {
            font-weight: 800;
          }
        `}
      </style>
    </div>
  );
};

export default blogPage;

export async function getServerSideProps({ params: { blogid } }) {
  const blogDoc = doc(db, "blogs", blogid);
  let blog = await getDoc(blogDoc);
  blog = {
    id: blogid,
    ...blog.data(),
    createdAt: blog.data().createdAt.toMillis(),
  };

  //for blogs comment according to the blog (comments are the subcollection inside blogs collection)
  const blogComments = query(
    collection(db, `blogs/${blogid}/comments`),
    orderBy("createdAt", "desc")
  );
  const commentsSnapshot = await getDocs(blogComments);
  let comments = commentsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    createdAt: doc.data().createdAt.toMillis(),
  }));

  return {
    props: {
      blog,
      comments,
    },
  };
}
