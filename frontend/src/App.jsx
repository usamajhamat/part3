import { useState, useEffect } from 'react'
import PhonbookServices from './Services/Person'
import Filter from './Component/Filter.component'
import PersonForm from './Component/PersonForm.component'
import Person from './Component/Person.component'
import Notification from './Component/Notification.component'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    PhonbookServices
      .getAll()
      .then(data =>{
        setPersons(data)
      })
    .catch(error =>{
      console.log('Error fetching data:', error)
    })
  },[])

  const showNotification = (message, isError = false) => {
    if (isError) {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      setNotification({ message, isError: false })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  };
  const addPerson = (event)=>{
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson){
      const confirmUpdate = window.confirm(`${newName} is already added to Phonebook. Replace the old number with a new one?`)
      if(confirmUpdate){
        const updatedPerson = {...existingPerson, number: newNumber}
        PhonbookServices
        .updatePerson(updatedPerson)
        .then(data =>{
          setPersons(persons.map(person => person.id === data.id ? data : person))
          setNewName('')
          setNewNumber('')
          showNotification(` ${data.name} is already added to Phonebook... Its number has been updated`, false)
        })
       .catch(error =>{
        showNotification(`Error updating person: ${error.message}`, true)
       })
      }
      
    }
    const personObject = {
      name : newName,
      number: newNumber
    }
   
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to Phonbook.`)
    } else {
      PhonbookServices
      .create(personObject)
      .then(data =>{
        setPersons([...persons, data])
        setNewName('')
        setNewNumber('')
        showNotification(` ${data.name} is added to Phonebook`, false)
      })
      .catch(error =>{
        showNotification(`Error adding person: ${error.message}`, true)
      })
    } 
  }
  const filteredPersons = persons.filter(person =>(person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())))
const HandleDelete = (id) =>{
  const personToDelete = persons.find(person => person.id === id)

  if(personToDelete){
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if(confirmDelete){
      PhonbookServices
        .deletePerson(id)
        .then(()=>{
          setPersons(persons.filter((person) => person.id !== id))
          showNotification(` ${personToDelete.name} is deleted from Phonebook`, false)
        })
        .catch((error)=>{
          showNotification(`Error deleting person: ${error.message}`, true)
        }) 
        
    }
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {notification && (
      <Notification message={notification.message} isError={notification.isError} />
    )}
      <Filter searchName={searchName} setSearchName={setSearchName}/>
      <h3>Add a New</h3>
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id}>
            <Person person={person} onDelete={HandleDelete} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App