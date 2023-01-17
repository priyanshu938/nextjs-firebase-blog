import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CreateBlog = ({ user }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const blogsCollectionRef = collection(db, "blogs");
  useEffect(() => {
    if (url) {
      try {
        const newPost = {
          title,
          body,
          imageUrl: url,
          postedBy: user.uid,
          createdAt: serverTimestamp(),
        };
        addDoc(blogsCollectionRef, newPost);
        M.toast({ html: `Blog post created!`, classes: "green" });
        setTitle("");
        setBody("");
        setImage(null);
        setUrl("");
      } catch (error) {
        M.toast({ html: `error in creating blog!`, classes: "red" });
      }
    }
  }, [url]);

  const submitDetails = () => {
    if (!title || !body || !image) {
      M.toast({
        html: `Please upload all the fields!`,
        classes: "#ff1744 red accent-3",
      });
      return;
    }
    const uploadRef = ref(storage, `image/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(uploadRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress == "100")
          M.toast({
            html: `image uploaded successfully!`,
            classes: "#4caf50 green",
          });
      },
      (error) => {
        M.toast({ html: error.message, classes: "#ff1744 red accent-3" });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="input-field rootdiv">
      <h3>Create blog!!</h3>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #4caf50 green">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        type="submit"
        className="btn #4caf50 green"
        onClick={submitDetails}
      >
        Submit post
      </button>

      <style jsx>{`
        .rootdiv {
          margin: 30px auto;
          max-width: 600px;
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default CreateBlog;
