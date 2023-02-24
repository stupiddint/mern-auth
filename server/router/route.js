import { Router } from "express";
import { compile } from "morgan";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js'

/** POST Method*/
router.route('/register').post(controller.register); // register user
  
// router.route('/registerMail').post((req,res)=>{  // send the email
//     res.send('registerMail route')
// })
router.route('/authenticate').post((req,res)=>{  // authenticate user
    res.end();
})
router.route('/loin').post(controller.login); // login in app

/** GET Method*/
router.route('/user/:username').get(controller.getUser);  // generate random OTP

router.route('/generateOTP').get(controller.generateOTP);  // verify generated OTP

router.route('/verifyOTP').get(controller.verifyOTP);   // verify generated OTP

router.route('createResetSession').get(controller.createResetSession);  // reset all the variables

/** PUT Method*/
router.route('/updateuser').put(controller.updateUser);  // is use to update the user profile
router.route('/resetPassword').put(controller.resetPassword);  // use to reset password
 

export default router;