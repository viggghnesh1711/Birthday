const mongoose=require('mongoose')

const msgSchema=mongoose.Schema({
    message:String,
    createdAt: {
        type: Date,
        default: Date.now  
      }
})

module.exports=mongoose.model("msg",msgSchema)