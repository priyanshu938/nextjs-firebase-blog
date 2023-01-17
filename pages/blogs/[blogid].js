import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const blogPage = ({ blog }) => {
  console.log(blog);
  return (
    <div className="container center">
      <h2>{blog.title}</h2>
      <h5>Created on - {new Date(blog.createdAt).toDateString()}</h5>
      <img src={blog.imageUrl} alt={blog.title} />
      <p>{blog.body}</p>


      
      <style jsx global>
        {`
          body {
            color: orange;
          }
          img{
            width:100%;
            max-width:500px;
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

  return {
    props: {
      blog,
    },
  };
}
