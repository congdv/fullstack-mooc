import React from 'react';

import Course from './components/Course';




const Total = ({contents}) => {
    const sum = contents.reduce((sum,content)=> sum +content.exercises,0);
    return (
        <div>
            <em>Total of {sum} exercises</em>
        </div>
    )
    
}

const App = ({courses}) => {
    console.log(courses)
    const courseList= () => courses.map(course => {
        return (
            <div>
                <Course key={course.id} course={course} />
                <Total contents={course.parts}/>
            </div>
        )
    })
    
    
    return (
        <div>
            {courseList()}
        </div>
    )
}

export default App;