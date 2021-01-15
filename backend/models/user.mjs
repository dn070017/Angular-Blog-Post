import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:          { type: String, required: true, unique: true },
    password:          { type: String, required: true },
    email:             { type: String, required: true, unique: true },
    createDate:        { type: Date,   required: false, default: Date.now }
}, { collection : 'user' });

const User = mongoose.model('User', userSchema);
export default User;