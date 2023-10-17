const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    imageProfile: {
      type: String,
      required: true,
      default:
        "https://cdn.discordapp.com/attachments/1104115558649176094/1163735661812133888/1200.png?ex=6540a84a&is=652e334a&hm=4d11b03a23cb532af67755ab15db8ed0cfd6afb7cb36cabb1d7692bd8bbcaa34&",
      },
    }, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);