import React from 'react';
import Header from './Header';
import Content from './Content';


const Course = ({course}) => {
    console.log(course.name)
    return (
        <div>
            <Header name={course.name}/>
            <Content contents={course.parts}/>
        </div>
    )
}

export default Course;