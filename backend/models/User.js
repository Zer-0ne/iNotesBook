import mongoose from 'mongoose'
const {Schema} = mongoose
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const users =mongoose.model('user',userSchema)
export default users 