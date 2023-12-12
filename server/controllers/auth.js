import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import { existsEmail, existsUsername } from "../utils/utils.js";


export const signup = async(req, res) => {
    try{
        const {username, email, password} = req.body;

        console.log(username);

        if (!username || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Missing required fields.",
            });
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const usernameRegex = /^[a-zA-Z0-9_-]{3,15}$/;

        if (!emailRegex.test(email)) {
            res.status(400).json({
                success: false,
                message: "Email is not valid.",
            });
            return;
        }
        if (!passwordRegex.test(password)) {
            res.status(400).json({
                success: false,
                message:
                    "Password is not valid. Password must contain at least one letter (uppercase or lowercase) and one digit, and must be at least 8 characters in length.",
            });
            return;
        }
        if (!usernameRegex.test(username)) {
            res.status(400).json({
                success: false,
                message:
                    "Username must be between 3 to 15 characters and can only contain letters, numbers, hyphens, and underscores.",
            });
            return;
        }

        if (await existsUsername(username)) {
            res.status(409).json({
                success: false,
                message: "Username already exists.",
            });
            return;
        } 

        if (await existsEmail(email)) {
            res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
            return;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);


        const user = {
            username: username,
            email: email,
            password: passwordHash,
        };

        const userModel = new UserModel(user);
        await userModel.save();


        const userFromDb = await UserModel.findOne({
            username: username,
            email: email,
            password: passwordHash,
        });

        const id = userFromDb ? userFromDb.id.toString() : "none";

        const token = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET);

        console.log("User '", user.username, "' signed up at ", new Date());
        res.status(201).json({
            token: token,
            id: id,
            success: true,
            message: "Account created successfully",
        });
    }

    catch(e){
        res.status(500).json({
            success: false,
            message: "Error creating an account",
        });
    }


};


export const login = async(req, res) => {

    const { username_or_email, password } = req.body;

    if (!username_or_email || !password) {
        res.status(400).json({
            success: false,
            message: "Missing required fields",
        });
        return;
    }

    try {
        const user = await UserModel.findOne({
            $or: [
                { username: username_or_email },
                { email: username_or_email },
            ],
        });

        if (user == null) {
            res.status(400).json({
                success: false,
                message: "Username or Email doesn't exist",
            });
            return;
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign( user.username, process.env.ACCESS_TOKEN_SECRET);

            console.log("User ", user.username, " logged in at ", new Date());
            res.json({
                token: token,
                id: user.id,
                success: true,
                message: "Logged in successfully",
            });
        } 
        else {
            console.log("User ", user.username," failed login (incorrect password) at ",new Date());
            res.json({ success: false, message: "Password is incorrect" });
        }
    
    } 
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Error" });
    }
};

