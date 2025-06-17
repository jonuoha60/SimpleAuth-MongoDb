import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: { type: String, required: true },
  password: { type: String, required: true},
  confirmPassword: { type: String, required: true},
  
})

UserSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('userdb', UserSchema);
export default UserModel;
