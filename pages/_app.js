import "../styles/globals.css";
import Head from "next/head";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
        ></script>
        <title>NextBlogger</title>
      </Head>
      <Navbar user={user} />
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;
