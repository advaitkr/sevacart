const express = require('express')
const User = require('./model')
const Auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const users = []
router.get('/greetings',async(req,res)=>{
    res.send("hello world")
})

router.post('/user', async (req, res) => {
    //"name":"advait",
    // "password":"a5555123",
    // "phone":"1234577889",
    // "address":"jsr"
    console.log(req.body)
    const userExist = await User.findOne({phone:req.body.phone})
    if(userExist){
      res.status(200).send('Phone no already exist')
    }
    let user = new User({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
        role:req.body.role
    })
    users.push(user)
    user.save(function (err, res) {
        if (err) { throw err; }
        console.log('test me', res)
    })

    console.log(user,process.env.ACCESS_TOKEN_SECRET)
    const accesstoken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 604800
    })
   return res.status(200).json({ user, token: accesstoken })
  
    /*try {
         await user.save()
        const token = await user.generateAuthToken()
        console.log(token)
       return res.status(201).send({user, token})
    } catch (error) {
      return  res.status(400).send(error)
    }*/
})
router.post('/users/login', async (req, res) => {
    let {password,phone} = req.body
    let user = await User.findOne({phone})
    console.log(user)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(password, user.password)) {
        const accesstoken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 604800
        }) 
        // res.cookie('token',accesstoken,{expires:new Date()+1})
        // return res.json({user,token:accesstoken,msg:"LoggedIn"})
      return  res.header('auth-token',accesstoken).send("loggedIn")
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
})
router.get('/users/take',Auth,(req,res)=>{
    res.json({msg:"hello world"})
})
router.get('/users/logout',(req,res)=>{
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });


  res.status(200).json({
    success: true,
    msg:"successfully logout",
    data: {}
  });

})

module.exports = router