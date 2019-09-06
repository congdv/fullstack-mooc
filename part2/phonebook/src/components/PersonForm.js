import React,{useState} from 'react'

const PersonForm = ({persons,setToPersons}) => {
    const [newPerson, setNewPerson] = useState({newName:'',newPhoneNumber:''});
    
    const handleNameOnChange = (event) => {
        console.log(event.target.value);
        setNewPerson({...newPerson, newName:event.target.value});
      }
    
    const handlePhoneNumberOnChange = (event) => {
        console.log(event.target.value);
        setNewPerson({...newPerson, newPhoneNumber:event.target.value});
    }
    
    const nameIsExist = () => {
        const nameList = persons.filter( person => person.name === newPerson.newName);
        console.log(nameList);
        return nameList.length !== 0;
    }
    const addPerson = (event) => {
        event.preventDefault();
        
        if(nameIsExist()){
          alert(`${newPerson.newName} is already added to phonebook`);
        }else {
          const nameObj = {name:newPerson.newName,phoneNumber:newPerson.newPhoneNumber};
          setToPersons(persons.concat(nameObj));
          setNewPerson({newName:'',newPhoneNumber:''})
        }
      }

    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson.newName} onChange={handleNameOnChange} />
        </div>
        <div>
          number: <input value={newPerson.newPhoneNumber} onChange={handlePhoneNumberOnChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PersonForm;