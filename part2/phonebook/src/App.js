import React,{useState,useEffect} from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/person';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMess, setNotificationMess] = useState(null);
  const [isErrorMess, setIsErrMess] = useState(false);

  const hook = () => {
    personService.getAll().then(initialPeople => setPersons(initialPeople));
  }

  useEffect(hook,[]);
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMess} isErrorMessage={isErrorMess} />
        <Filter persons={persons}/>

      <h2>Add a new person</h2>
        <PersonForm persons={persons} setToPersons={(persons) => setPersons(persons)} 
                    setToNotificationMessage = {(notificationMess ) => setNotificationMess(notificationMess)}
                    setToIsErrMessage = {(isErrorMess)=> setIsErrMess(isErrorMess)}/>
      <h2>Numbers</h2>
        <Persons persons={persons} setToPersons={(persons) => setPersons(persons)}
                    setToNotificationMessage = {(notificationMess ) => setNotificationMess(notificationMess)}
                    setToIsErrMessage = {(isErrorMess)=> setIsErrMess(isErrorMess)}/>
    </div>
  )
}

export default App;
