const express = require('express');
const protect = require('../middleware/authMiddleware');
const Vote = require('../models/User/Votes');
const Question = require('../models/User/Question');
const Answer = require('../models/User/Answer');
const Post = require('../models/User/Posts');

const router = express.Router();

// Cast a vote
router.post('/:targetId/vote', protect, async (req, res) => {
    const { targetId } = req.params;
    const { targetType, type } = req.body;
  
    if (!['Question', 'Answer', 'Post'].includes(targetType)) {
      return res.status(400).json({ message: 'Invalid target type' });
    }
  
    if (!['upvote', 'downvote'].includes(type)) {
      return res.status(400).json({ message: 'Invalid vote type' });
    }
  
    try {
      // Check if the target exists
      let target;
      switch (targetType) {
        case 'Question':
          target = await Question.findById(targetId);
          break;
        case 'Answer':
          target = await Answer.findById(targetId);
          break;
        case 'Post':
          target = await Post.findById(targetId);
          break;
      }
  
      if (!target) {
        return res.status(404).json({ message: `${targetType} not found` });
      }
  
      // Check if the user has already voted
      const existingVote = await Vote.findOne({ user: req.user.id, targetId, targetType });
  
      if (existingVote) {
        if (existingVote.type === type) {
          return res.status(409).json({
            message: `You have already ${type}d this ${targetType.toLowerCase()}.`,
          });
        }
  
        // Switch the vote
        if (existingVote.type === 'upvote') {
          target.upvotes =Math.max(target.upvotes-1,0)
        } else {
          target.downvotes =Math.max(target.downvotes-1,0);
        }
  
        existingVote.type = type;
        await existingVote.save();
  
        if (type === 'upvote') {
          target.upvotes += 1;
        } else {
          target.downvotes += 1;
        }
  
        await target.save();
  
        return res.status(200).json({
          message: `Vote switched to ${type}.`,
          vote: existingVote,
          target,
        });
      }
  
      // Create a new vote if no existing vote is found
      const vote = await Vote.create({ user: req.user.id, targetId, targetType, type });
  
      if (type === 'upvote') {
        target.upvotes += 1;
      } else {
        target.downvotes += 1;
      }
  
      await target.save();
  
      res.status(201).json({
        message: 'Vote cast successfully.',
        vote,
        target,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
module.exports=router  