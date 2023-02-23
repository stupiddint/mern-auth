import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from 'react-hot-toast'
import {useFormik} from 'formik'
import { resetPasswordValidation } from "../helper/validate";

function Reset() {

const formik = useFormik({
  initialValues: {
    password: 'admin@123',
    confirm_pwd: 'admin@123'
  },
  validate : resetPasswordValidation,
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
              <h3 className=" text-3xl md:text-5xl font-bold ">Reset</h3>
              <span className="py-3 text-xl w-2/3 text-center text-gray-500">
                New password
              </span>
            </div>

            <form className="py-10" onSubmit={formik.handleSubmit} >
              
              <div className={"textbox"}>
                <span className="text-xl w-2/3 text-center text-gray-700 px-5 ">Enter new password</span>
                <input {...formik.getFieldProps('password')} type="password" placeholder="New Password" className={styles.textbox} />
                <input {...formik.getFieldProps('confirm_pwd')} type="password" placeholder="Confirm Password" className={styles.textbox} />
                <br />
                <button
                  type="submit"
                  className={styles.btn} >
                  Reset
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reset;
