import express from "express";
import users from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/FetchUser.js";

const JWT_SECRET = "sahilisagoodboy";
const router = express.Router();

//ROUTES 1: Create a user using: POST '/api/auth/createuser' no login require
router.post(
    "/creatuser",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const error = validationResult(req);

        // if any error
        if (!error.isEmpty()) {
            return res.status(400).json({ error: arror.array() });
        }

        try {
            let user = await users.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "username already exist" });
            }

            // encrypt password with hash
            const salt = await bcryptjs.genSalt(10);
            const Secpassword = await bcryptjs.hash(req.body.password, salt);

            // create user
            user = await users.create({
                name: req.body.name,
                email: req.body.email,
                password: Secpassword,
            });

            // authentication token
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.send({ authToken });
        } catch (error) {
            // console.log(error.message);
            res.status(500).json("Internal Server Error");
        }
    }
);

//ROUTES 2: authenticate a user using post '/api/auth/login' no login required
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        // if any error
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { email, password } = req.body;
        try {
            // check is username is in our data base or not
            let user = await users.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            // compare password
            const comparePassword = await bcryptjs.compare(password, user.password);
            if (!comparePassword) {
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            // authentication token
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.send({ authToken });
        } catch (error) {
            // console.log(error.message);
            res.status(500).json("Internal Server Error");
        }
    }
);

// ROUTES 3:Get loggedin user datails using:POST '/api/auth/getuser'. Login required!
router.post(
    "/getuser",fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await users.findById(userId).select("-password");
            res.send(user)
        } catch (error) {
            // console.log(error.message);
            // res.status(500).json("Internal Server Error");
        }
    }
);
export default router;