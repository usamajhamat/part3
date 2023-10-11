const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI



const phonebookEntrySchema = new mongoose.Schema({
  name: {
    type : String,
    required: true,
    minLength : 3,
  },
  number:{
    type : Number,
    required : true
  }
})

phonebookEntrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', phonebookEntrySchema)