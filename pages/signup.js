import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      M.toast({ html: `Welcome ${name}`, classes: "#4caf50 green" });
      router.push("/");
    } catch (error) {
      M.toast({ html: error.message, classes: "#ff1744 red accent-3" });
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
        <button type="submit" className="btn #4caf50 green">
          signup
        </button>
        <Link href="/login">
          <h5>Already have an account?</h5>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
