const User = require("../models/user_model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {

    // Register User
    registerUser: async (req, res)=>{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            fullname: req.body.fullname,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        });

        try{
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }catch (error) {
            res.status(500).json(error)
        }
    },

    //Login User
    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            !user && res.status(401).json("Wrong login details");

            const decryptedpass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const depassword = decryptedpass.toString(CryptoJS.enc.Utf8);

            //check equal password
            depassword !== req.body.password && res.status(401).json("Wrong Password");

            // jwt token
            const userToken = jwt.sign({
                id: user._id, isAdmin: user.isAdmin,
            }, process.env.JWT,
                { expiresIn: "21d" });

            //exclude to prevent this sendback to user
            const { password, __v, createdAt, ...others } = user._doc;

            res.status(200).json({...others, userToken});
        }catch (error){
            res.status(500)
        }
    }
    
}