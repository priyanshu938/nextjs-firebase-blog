import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      M.toast({ html: `Welcome ${name}`, classes: "green" });
    } catch (error) {
      M.toast({ html: error.message, classes: "red" });
    }
  };
  return (
    <div className="container center">
      <h3>Please Signup!!</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            placeholder="type your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn #fb8c00 orange darken-1">
          signup
        </button>
        <Link href="/login">
          <h5>Already have an account</h5>
        </Link>
      </form>
    </div>
  );
};

export default signup;
