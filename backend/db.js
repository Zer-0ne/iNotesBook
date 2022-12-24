import mongoose from 'mongoose'

const mongooseUri = 'mongodb://localhost:27017/data'
const connect = ()=>{mongoose.connect(mongooseUri,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4
}).then(()=>{
    console.log('Connected!!');
}).catch((e)=>{
    console.log("Not conntected");
})}
export default connect;