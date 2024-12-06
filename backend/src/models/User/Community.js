const mongoose= require('mongoose')

const communitySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    membersCount:{
        type:Number,
        default:0,
        min:0
    }
},
{timestamps:true})

module.exports=mongoose.model('Community',communitySchema)