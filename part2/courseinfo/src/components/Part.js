import React from 'react'

const Part = ({name, exercises}) => {
    return (
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}

export default Part;