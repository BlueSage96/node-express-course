const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
     const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
       throw new CustomAPIError("Invalid or no token provided", 401);
     }
     const token = authHeader.split(" ")[1];
     try {
       const rosetta = jwt.verify(token, process.env.JWT_SECRET);
       const {id, username} = rosetta;
       req.user = {id, username};
       next();
     } catch (error) {
       throw new CustomAPIError("Not authorized, access denied!", 401);
     }   
}
module.exports = authenticationMiddleware