import React,{useState} from 'react';

import Person from './Person'

const Filter = ({persons}) => {
    const [filterPersons, setFilterPerson] = useState([{name:'', number:''}]);
    const filterRows = filterPersons.map(person => <Person key={person.name} person={person} isFilter={true} />);


    const handleFilterOnChange = (event) => {
        const filterList = persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 
        && event.target.value !== "")
        
        //Cannot find name of this person
        if(filterList.length < 1){
          setFilterPerson([{name:'', number:''}])
        } else {
          setFilterPerson(filterList);
        }
      }

    return (
        <div>
            <div>Filter shown with <input onChange={handleFilterOnChange}/></div>
            {filterRows}
        </div>
    )
}

export default Filter;