import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import styles from "../styles/Username.module.css";
import { toast, Toaster } from 'react-hot-toast'
import { generateOTP, verifyOTP } from "../helper/helper";


function Recovery() {
  const {username} = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    generateOTP(username).then(OTP => {
      if(OTP) return toast.success('OTP has sent successfully.')
      return toast.error('Problem while generating OTP.')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();

    try {
      let status = await verifyOTP({username, coode: OTP});
    if(status == 201){
      toast.success('Verified successfully...!');
      return navigate('/reset')
    }
    } catch (error) {
      return toast.error('Wrong OTP! check email again!')
    }
  }
  // handler function of resend button
  function resendOTP(){
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise,{
      loading:'Sending...',
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not send it!</b>
    })
    sendPromise.then(OTP =>{
      console.log(OTP)
    })
  }

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

            <form className="pt-10" >
             
              <div className={"textbox"}>
                
                <span className="py-4 flex justify-center  text-sm text-left text-gray-500 " >Enter 6 digit OTP sent to your email address.</span>
                <input onChange={(e)=> setOTP(e.target.value)} type="text" placeholder="OTP sent" className={styles.textbox} />
                <button
                  type="submit" onClick={onSubmit}
                  className={styles.btn} >
                  Recover
                </button>
              </div>
             
            </form>

            <div className="text-center py-4">
                <span className="text-gray-500">
                  Can't get OTP?{" "}
                  <button onClick={resendOTP} className="text-red-500 hover:text-red-600 duration-200 ">
                    Resend
                  </button>
                </span>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recovery;
