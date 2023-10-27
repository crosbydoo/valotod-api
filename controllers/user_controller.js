const User = require("../models/user_model");
const CryptoJS = require("crypto-js");

module.exports = {
    updateUser: async (req, res) => {

        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body
                }, {new: true});
            const {password,__v, createdAt, ...others} = updatedUser._doc;

            res.status(200).json({ ...others });
        }catch (error) {
            res.status(500).json(err)
        }
    },

    //delete user
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("akun berhasil dihapus")
        } catch (error) {
            res.status(500).json(error);
        };
        
    },

    //get user
    getUser: async (req, res) => {
        try {
            const user =  await User.findById(req.params.id)
            const {password, __v, ...userData} = user._doc
           
            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json(error);
        };
        
    },

    //get user
    getAllUser: async (req, res) => {
        try {
            const allUser =  await User.find();
           
            res.status(200).json(allUser)
        } catch (error) {
            res.status(500).json(error);
        };
        
    }

}