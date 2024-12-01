const express = require('express')
const router = express.Router();
const Question = require('../models/User/Question')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, async (req, res) => {
    try {
        const { title, body } = req.body;
        if(!title || !body) return res.status(400).json({message:`title (${title}) or body (${body}) missing `});
        const question = new Question({
            title,
            body,
            user: req.user._id,
        })
        await question.save()
        res.status(201).json({ message: 'Question created ..', question })

    }
    catch (error) {
        res.status(500).json({ message: 'error creating question', error })
    }
})

router.get("/latest", protect, async (req, res) => {
    try {
        const questions = await Question.find().populate('user', 'name email')
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .limit(10);
        res.status(200).json(questions)
    }
    catch (error) {
        res.status(500).json({ message: 'error fetching questions', error })
    }
})

// geting tyhe user with question
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('user', 'name email')
        if (!question) { return res.status(404).json({ message: 'Question not found' }) }
        res.status(200).json(question)

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retriving question', error })
    }
})
// getting all the questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().populate('user', 'name email')
        res.status(200).json(questions)
    }
    catch (error) {
        res.status(500).json({ message: 'error fetching questions', error })
    }
})
// updating a question
router.put('/:id', protect, async (req, res) => {
    try {
        const { title, body } = req.body

        const question = await Question.findById(req.params.id)
        if (!question) {
            return res.status(404).json({ message: 'Not authorized to update this question' })
        }

        question.title = title || question.title
        question.body = body || question.body
        await question.save()

        res.status(200).json({ message: 'Question update successfully', question })
    }
    catch (error) {
        res.status(500).json({ message: 'error updating question', error })
    }
})

// delete a question
router.delete('/:id', protect, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
        if (!question) {
            return res.status(404).json({ message: 'Question not found' })
        }
        if (question.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to selete this Question' })
        }
        await question.deleteOne();
        res.status(200).json({ message: 'Question deleted successfully' })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error deleting question', error })
    }
})

module.exports = router