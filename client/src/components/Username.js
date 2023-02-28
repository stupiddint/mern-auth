import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from 'react-hot-toast'
import {useFormik} from 'formik'
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store.js";

function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
// const username = useAuthStore(state => state.auth.username)

const formik = useFormik({
  initialValues: {
    username: ''
  },
  validate : usernameValidate,
  validateOnBlur: false,
  validateOnChange: false,
  onSubmit: async values => {
    // console.log(values)
    setUsername(values.username)
    navigate('/password')
  }
})

  return (
    <>
      <div className="container mx-auto my-auto">

        <Toaster position="top-center" reverseOrder={false} ></Toaster>


        <div className="flex flex-col justify-center items-center h-screen ">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h3 className=" text-3xl md:text-5xl font-bold ">Hello again</h3>
              <span className="py-3 text-xl w-2/3 text-center text-gray-500">
                Explore more by connecting with us
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit} >
              <div className="profile flex justify-center py-4">
                <img
                  src={avatar}
                  alt="avatar"
                  className={styles.profileimg}
                />
              </div>
              <div className={"textbox"}>
                <input {...formik.getFieldProps('username')} type="text" placeholder="Username" className={styles.textbox} />
                <button
                  type="submit"
                  className={styles.btn} >
                  Let's Go
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Not a Member?{" "}
                  <Link to="/register" className="text-red-500 hover:text-red-600 duration-200 ">
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
