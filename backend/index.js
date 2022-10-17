const express = require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const bodyParser = require('body-parser')
// const mongoAtlasUri = ""

const mongoAtlasUri = "mongodb+srv://panand20:appleIate@cluster0.f5o5gsm.mongodb.net/?retryWrites=true&w=majority"

try {
    // connecting to mongo atlas database
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );
}catch(e){
    console.log("could not connect");
}

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const buyerSchema = {
    firebaseuid : {
        type: String
    },
    buyerName : {
        type: String,
        default : ""
    },
    email : {
        type: String,
        default : ""
    },
    password : {
        type: String,
        default : ""
    },
    role:{
        type:String,
        default: ""
    },
    cart: {
        type: Array,
        default: []
    },
    orders:{
        type:Array,
        default:[]
    },
    budget:{
        type:String,
        default:"10000 Rs"
    },
    isDetails : {
        type : Boolean,
        default: false
    }
}
const sellerSchema = {
    firebaseuid : {
        type: String
    },
    sellerName : {
        type: String,
        default : ""
    },
    email : {
        type: String,
        default : ""
    },
    password : {
        type: String,
        default : ""
    },
    role:{
        type:String,
        default: ""
    },
    item: {
        type:Array,
        default:[]
    },
    earned:{
        type:String,
        default:"0 rupees earned"
    },
    goal:{
        type:String,
        default:""
    },
    isDetails : {
        type : Boolean,
        default: false
    }
}
const overallSchema = {
    firebaseuid : {
        type: String
    },
    email : {
        type: String,
        default : ""
    },
    password : {
        type: String,
        default : ""
    },
    role:{
        type:String,
        default: ""
    }
}

const buyerUser = mongoose.model("buyer", buyerSchema)
const sellerUser = mongoose.model("seller", sellerSchema)
const allUser = mongoose.model("All Users", overallSchema)

// app.use()

app.post("/api/post-data",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    if(role === "seller"){
        const newSellerUser = new sellerUser({
            email : email,
            password : password,
            role: role
        })
        newSellerUser.save().then((response)=>{
            console.log(response)
            res.json()
        }).catch((error)=>{
            console.log(error)
            res.sendStatus(404).send(error)
        }) 
    } else {
        const newBuyerUser = new buyerUser({
            email : email,
            password : password,
            role: role
        })
        newBuyerUser.save().then((response)=>{
            console.log(response)
            res.json()
        }).catch((error)=>{
            console.log(error)
            res.sendStatus(404).send(error)
        })
    }
    const newUser = new allUser({
        email : email,
        password : password,
        role: role
    })
    newUser.save().then((response)=>{
        console.log(response)
        res.json()
    }).catch((error)=>{
        console.log(error)
        res.sendStatus(404).send(error)
    }) 
    

})

app.post("/api/get-user-by-id",(req,res)=>{
    const email = req.body.email;
    allUser.find({email:email},(error,response)=>{
        // if(error) res.sendStatus(404).send(error)
        // else{
            //console.log(response)
            res.json(response)
            console.log(response)
        // }
    })


})
app.post("/api/update-buyer-details",(req,res)=>{
    const email = req.body.email
    const isDetails = true
    buyerUser.updateOne({email: email},{
            firebaseuid : req.body.firebaseuid,
            name : req.body.name,
            email : req.body.email,
            budget: req.body.budget,
            isDetails: true
    },(err,response)=>{
        if(err) res.sendStatus(404).send(err)
        else res.json(response)
    })
})
app.post("/api/update-seller-details",(req,res)=>{
    const email = req.body.email
    sellerUser.updateOne({email: email},{
            firebaseuid : req.body.firebaseuid,
            name : req.body.name,
            email : req.body.email,
            goal: req.body.goal,
            isDetails: true

    },(err,response)=>{
        if(err) res.sendStatus(404).send(err)
        else res.json(response)
    })
})

app.listen(60002,()=>console.log("tosc is live on port 60002"))