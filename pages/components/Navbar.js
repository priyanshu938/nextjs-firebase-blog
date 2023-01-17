import React from "react";
import Link from "next/link";
import { auth } from "../../firebase";

const Navbar = ({ user }) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper #4caf50 green">
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
                    className="btn #ff1744 red accent-3"
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
