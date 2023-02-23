import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import converToBase64 from '../helper/convert'



function Profile() {
  const [file,  setFile] = useState()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: "dou343@gmail.com",
      mobile: '',
      username: "example123",

    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {profile: file || ''})
      console.log(values);
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
              <h3 className=" text-3xl md:text-5xl font-bold ">Profile</h3>
              <span className="py-3 text-xl w-2/3 text-center text-gray-500">
                You can update the details.
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

              <div className={"textbox mx-auto flex justify-center flex-col items-center "}>
                <div className="name flex w-3/4 gap-10 ">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="FirstName"
                  className={styles.textbox}
                />
                 <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder="LastName"
                  className={styles.textbox}
                />
                </div>

                <div className="name flex w-3/4 gap-10 ">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  placeholder="Mobile no"
                  className={styles.textbox}
                />
                 <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="Email"
                  className={styles.textbox}
                />
                </div>

                <div className="w-[83%] mx-auto flex flex-col gap-2">
                <input
                  {...formik.getFieldProps("address")}
                  type="text"
                  placeholder="Address"
                  className={styles.textbox}
                />
               <button type="submit" className={styles.btn}>
                  Update
                </button>
                </div>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  come back later?{" "}
                  <Link
                    to="/"
                    className="text-red-500 hover:text-red-600 duration-200 "
                  >
                    Logout
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

export default Profile;
