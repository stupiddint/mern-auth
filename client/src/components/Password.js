import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from 'react-hot-toast'
import {useFormik} from 'formik'
import { passwordValidate } from "../helper/validate";

function Password() {

const formik = useFormik({
  initialValues: {
    password: 'admin@123'
  },
  validate : passwordValidate,
  validateOnBlur: false,
  validateOnChange: false,
  onSubmit: async values => {
    console.log(values)
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
                <input {...formik.getFieldProps('password')} type="password" placeholder="Password" className={styles.textbox} />
                <button
                  type="submit"
                  className={styles.btn} >
                  Sign In
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Forgot Password?{" "}
                  <Link to="/recovery" className="text-violet-500 hover:text-violet-600 duration-200 ">
                    Recover Now
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

export default Password;
