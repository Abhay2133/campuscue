const express=require('express')
const router=express.Router()
const Answer=require('../models/User/Answer')
const Question=require('../models/User/Question')
const protect=require('../middleware/authMiddleware')
// const Question = require('../models/User/Question')

//add an answer to a question
router.post('/:questionId',protect,async(req,res)=>{
    try{
        const {body}=req.body
        const question=await Question.findById(req.params.questionId)
        if(!question){
            return res.status(404).json({message:'Question not found'})
        }

        // create a new answer
        const answer=new Answer({
            body,
            question:question._id,
            user:req.user._id,
        })

        

        await answer.save()
        res.status(200).json({message:'Answer added sucesfully',answer})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'Error adding answer',error})
    }
})

// get all answers for the question
router.get('/:questionId',async(req,res)=>{
    try{
        const question=await Question.findById(req.params.questionId)
        if(!question){
            return res.status(404).json({message:'Question not found'})
        }

        const answers=await Answer.find({question:question._id}).populate('user','name email')
        res.status(200).json(answers)
    }
    catch(error){
        res.status(500).json({message:'Error fetching answers',error})
    }
})

//updating the answers
router.put('/:id',protect,async(req,res)=>{
    try{
        const {body}=req.body

        const answer=await Answer.findById(req.params.id)
        if(!answer){
            return res.status(404).json({message:'Answer not found'})
        }
        if(answer.user.toString()!==req.user._id.toString()){
            return res.status(403).json({message:'Not authorized to update this answer '})
        }
        
        //update
        answer.body=body||answer.body
        await answer.save()

        res.status(200).json({message:'Answer updated successfully',answer})
    }
    catch (error){
        res.status(500).json({message:'error updating answer',error})
    }
})

// deleting  an answer
router.delete('/:id', protect, async (req, res) => {
    try {
      const answer = await Answer.findById(req.params.id);
  
      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' });
      }
  
      // Check if the logged-in user is the owner of the answer
      if (answer.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this answer' });
      }
  
      await answer.deleteOne(); // Delete the answer
      res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting answer', error });
    }
  });
  
// voting 
router.post('/:id/upvote', protect, async (req, res) => {
    try {
      const answer = await Answer.findById(req.params.id);
  
      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' });
      }
  
      // Increment upvote count
      answer.vote += 1;
    //   const totalvote=answer.vote
      
  
      await answer.save();
  
      res.status(200).json({ message: 'Answer voted successfully', vote: answer.vote });
    } 
    catch (error) {
      res.status(500).json({ message: 'Error voting answer', error });
    }
  });
  
// decrementing
router.post('/:id/downvote',protect,async(req,res)=>{
    try{
        const answer=await Answer.findById(req.params.id)
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
          }
        // decremnting
        answer.vote-=1
        // const totalvote=answer.vote

        await answer.save();
  
        res.status(200).json({ message: 'Answer voted successfully', votes: answer.vote});
    }
    catch (error) {
        res.status(500).json({ message: 'Error voting answer', error });
      }
})

// getting the vote counts
router.get('/:id/vote', async (req, res) => {
    try {
      const answer = await Answer.findById(req.params.id);
  
      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' });
      }
  
      res.status(200).json({ vote: answer.vote });
    } 
    catch (error) {
      res.status(500).json({ message: 'Error fetching votes', error });
    }
  });
  
module.exports=router