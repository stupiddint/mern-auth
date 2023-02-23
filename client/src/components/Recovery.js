import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from 'react-hot-toast'
import {useFormik} from 'formik'
import { passwordValidate } from "../helper/validate";

function Recovery() {

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
      <div className="container mx-auto my-auto w-3/4">

        <Toaster position="top-center" reverseOrder={false} ></Toaster>


        <div className="flex flex-col justify-center items-center h-screen ">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h3 className=" text-3xl md:text-5xl font-bold ">Recovery</h3>
              <span className="py-3 text-xl w-2/3 text-center text-gray-500">
                Enter OTP to recover password.
              </span>
            </div>

            <form className="pt-10" onSubmit={formik.handleSubmit} >
             
              <div className={"textbox"}>
                
                <span className="py-4 flex justify-center  text-sm text-left text-gray-500 " >Enter 6 digit OTP sent to your email address.</span>
                <input type="text" placeholder="OTP sent" className={styles.textbox} />
                <button
                  type="submit"
                  className={styles.btn} >
                  Recover
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Can't get OTP?{" "}
                  <button className="text-red-500 hover:text-red-600 duration-200 ">
                    Resend
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recovery;
