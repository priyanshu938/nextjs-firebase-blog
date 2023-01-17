import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      M.toast({ html: `Successfully logged in!`, classes: "#4caf50 green" });
      router.push("/");
    } catch (error) {
      M.toast({ html: error.message, classes: "#ff1744 red accent-3" });
    }
  };
  return (
    <div className="container center">
      <h3>Please Login!!</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
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
          Login
        </button>
        <Link href="/signup">
          <h5>Don't have an account?</h5>
        </Link>
      </form>
    </div>
  );
};

export default login;
