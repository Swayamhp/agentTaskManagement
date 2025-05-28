import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  mobNumber:{
  type:String,
  required:true,
  },
  countryCode:{
    required:true,
      type:String,
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  tasks:[]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
