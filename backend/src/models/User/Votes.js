const mongoose= require('mongoose')

const voteSchema=new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    targetType: { type: String, enum: ['Question', 'Answer', 'Post'], required: true },
    type: { type: String, enum: ['upvote', 'downvote'], required: true },
    },
    {timestamps:true}
)
module.exports=mongoose.model('Vote',voteSchema)