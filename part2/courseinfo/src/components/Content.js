import React from 'react';
import Part from './Part';

const Content = ({contents}) => {
    console.log(contents);
    const rows = () => contents.map((content) => <Part key={content.id} name={content.name} exercises={content.exercises}/>)
    return (
        <div>
            {rows()}
        </div>
    )
}

export default Content;