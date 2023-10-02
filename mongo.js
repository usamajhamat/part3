const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [<name> <number>]')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = 'mongodb+srv://phoonebookdb:<password>@cluster0.rvpf9hf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema)

if (process.argv.length === 3) {
  
  PhonebookEntry.find({}).then((entries) => {
    console.log('phonebook:')
    entries.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
  })
} else if (name && number) {
  
  const entry = new PhonebookEntry({ name, number })
  entry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  });
} else {
  console.log('Invalid command-line arguments.')
  mongoose.connection.close()
}
