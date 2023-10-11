const PersonForm = ({
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    addPerson
})=>{
    const handleNameChange = (event)=>{
        // console.log(event.target.value)
        setNewName (event.target.value)
        
      }
      const handleNumberChange =(event)=>{
        // console.log(event.target.value)
        setNewNumber(event.target.value)
      }
     
    return(
        <form onSubmit={addPerson }>
       <div>Name: <input value={newName} onChange={handleNameChange} /></div>
       <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
       <div><button type="submit" >Add</button></div>
      </form>
    )
}
export default PersonForm