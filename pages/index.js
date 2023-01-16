import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home({ blogs }) {
  //   const [user] = useAuthState(auth);
  //   const router = useRouter();
  //   useEffect(() => {
  //     if (!user) router.replace("/login");
  //   }, [user]);
  return (
    <div>
      <h1>I am home page</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.body}</p>
          <img src={blog.imageUrl} />
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const blogsCollectionRef = await collection(db, "blogs");
  const blogsSnapshot = await getDocs(blogsCollectionRef);
  const blogs = blogsSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
}
