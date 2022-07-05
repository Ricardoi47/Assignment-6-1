
//const validator = require('validator')
const express = require('express')
const {response} =require('express')
const app = express()
const bodyParser= require('body-parser')
const base= `${__dirname}/public`
const port=8080
const User = require("./models/User.js")
//const User = mongoose.model('User',userSchema)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/iServiceDB',{useNewUrlParser:true})
const db = mongoose.connection;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.listen(process.env.PORT || 8080,()=>{
    console.log('Server on port 8080')
})

app.route('/users')
.post((req, res) =>{
    const NewUser = new User({
      country:req.body.country,
      fname:req.body.fname,
      lname:req.body.lname,
      email:req.body.email,
      password:req.body.password,
      passwordrepeat:req.body.passwordrepeat,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip:req.body.zip,
      pnumber:req.body.pnumber
    })

    NewUser.save((err)=>{
        if(err)
        {res.send(err)}
        else
        {res.send("successfully saved")}
    })
})
.delete((req,res)=>{
    User.deleteMany((err)=>{
        if(err) {res.send(err)}
        else {res.send('Susscesssfully erased all Users')}
    })
})
.get((req,res)=>{
    User.find((err, UserList)=>{
        if(err)  {res.send(err)}
        else {res.send(UserList)}
    })
})

app.route('/users/:fname')
.get((req,res)=>{
    User.findOne({fname: req.params.fname}
        , (err, foundUser)=>{
        if (!err) (res.send(foundUser))
        else res.send('No Matching User')
    })
})
.patch((req,res)=>{
    User.update(
        {fname:req.params.fname},
        {$set: req.body},
        (err)=> {
            if(!err) {res.send('Successfully updated!')}
            else res.send(err)
        }
    )
})
.delete((req,res)=>{
    User.deleteOne({fname:req.params.fname},
        (err)=>{
        
        if(err) {res.send(err)}
        else {res.send('Susscesssfully erased User')}
    })
})