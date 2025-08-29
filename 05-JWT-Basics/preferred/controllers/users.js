const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {username,password} = req.body;
    if (!username || !password) throw new CustomAPIError('No name or password provided',400);
    const id = new Date().getDate();
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'24h'});
    res.status(200).json({ msg: 'Login successful', token});
}

const hello = async (req,res) => {
     const prize = Math.floor(Math.random() * 1000);
     res.status(200).json({
       msg: `Hey, ${req.user.username}`,
       secret: `Congrats! You've won $${prize}!`,
     });
    
}
module.exports = {login,hello};