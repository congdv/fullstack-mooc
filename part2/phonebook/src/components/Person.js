import React from 'react';

const Person = ({person}) => {
    return (
        <li key={person.name}>{person.name} {person.phoneNumber}</li>
    )
}

export default Person;