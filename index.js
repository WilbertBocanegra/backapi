/**
 * @author Wilbert Bocanegra Velazquez / Team core Softengy
 */
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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

const whitelist = [
  "https://one-wilbertbocanegra.vercel.app",
  "https://two-wilbertbocanegra.vercel.app",
];

/**
 * @type {import('cors').CorsOptions}
 */
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
 * @description method to sign in app
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.post("/auth/login", (req, res) => {
  res.cookie("auth_enthous_three", "que onda loco", {
    domain: ".vercel.app",
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

  res.json({
    cookies,
  });
});

/**
 * @author Wilbert Bocanegra Velazquez
 * @description method to destroy a cookie
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.put("/auth/remove", (req, res) => {
  res.clearCookie("auth_enthous_three");
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
