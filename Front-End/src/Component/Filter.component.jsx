const Filter = ({searchName, setSearchName})=>{
    const handleSearchChange = (event)=>{
        // console.log(event.target.value)
        setSearchName(event.target.value)
      }
    return(
        <div>Filter Show With: <input value={searchName} onChange={handleSearchChange}/></div>
    )
}
export default Filter