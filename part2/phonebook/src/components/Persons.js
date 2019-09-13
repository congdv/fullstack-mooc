import React from 'react';
import Person from './Person'

const Persons = ({persons, setToPersons,setToNotificationMessage,setToIsErrMessage}) => {
    return persons.map(person => <Person key={person.id} person={person} persons={persons} setToPersons={setToPersons}
         setToNotificationMessage={setToNotificationMessage}
         setToIsErrMessage={setToIsErrMessage}
         isFilter={false}/>);
}

export default Persons;