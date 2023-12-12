import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  submissions: Array,
  problems_starred: Array,
  problems_solved: Array,
  problems_attempted: Array,
  problems_solved_count: {
    type: Number,
    default: 0,
  },

  rank: Number,
  views: {
    type: Number,
    default: 0,
  },

  solution_count: {
    type: Number,
    default: 0,
  },
  
  reputation_count: {
    type: Number,
    default: 0,
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
