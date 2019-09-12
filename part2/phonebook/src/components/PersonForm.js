import React,{useState} from 'react'
import personServices from '../services/person';

const PersonForm = ({persons,setToPersons,setToNotificationMessage,setToIsErrMessage}) => {
    const [newPerson, setNewPerson] = useState({newName:'',newNumber:''});
    
    const handleNameOnChange = (event) => {
        setNewPerson({...newPerson, newName:event.target.value});
      }
    
    const handlePhoneNumberOnChange = (event) => {
        setNewPerson({...newPerson, newNumber:event.target.value});
    }
    
    const foundPerson = () => {
        return persons.find(person => person.name.toLowerCase() === newPerson.newName.toLowerCase());
    }
    const addPerson = (event) => {
        event.preventDefault();
        const existedPerson = foundPerson();
        if(typeof existedPerson !== 'undefined'){
          const message = `${newPerson.newName} is already added to phonebook, replace the old number with a new one?`;
          const result = window.confirm(message);
          if (result){
            const changedPerson = {...existedPerson,number:newPerson.newNumber};
            personServices.update(existedPerson.id,changedPerson)
            .then(returnedPerson => {
              setToPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
              setToNotificationMessage(`${returnedPerson.name} has been updated new number`);
              setToIsErrMessage(false);
              setTimeout(() => {
                setToNotificationMessage(null);
                setToIsErrMessage(false);
              },3000)
              
            })
            .catch( error => {
              // alert(`${existedPerson} was removed on server`);
              setToPersons(persons.filter(person => person.id !== existedPerson.id));
              
              setToNotificationMessage(`Information of ${existedPerson.name} has already been removed from server`);
              setToIsErrMessage(true);

              setTimeout(() => {
                setToNotificationMessage(null);
                setToIsErrMessage(false);
              },3000)
              
            });

            console.log("update");
            
            setNewPerson({newName:'',newNumber:''});
          }
        }else {
          const personObj = {name:newPerson.newName,number:newPerson.newNumber,id:persons.length+1};
          personServices.create(personObj).then(
              returnedPerson => {
                setToPersons(persons.concat(returnedPerson))
                setToNotificationMessage(`Added ${personObj.name}`);
                setToIsErrMessage(false);

                setTimeout(() => {
                  setToNotificationMessage(null);
                  setToIsErrMessage(false);
                },3000)
              }
            );
          setNewPerson({newName:'',newNumber:''});
        }
      }

    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson.newName} onChange={handleNameOnChange} />
        </div>
        <div>
          number: <input value={newPerson.newNumber} onChange={handlePhoneNumberOnChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PersonForm;