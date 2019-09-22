import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'






const courses = [
    {
        name :'Half Stack application development',
        id: 1,
        parts : [
            {
                id: 0,
                name: 'Fundamentals of React',
                exercises:10
            },
            {
                id:1,
                name : 'Using props to pass data',
                exercises: 7
            },
            {
                id:2,
                name : 'State of a component',
                exercises : 14
            }
        ]
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }

]



ReactDOM.render(<App courses={courses} />, document.getElementById('root'));

