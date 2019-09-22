import React from 'react';


const Languages = ({languages}) => {
    console.log(languages);
    return (
        <ul>{languages.map((language,i) => <li key={language+i}>{language.name}</li>)}</ul>
    )
}

export default Languages;