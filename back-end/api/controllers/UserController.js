/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const saltRounds = 8;
const passport = require('passport');
const nodemailer = require('nodemailer');
require('dotenv').config();

// create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL_ADDRESS, // sender address
    to: 's2cuacon@gmail.com', // list of receivers
    subject: 'Jira-demo: Account password', // Subject line
    html: '<span><b>Your password: </b></span>' // html body
};

const validateEmail = (email) => {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}

const validatePassword = (password) => {
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
}

let save_user;

module.exports = {
    getUsers: async(req, res) => {
        try {
            const users = await User.find();
            res.send({users});
        }
        catch(err) {
            res.send({err});
        }    
    },

    login: async(req, res) => {
        try {
            const {email, password} = req.body.input;
            if(validateEmail(email) && validatePassword(password)) {
                const user = await User.find({email});
                if(user && user.length === 1) {
                    const checkPass = await bcrypt.compare(password, user[0].password);
                    if(checkPass) {
                        transporter.sendMail({
                            from: process.env.EMAIL_ADDRESS, // sender address
                            to: 's2cuacon@gmail.com', // list of receivers
                            subject: 'Jira-demo: Account password', // Subject line
                            html: `<h2>Account Password without Google Login</h2><span><b>Your password: </b>${password}</span>` // html body
                        }, function(error, info){
                            if(error){
                                console.log(error);
                            }else{
                                console.log('Message sent: ' + info.response);
                            }
                        });
                        return res.json({user, type: 7, token: jwToken.sign(user)});
                    }
                    return res.json({type: 5, mess: "Wrong password!"});
                }
                else {
                    return res.json({type:6, mess: "Cannot find the user"});
                }
                
            }
            else {
                if(validateEmail(email)) {
                    return res.json({mess: "Invalid password!", type:2});
                }
                else if(validatePassword(password)) {
                    return res.json({mess: "Invalid email!", type:3});
                }

                return res.json({mess: "Invalid email and password", type:4});
            }
        }
        catch(err) {
            return res.json({mess:err});
        }
    },
  
    signup: async (req, res) => {
        try {
            const {email, password} = req.body.input;
            if(validateEmail(email) && validatePassword(password)) {
                const numberUsers = await User.find({email: email});
                if(numberUsers.length === 0) {
                    const hash_pass = bcrypt.hashSync(password, saltRounds);
                    await User.create({email, password: hash_pass});
                    return res.json({mess: "Sign-Up Successfully!", type: 0});
                    
                }
    
                return res.json({mess: "Email has exist!", type: 1});
            }
            else {
                if(validateEmail(email)) {
                    return res.json({mess: "Invalid password!", type:2});
                }
                else if(validatePassword(password)) {
                    return res.json({mess: "Invalid email!", type:3});
                }

                return res.json({mess: "Invalid email and password", type:4});
            }
        }
        catch(err) {
            return res.json({mess:err});
        }
        
    },

    googleAuth: function(req, res) {
        passport.authenticate('google', { scope: ['profile', 'email']})(req, res);
    },
    
    googleCallback: function(req, res ,next) {
        
        passport.authenticate('google',{session: false}, async function(err, user) {
            try  {
                if(err) {
                    console.log('google callback error: '+ err);
                    return res.json({mess: "redirect"});
                } else {
                    console.log('google credentials ', user);
                    const findUser = await User.find({googleId: user.googleId});
                    console.log(findUser);
                    if(findUser.length === 0) {
                        await User.create({
                            email: user.email,
                            googleId: user.googleId
                        });

                        const userCreated = await User.find({googleId: user.googleId});

                        save_user = {...userCreated};
                    }
                    else {
                        save_user = {...findUser};
                    }
                    return res.redirect("http://localhost:3000/login/success");
                }
            }
            catch(err) {
                console.log(err);
            }
            
        })(req, res, next);
    },


    getUserGoogle: async (req, res) => {
        return res.json({user: save_user, token: jwToken.sign(save_user)});
    },

    'check': function(req, res) {
       console.log(req.user);
       return res.json(req.user);
    },
};

