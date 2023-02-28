import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import Toast, { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../hooks/fetch.hook";
import { passwordValidate } from "../helper/validate";
import { useAuthStore } from "../store/store.js";
import { verifyPassword } from "../helper/helper";

function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "admin@123",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values);
      let loginPromise = verifyPassword({username, password: values.password})
      toast.promise(loginPromise, {
        loading : 'checking...',
        success: <b>Login Successfully...!</b>,
        error: <b>Password did not match</b>
      })
      loginPromise.then(res => {
        let {token} = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    },
  });
  if (isLoading) return <h1 className="text-xl font-bold">isLoading...</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  return (
    <>
      <div className="container mx-auto my-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex flex-col justify-center items-center h-screen ">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h3 className=" text-3xl md:text-5xl font-bold ">Hello { apiData?.firstName || username}</h3>
              <span className="py-3 text-xl w-2/3 text-center text-gray-500">
                Explore more by connecting with us
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <img src={apiData?.profile || avatar} alt="avatar" className={styles.profileimg} />
              </div>
              <div className={"textbox"}>
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  placeholder="Password"
                  className={styles.textbox}
                />
                <button type="submit" className={styles.btn}>
                  Sign In
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Forgot Password?{" "}
                  <Link
                    to="/recovery"
                    className="text-violet-500 hover:text-violet-600 duration-200 "
                  >
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
