import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../config.js'

/** middleware for verify user */
export async function verifyUser(req,res,next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}

/** POST: ..../api/register */
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // check for existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });

        resolve();
      });
    });
    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "This email is already linked" });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if(password){
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    
                    const user = new UserModel({
                        username,
                        password: hashedPassword,
                        profile: profile || '',
                        email
                    });
                    // return and save result as a response
                    user.save()
                        .then(result => res.status(201).send({msg: 'User registered successfullly'}))
                        .catch( error => res.status(500).send({error}))

                }).catch( error =>{
                    return res.status(500).send({
                        error: "Enable to hashed password"
                    })
                })
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** POST: ..../api/login */
export async function login(req, res) {
  const {username, password} = req.body;

  try {
    UserModel.findOne({username})
        .then(user =>{
            bcrypt.compare(password, user.password)
                .then(passwordCheck =>{
                    if(!passwordCheck) return res.status(400).send({error: "Don't have password"})

                    // create jwt token
                    const token = jwt.sign({
                        userId: user._id,
                        username: user.username
                        },env.JWT_SECRET, {expiresIn : "24h"});
                    
                    return res.status(200).send({
                        msg: "login successful...!",
                        username: user.username,
                        token
                    })


                })
                .catch(error => {
                    return res.status(400).send({error: "Password does not Match"})
                })
        })
        .catch( error => {
            return res.status(404).send(({ error: "Username not Found"}))
        })
  } catch (error) {
    res.status(500).send({error})
  }
}

/** GET: ..../api/user/:username */
export async function getUser(req, res) {
    const { username } = req.params;

    try {
        
        if(!username) return res.status(501).send({ error: "Invalid Username"});

        UserModel.findOne({ username }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }
}

/** PUT: ..../api/updateuser */
export async function updateUser(req, res) {
    try {
        
        const id = req.query.id;
        const { userId } = req.user;

        if(id){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ msg : "Record Updated...!"});
            })

        }else{
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error: `did not run` });
    }
}

export async function generateOTP(req, res) {
  res.json("generateOTP router");
}

export async function verifyOTP(req, res) {
  res.json("verifyOTP router");
}

export async function createResetSession(req, res) {
  res.json("createResetSession router");
}

/** PUT: ..../api/resetPassword */
export async function resetPassword(req, res) {
  res.json("resetPassword router");
}
