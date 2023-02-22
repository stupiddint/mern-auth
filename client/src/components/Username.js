import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";

function Username() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center h-screen ">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h3 className="text-5xl font-bold ">Hello again</h3>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Explore more by connecting with us
              </span>
            </div>

            <form action="" className="py-1">
              <div className="profile flex justify-center py-4">
                <img
                  src={avatar}
                  alt="avatar"
                  className={styles.profileimg}
                />
              </div>
              <div className={"textbox"}>
                <input type="text" placeholder="Username" />
                <button
                  type="submit"
                  className="bg-blue-300 hover:bg-blue-400 duration-300 ml-1"
                >
                  Let's Go
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Not a Member?{" "}
                  <Link to="/register" className="text-red-500">
                    Register Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Username;
