import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export function authenticateToken(req, res, next){
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid token" });
    }
    req.user = decoded.toString();
    next();
  });
}


