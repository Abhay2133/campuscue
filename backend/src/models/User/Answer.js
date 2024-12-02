const mongoose=require('mongoose')
const answerSchema=new mongoose.Schema(
    {
        body:{
            type:String,
            required:true,
        },
        question:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question',
            required:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        vote:{
            type:Number,
            default:0
        },
    },
    {timestamps:true}
)

module.exports=mongoose.model('Answer',answerSchema)