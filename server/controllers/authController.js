const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../jwt.js");
const dns = require("dns");
const nodemailer = require('nodemailer');
require("dotenv").config();

async function sendMail(username, email, purpose, otp) {
  // create an email transporter
  const transporter = nodemailer.createTransport({
      service : 'gmail',
      auth : {
          user : process.env.USER_MAIL,
          pass : process.env.APP_PASSWORD
      }
  })

  // configure email content
  let mailOptions;
  if(purpose == 'paymentMail') {
    mailOptions = {
      from : process.env.USER_MAIL,
      to : email,
      subject : "Shop.co - Payment Successfull",
      text : `Hi ${username}, We have recieved your payment successfully. Thank you for your purchase`
    }
  } else if(purpose == 'otpMail') {
    mailOptions = {
      from : process.env.USER_MAIL,
      to : email,
      subject : "Shop.co - OTP Recieved",
      text : `Hi ${username}, Your OTP is ${otp}`
    }
  } else if(purpose == 'emailUpdate') {
    mailOptions = {
      from : process.env.USER_MAIL,
      to : email,
      subject : "Shop.co - Email Updated",
      text : `Hi ${username}, Your email is updated successfully`
    }
  }

  // send mail
  try {
      const result = transporter.sendMail(mailOptions);
      console.log("Email sent successfully")
  } catch(error) {
      console.log('error', error)
  }
}

function isDomainValid(domain) {
  return new Promise((resolve, reject) => {
    dns.resolveMx(domain, (error, addresses) => {
      if (error) {
        resolve(false);
      } else {
        resolve(addresses && addresses.length > 0);
      }
    });
  });
}

async function handleRegister(req, res) {
  try {
    const { username, email, password, isAdmin, role } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      // user already exist
      res.status(400).json({ error: "email already registered" });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      // checking if the email's domain is valid or not
      const domain = email.split("@")[1];
      const isValid = await isDomainValid(domain);

      if (isValid) {
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          role,
          salt,
        });

        const response = await newUser.save();
        console.log("user registered");

        const payload = {
          id: response.id,
          email: response.email,
        };

        const token = generateToken(payload);
        res.status(200).json({ response: response, token: token });
      } else {
        res.status(400).json("invalid domain");
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleLogin(req, res) {
  try {
    // extract email & password from request body
    const { email, password, isAdmin } = req.body;

    // find user by email
    const user = await User.findOne({ email: email });


    // if user doesn't exist or password doesn't match return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json("Invalid email or password");
    }

    if((isAdmin && user.role == "admin") || (!isAdmin && user.role == "user")) {
      // generate token
      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = generateToken(payload);

      // return token or response
      res.json({ user : user, token : token });
    } else {
      res.status(401).json("you are not an authorized person");
    }

    
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}

async function getUserProfile(req, res) {
  try {
    const userData = req.user;
    const user = await User.findById(userData.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handlePassportAuth(email, password, done) {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "invalid email" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          return done(null, false, { message: "invalid password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
}

async function handlePayment(req, res) {
  try {
    const {id} = req.query;
    const {amount} = req.body;
    const user = await User.findById(id);
    console.log('user', user);
    
    const remainingAmount = user.amount - amount;
    console.log('amount', remainingAmount);

    if (remainingAmount < 0 || user.amount < amount) {
      return res.status(400).json({ error: "Insufficient amount" });
    }

    user.amount = remainingAmount;
    await user.save();
    
    // const response = await User.findByIdAndUpdate(id, , {
    //   new: true, // it returns the updated data
    //   runValidators: true, // it will run mongoose validators
    // });
    sendMail(user.username, user.email, 'paymentMail');
    console.log('data updated');
    // console.log(response);
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error : "Internal Server Error"});
  }
}

async function handleUpdatePassword(req, res) {
  try {
    const {currentPassword, newPassword, userId} = req.body;
    const user = await User.findById(userId);
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json(user);
  } catch(error) {
    res.status(500).json({message : error.message});
  }
}

async function handleSendOtp(req, res) {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      res.status(404).json({message : 'user not found'});
    }
    const OTP = Math.floor(100000 + Math.random() * 900000);
    user.otp = OTP;
    await user.save();
    sendMail(user.username, user.email, 'otpMail', OTP);
    res.status(200).json({message : 'otp sent successfully'});

  } catch(error) {
    res.status(500).json({message : error.message});
  }
}

async function handleUpdateEmail(req, res) {
  try {
    const {userId, email, otp} = req.body;
    const user = await User.findById(userId);
    if(!user) {
      res.json('user not found');
    }
    if(user.otp == otp) {
      user.email = email;
    }
    await user.save();
    sendMail(user.username, email, 'emailUpdate')
    res.status(200).json('email updated');
  } catch(error) {
    res.status(500).json({message : error.message});
  }
}

module.exports = {
  handleRegister,
  handleLogin,
  getUserProfile,
  handlePassportAuth,
  handlePayment,
  handleUpdatePassword,
  handleSendOtp,
  handleUpdateEmail
};
