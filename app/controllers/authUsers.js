const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  v1: {
    registerUser,
    logUser,
    rutaProtegidaController,
    verifyToken,
  },
};

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function validatePassword(password) {
  bcrypt.compare(password);
}

async function registerUser(req, res, next) {
  let { user_name, email, password } = req.body;
  if (email && !user_name) {
    user_name = email;
  }
  if (email && password) {
    try {
      let encriptedPassword = await encryptPassword(password);
      const user = await User.create({
        user_name,
        email,
        password: encriptedPassword,
      });
      const token = await jwt.sign(
        { id: user.user_id },
        process.env.SECRET_JWT,
        {
          expiresIn: 3600 * 24,
        }
      );

      console.log("token: ", token);
      res.status(201).json({
        id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        createdAt: user.createdAt,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ err: error });
    }
  } else {
    res.status(406).json({
      msg: "Email and password are requierd",
    });
  }
}

async function logUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const userFinded = await User.findOne({ where: { email: email } });

    if (!userFinded) {
      return res.status(404).json({ msg: "User not found" });
    }
    passwordVerified = await bcrypt.compare(password, userFinded.password);
    if (passwordVerified) {
      console.log(passwordVerified);
      const token = await jwt.sign(
        { id: userFinded.user_id },
        process.env.SECRET_JWT,
        {
          expiresIn: 3600 * 24,
        }
      );
      res.status(200).json({
        msg: "sign in",
        token: token,
      });
    } else {
      console.log(passwordVerified);
      return res.status(401).json({
        auth: false,
        msg: "incorrect Password",
      });
    }
  } catch (error) {}
}

async function rutaProtegidaController(req, res) {
  try {
    const token = req.headers["x-access-token"];
    if (token) {
      const userVerfied = await User.findOne({
        where: { user_id: req.userId },
        attributes: { exclude: ["password"] },
      });
      if (userVerfied) {
        res.json({ msg: "Hola a la ruta privada", userVerfied });
      } else {
        res.json({ msg: "No user found" });
      }
    }
  } catch (error) {
    //res.status(500).json({ msg: error });
    console.log(error);
  }
}

async function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (token) {
      const verify = await jwt.verify(token, process.env.SECRET_JWT);
      req.userId = verify.id;
      console.log(verify);
    } else {
      return res.status(401).json({
        auth: false,
        msg: "No token provided",
      });
    }
    next()
  } catch {
    res.status(401).json({
      auth: false,
      msg: "Invalid token provided",
    });
  }
 
}
