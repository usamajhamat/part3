require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
const cors = require('cors')
const Person = require('./models/person')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
morgan.token('req-body', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return '';
  });
  
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :req-body')
  );
  
  



const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000)
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons)=>{
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }
  if(body.name.length < 3 ){
    return response.status(400).json({error:`Path 'Name' ${body.name} is shorter than minimum length allowed (3)`})
  }
  if (!/^\d{2,3}-\d{5,}$/.test(body.number)) {
    return response.status(400).json({ error: 'Invalid phone number format. Example format: 09-1234556 and Length of Number must be at least 8' });
  }
 
 

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



  app.put('/api/persons/:id',(request, response, next)=>{
    const body = request.body
    const person ={
      name : body.name,
      number : body.number
    }
    Person.findByIdAndUpdate(request.params.id,person,{new:true})
    .then(updatedPerson =>{
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})