import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";
export default function Home({ blogs }) {
  //   const [user] = useAuthState(auth);
  //   const router = useRouter();
  //   useEffect(() => {
  //     if (!user) router.replace("/login");
  //   }, [user]);
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
            <Link href={`/blogs/${blog.id}`}>Read More</Link>
          </div>
        </div>
      ))}
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
