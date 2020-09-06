// const { Router } = require("express")

const express = require('express')
const Tasks = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth ,async (req, res) => {
   // const task = new Tasks(req.body)
   const task = new Tasks({
       ...req.body,
       owner: req.user._id
   })
    try {
        await task.save()
        res.status(201).send(task)
    }
    catch(e) {
        res.status(500).send()
    }

})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=2
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth ,async (req, res) => {
    const match = {}
    const sort = {}
    const completedFlag = req.query.completed
    const sortDetail = req.query.sortBy

    if(completedFlag) {
        match.completed = completedFlag === 'true'
    }

    if(sortDetail) {
        const parts = sortDetail.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort 
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch(e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth , async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Tasks.findOne({_id, owner: req.user._id})
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    }
    catch(e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth ,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdate = ['description', 'completed']
    const isValidOpertion = updates.every((update) => allowUpdate.includes(update))
    if(!isValidOpertion) {
        res.status(400).send({error: 'Invalid Updates!'})
    }
    try {

        const task = await Tasks.findOne({_id:req.params.id, owner: req.user._id})
        
        
        if(!task) {
            res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    }
    catch(e) {
        res.status(400).send()
    }
})


router.delete('/tasks/:id',auth ,async (req, res) => {
    try {
       // const task = await Tasks.findByIdAndDelete(req.params.id)

       const task = await Tasks.findOne({_id: req.params.id, owner: req.user._id })
        if(!task) {
            res.status(404).send()
        }
        await task.delete()
        res.send(task)
    }
    catch(e) {
        res.status(400).send()
    }
})

module.exports = router