const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors/index");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;//check auth header
  // check for bearer and token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");//removed status code (401)
  }
  //split bearer
  const token = authHeader.split(" ")[1]; //second value

   try {
    //  pass in token and secret
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  new user object
     const {id, username} = decoded;
     req.user = {id,username};
      next();
   } catch (error) {
    // can't verify token
     throw new UnauthenticatedError("Not authorized to access this route");//removed status code (401)
   }
};
module.exports = authenticationMiddleware;
