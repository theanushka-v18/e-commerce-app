const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../jwt.js");
const dns = require("dns");

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
      return res.status(401).json({ error: "Invalid email or password" });
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
    res.status(500).json({ error: "Internal server error" });
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

module.exports = {
  handleRegister,
  handleLogin,
  getUserProfile,
  handlePassportAuth
};
