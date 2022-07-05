/**
 * @author Wilbert Bocanegra Velazquez / Team core Softengy
 */
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

/**
 * @type {import('express').Application}
 * @const
 */
const app = express();

/**
 * @type {number}
 * @const
 */
const PORT = process.env.PORT;

/**
 * @type {string}
 * @const
 */
const SECRET_KEY = process.env.SECRET_KEY;

const whitelist = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3000",
];

/**
 * @description config options for cors
 * @type {import('cors').CorsOptions}
 */
const corsOptions = {
  origin: whitelist,
  credentials: true,
};

/**
 * @description libraries middleware for root
 */
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

/**
 * @author Wilbert Bocanegra Velazquez
 * @description - Method to sign in app
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.post("/auth/login", (req, res) => {
  /**
   * @type {{email:string,password:string}}
   */
  const { email, password } = req.body;

  const jwtEncode = jwt.sign({ email, password }, SECRET_KEY);

  res.cookie("auth_enthous_jwt", jwtEncode, {
    domain: "",
    secure: true,
    httpOnly: true,
  });
  res.cookie("isAuth", true, {
    domain: "",
    secure: true,
  });
  res.json({
    msg: "Success",
    code: 200,
    data: {},
  });
});

/**
 * @author Wilbert Bocanegra Velazquez
 * @description method to get a cookie
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.get("/auth/cookie", (req, res) => {
  const { cookies } = req;
  console.log(cookies);
  res.json({
    cookies,
  });
});

/**
 * @author Wilbert Bocanegra Velazquez
 * @description method to get a cookie
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

/**
 * @author Wilbert Bocanegra Velazquez
 * @description method to destroy a cookie
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.put("/auth/logout", (req, res) => {
  res.clearCookie("auth_enthous_jwt");
  res.clearCookie("isAuth");

  res.json({
    msg: "logout successfully",
    code: 200,
    data: {},
  });
});

/**
 * @description runnin server
 * @returns {void}
 */
app.listen(PORT, () => {
  console.debug(`> Listening on ${PORT}`);
});
