const express = require('express')
const Event = require('./model')
const mongoose = require('mongoose')
const Auth = require('../middleware/auth')
const {authorize} = require('../middleware/roles')
const uuid = require("uuid").v4
const multer = require("multer")
//const jwt = require('jsonwebtoken')
const router = new express.Router()
//const bcrypt = require('bcryptjs')
//const multer = require("multer")
router.post('/event',Auth,authorize('Admin'),async (req, res) => {
    //"name":"advait",
    // "password":"a5555123",
    // "phone":"1234577889",
    // "address":"jsr"
    console.log(req.body)
    //const eventExist = await Event.findOne({title:req.body.title})
    //if(eventExist){
     // res.status(200).send('Event already exist')
    //}
    let event = new Event({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        image: req.body.image,
        description:req.body.description
    })
   // users.push(user)
    event.save(function (err, res) {
        if (err) { throw err; }
        console.log('test me', res)
    })

 
   return res.status(200).json({event})

})
router.get('events',async(req,res)=>{
    try{
       let events =  await Event.find({})
       
       res.status(200).json({
         status: true,
         data: events,
     })
    }catch{
     console.log(error.message)
     res.send(error.message)
    }
})

router.get('/:id',Auth,authorize('Admin') ,async (req, res) => {
    try {
        let id = req.params.id
        console.log(id)
        let eventDetails = await Event.findById(id);
        console.log(eventDetails)
        res.status(200).json({
            status: true,
            data: eventDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }

})
router.patch("/:id",Auth,authorize('Admin'),async(req,res)=>{
    
      try{
          const id = req.params.id;
          const updates = req.body;
          const options = {new:true}
          const result = await Event.findByIdAndUpdate(id,updates,options)
          res.status(200).send(result)

      }catch(error){
        console.log(error.message)
        res.send(error.message)
    }
    
})
const storage = multer.diskStorage({
       destination:(req,file,cb)=>{
          cb(null,"uploads")
       },
       filename:(req,file,cb)=>{
        const {originalname} = file;
        cb(null,`${uuid()}-${originalname}`)
       },

})


const upload = multer({storage});
router.post("/upload",upload.array("file"),(req,res)=>{
    
    console.log("res.req.file: ", res.req.file);
    console.log("req.body: ", req.body, "authorization" in req.headers);
    res.json({status:"success",res:req.file})
})
router.delete("/:id",Auth,authorize('Admin'),async(req,res)=>{
    //let id = req.params.id
    try {
        let id = req.params.id
        let EventDetails = await Event.findByIdAndRemove(id)
        res.status(200).json({
            status: true,
            data: EventDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }

})

module.exports = router

