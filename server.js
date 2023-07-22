const express = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model');
const jwt = require('jsonwebtocken')
const app = express();
mongoose.connect("mongodb+srv://jayasree2556:hello@rocky.opz7uht.mongodb.net/?retryWrites=true&w=majority",{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    usecreateIndexes : true
}).then(
() => console.log('DB Connection established')
)
app.use(express.json());
app.post('/register',async(req,res) =>{
    try{
            const {username,email,password,confirmpassword} =req.body;
            let exist = await Registeruser.findOne({email})
            if(exist){
                return res.status(400).send('user Already Exist')
            }
            if(password !== confirmpassword){
                return res.status(400).send('Password are not matching');
            }
            let newUser = new Registeruser({
                username,
                email,
                password,
                confirmpassword
            })
            await newUser.save();
            res.status(200).send('Registered Sucessfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})
app.post('/' , (req , res)=>{
    try{

    }
   

})
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
  