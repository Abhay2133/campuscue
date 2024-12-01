const mongoose= require('mongoose')

const questionSchema=new mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',require:true},
    votes:{type:Number, default: 0},
},{timestamps:true})

const Question = mongoose.model('Question',questionSchema);

module.exports = Question;