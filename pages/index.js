import { useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";
export default function Home(props) {
  const [blogs, setBlogs] = useState(props.blogs);
  const [lastVisible, setLastVisible] = useState(false);

  const loadMore = async () => {
    const last = blogs[blogs.length - 1];
    const blogsCollectionRef = await collection(db, "blogs");
    const blogsQuery = await query(
      blogsCollectionRef,
      orderBy("createdAt", "desc"),
      startAfter(new Date(last.createdAt)),
      limit(3)
    );
    let newBlogs = [];
    const querySnapshot = await getDocs(blogsQuery);
    newBlogs = querySnapshot.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
        createdAt: item.data().createdAt.toMillis(),
      };
    });
    setBlogs([...blogs, ...newBlogs]);
    if (newBlogs.length < 3) setLastVisible(true);
  };

  return (
    <div className="center">
      {blogs.map((blog) => (
        <div key={blog.id} className="card">
          <div className="card-image">
            <img src={blog.imageUrl} />
            <span className="card-title">{blog.title}</span>
          </div>
          <div className="card-content">
            <p>{blog.body}</p>
          </div>
          <div className="card-action">
            <Link href={`/blogs/${blog.id}`}>
              <span>Read More</span>
            </Link>
          </div>
        </div>
      ))}
      {lastVisible ? (
        <h5>No more blogs to load</h5>
      ) : (
        <button className="btn #4caf50 green" onClick={loadMore}>
          Load more
        </button>
      )}
      <style jsx>{`
        .card {
          max-width: 500px;
          margin: 22px auto;
        }
        p {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const blogsCollectionRef = await collection(db, "blogs");
  const blogsQuery = await query(
    blogsCollectionRef,
    orderBy("createdAt", "desc"),
    limit(3)
  );
  let blogs = [];
  const querySnapshot = await getDocs(blogsQuery);
  blogs = querySnapshot.docs.map((item) => {
    return {
      id: item.id,
      ...item.data(),
      createdAt: item.data().createdAt.toMillis(),
    };
  });

  return {
    props: {
      blogs,
    },
  };
}
