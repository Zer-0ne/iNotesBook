import mongoose from 'mongoose'
const {Schema} = mongoose
const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:String,
        default:Date.now
    }
})

const Notes =mongoose.model('note',notesSchema)
export default Notes