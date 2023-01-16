import React from "react";
import Link from "next/link";
import { auth } from "../../firebase";

const Navbar = ({ user }) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper #fb8c00 orange darken-1">
          <Link href="/" className="brand-logo">
            NextBlogger
          </Link>
          <ul id="nav-mobile" className="right ">
            {user ? (
              <>
                <li>
                  <Link href="/createBlog">Create Blog</Link>
                </li>
                <li>
                  <button
                    className="btn red"
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signup">Signup</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
