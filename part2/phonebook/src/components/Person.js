import React from 'react';
import personServices from '../services/person';

const Person = ({person,persons,setToPersons,setToNotificationMessage,setToIsErrMessage,isFilter}) => {
    const handleDeletePerson = (event) => {
        event.preventDefault();
        const result = window.confirm(`Delete ${person.name}`);
        if(result){
            console.log(`Delete ${person.name}`);
            personServices.deleteAPerson(person.id).then(() => {
                setToNotificationMessage(`Deleted ${person.name}`);
                setToIsErrMessage(false);

                setTimeout(() => {
                    setToNotificationMessage(null);
                    setToIsErrMessage(false);
                },3000)
            }).catch(
                error=> {
                    setToNotificationMessage(`Information of ${person.name} has already been removed from server`);
                    setToIsErrMessage(true);

                    setTimeout(() => {
                        setToNotificationMessage(null);
                        setToIsErrMessage(false);
                    },3000)
                }
            );
            setToPersons(persons.filter(p => p.id !== person.id));
        }
    }
    return (
        <li key={person.id}>{person.name} {person.number} {isFilter ? "" : <button onClick={handleDeletePerson}>delete</button>}</li>
    )
}

export default Person;