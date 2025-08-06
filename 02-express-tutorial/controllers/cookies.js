const express = require("express");

const auth = (req, res, next) => {
  const checkCookies = req.cookies.name;
  if (checkCookies) {
    req.user = checkCookies;
    return next();
  }
  return res.status(401).json({ success: false, message: "Unauthorized access" });
};

const login = (req, res) => {
     const { name } = req.body;
     if (!name) {
       return res.status(400).json({ success: false, message: "Please enter a name." });
     }
     res.cookie("name", name);
     return res.status(201).json({ success: true, message: `Welcome ${name}!` });
}

const logout = (req, res) => {
     const user = req.cookies.name;
     res.clearCookie("name");
     res.status(200).json({ success: true, message: `${user} has logged off.` });
}

const testing = (req, res) => {
      return res.status(200).json({ success: true, message: `Hello ${req.user}!` });
}

module.exports = { auth, login, logout, testing };