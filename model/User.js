import { mongoose } from "mongoose";

//Number,String, Boolean
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true, // should alwys present
      maxlength: 32, // maximum length
      trim: true, // trim all the extra spaces
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePic: {
      type: String,
      required: false,
    },
    // todoList: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timespams: true }
);

const user = mongoose.model("User", userSchema);

export default user;
