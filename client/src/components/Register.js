import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import converToBase64 from '../helper/convert'
import { registerUser } from "../helper/helper";



function Register() {
  const navigate = useNavigate();
  const [file,  setFile] = useState()

  const formik = useFormik({
    initialValues: {
      email: "dou343@gmail.com",
      username: "example123",
      password: "admin@123",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {profile: file || ''})
      console.log(values);
      let registerPromise = registerUser(values)
      console.log(`registerPromise ${registerPromise}`)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error: <b>Could not register</b>
      })
      registerPromise.then(function(){navigate('/')})
    },
  });

  /** formik doesn't support file upload so we need to create this handler */
  const onUpload = async e =>{
    const base64 = await converToBase64(e.target.files[0]);
    setFile(base64);
  }


  return (
    <>
      <div className="container mx-auto my-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex flex-col justify-center items-center h-screen ">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h3 className=" text-3xl md:text-5xl font-bold ">Register</h3>
              <span className="py-3 text-xl w-2/3 text-center text-gray-500">
                Happy to join you!
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    alt="avatar"
                    className={styles.profileimg}
                  />
                </label>
                <input onChange={onUpload} type="file" id="profile" name="profile" />
              </div>
              <div className={"textbox"}>
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="Email"
                  className={styles.textbox}
                />
                <input
                  {...formik.getFieldProps("username")}
                  type="text"
                  placeholder="Username"
                  className={styles.textbox}
                />
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  placeholder="Password"
                  className={styles.textbox}
                />
                <button type="submit" className={styles.btn}>
                  Register
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Already registered?{" "}
                  <Link
                    to="/"
                    className="text-violet-500 hover:text-violet-600 duration-200 "
                  >
                    Login Now
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

export default Register;
