import React,{useState} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456' },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }]);
  

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter persons={persons}/>

      <h2>Add a new person</h2>
        <PersonForm persons={persons} setToPersons={(persons) => setPersons(persons)} />
      <h2>Numbers</h2>
        <Persons persons={persons}/>
    </div>
  )
}

export default App;
